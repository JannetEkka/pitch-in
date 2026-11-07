import { useEffect, useMemo, useState } from "react";
import { BryntumGantt } from "@bryntum/gantt-react";
import { StringHelper } from "@bryntum/gantt";
import "@bryntum/gantt/gantt.css";
import "@bryntum/gantt/svalbard-light.css";
import "@bryntum/gantt/fontawesome/css/fontawesome.css";
import "@bryntum/gantt/fontawesome/css/solid.css";
import { api, STATUS_LABEL, usd } from "../api";
import { useApp } from "../App";

const PROJECT_NAMES: Record<string, string> = { p_pond: "Restore the path round the pond" };
const COLOR: Record<string, string> = {
  draft: "gray",
  funding: "blue",
  funded: "cyan",
  claimed: "orange",
  checking: "orange",
  objection_window: "yellow",
  needs_neighbour: "yellow",
  vote: "yellow",
  paid: "green",
  recheck_vote: "yellow",
  closed: "teal",
  expired: "gray",
  referred: "red",
};
const DONE: Record<string, number> = { claimed: 40, checking: 70, objection_window: 85, needs_neighbour: 85, vote: 80, paid: 90, recheck_vote: 90, closed: 100 };

// Bryntum Gantt: big jobs split into bounties that depend on each other, with each bounty's deadline,
// its earliest PayPal hold expiry and its recheck date on the timeline.
export function Plan() {
  const { tick } = useApp();
  const [rows, setRows] = useState<any[] | null>(null);
  useEffect(() => {
    void api<any[]>("/bounties").then(setRows);
  }, [tick]);

  const project = useMemo(() => {
    if (!rows) return null;
    const live = rows.filter((r) => r.status !== "referred");
    const toTask = (r: any) => ({
      id: r.id,
      name: r.title,
      startDate: r.start_date,
      endDate: r.end_date,
      manuallyScheduled: true,
      percentDone: DONE[r.status] ?? 0,
      eventColor: COLOR[r.status] ?? "blue",
      status: STATUS_LABEL[r.status] ?? r.status,
      money: `${usd(r.authorized_cents || r.captured_cents)} / ${usd(r.goal_cents)}`,
      holdExpires: r.hold_expires_at,
    });
    const groups = new Map<string, any[]>();
    for (const r of live.filter((r) => r.project_id)) groups.set(r.project_id, [...(groups.get(r.project_id) ?? []), r]);
    const tasks = [
      ...[...groups.entries()].map(([pid, rs]) => ({ id: pid, name: PROJECT_NAMES[pid] ?? "Project", expanded: true, manuallyScheduled: true, children: rs.map(toTask) })),
      ...live.filter((r) => !r.project_id).map(toTask),
    ];
    const dependencies = live.flatMap((r) => (r.depends_on ?? []).map((d: string) => ({ id: `${d}->${r.id}`, fromTask: d, toTask: r.id })));
    const timeRanges = live
      .filter((r) => r.hold_expires_at)
      .map((r) => ({ id: `exp-${r.id}`, name: `Holds expire: ${r.title.slice(0, 24)}…`, startDate: r.hold_expires_at, cls: "hold-expiry" }));
    return { tasks, dependencies, timeRanges };
  }, [rows]);

  if (!project) return <p>Loading…</p>;
  return (
    <section className="plan">
      <h1>Project plan</h1>
      <p>
        Bigger jobs are split into bounties that unlock in order: nobody can claim "repaint the railing" until the weeds are cut. Colours show where each bounty is in the money flow.
        Red lines mark the dates PayPal holds would expire, so funders are asked to renew before that.
      </p>
      <div className="gantt-box">
        <BryntumGantt
          project={{ ...project, autoSetConstraints: false }}
          readOnly
          barMargin={8}
          rowHeight={40}
          viewPreset="weekAndDayLetter"
          columns={[
            { type: "name", text: "Bounty", width: 300 },
            { text: "Status", width: 170, renderer: ({ record }: any) => record.originalData.status ?? "" },
            { text: "Held / goal", width: 140, renderer: ({ record }: any) => record.originalData.money ?? "" },
          ]}
          timeRangesFeature={{ showCurrentTimeLine: true, showHeaderElements: true }}
          taskTooltipFeature={{
            template: ({ taskRecord }: any) =>
              // User-written titles go into innerHTML here, so encode them.
              [taskRecord.name, taskRecord.originalData.status ?? "", taskRecord.originalData.money ?? ""].map((t: string) => StringHelper.encodeHtml(t)).join("<br>"),
          }}
          onTaskDblClick={({ taskRecord }: any) => {
            if (String(taskRecord.id).startsWith("b_")) location.hash = `#/b/${taskRecord.id}`;
          }}
        />
      </div>
    </section>
  );
}
