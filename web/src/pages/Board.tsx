import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { api, day, STATUS_LABEL, STATUS_TONE, usd } from "../api";
import { useApp } from "../App";
import { gridTheme } from "../grid";

interface Row {
  id: string;
  title: string;
  area: string;
  job_type: string;
  status: string;
  goal_cents: number;
  authorized_cents: number;
  captured_cents: number;
  paid_cents: number;
  funders: number;
  tier: string;
  holdback_pct: number;
  hold_expires_at: string | null;
  deadline: string;
  project_id: string | null;
}

const Status = (p: ICellRendererParams<Row>) => <span className={`pill ${STATUS_TONE[p.value] ?? ""}`}>{STATUS_LABEL[p.value] ?? p.value}</span>;
const Progress = (p: ICellRendererParams<Row>) => {
  const r = p.data!;
  const held = Math.max(r.authorized_cents, r.captured_cents);
  const pct = Math.min(100, Math.round((held / r.goal_cents) * 100));
  return (
    <div className="bar-cell"><div className="bar" title={`${usd(held)} of ${usd(r.goal_cents)}`}>
      <div style={{ width: `${pct}%` }} />
      <span>
        {usd(held)} / {usd(r.goal_cents)}
      </span>
    </div></div>
  );
};

export function Board() {
  const { tick } = useApp();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    void api<Row[]>("/bounties").then(setRows);
  }, [tick]);

  const cols = useMemo<ColDef<Row>[]>(
    () => [
      { field: "title", headerName: "Bounty", flex: 2, minWidth: 240, pinned: "left", cellRenderer: (p: ICellRendererParams<Row>) => <a href={`#/b/${p.data!.id}`}>{p.value}</a> },
      { field: "status", headerName: "Status", cellRenderer: Status, minWidth: 190, filter: "agTextColumnFilter" },
      { headerName: "Held / goal", colId: "progress", cellRenderer: Progress, minWidth: 200, sortable: true, comparator: (_a, _b, x, y) => x.data!.authorized_cents / x.data!.goal_cents - y.data!.authorized_cents / y.data!.goal_cents },
      { field: "job_type", headerName: "Job", width: 110, filter: true },
      { field: "tier", headerName: "Checks before paying", width: 170, valueFormatter: (p) => ({ small: "AI + rules", medium: "+ 24h window", large: "+ neighbour" })[p.value as string] ?? p.value },
      { field: "holdback_pct", headerName: "Held for recheck", width: 140, valueFormatter: (p) => `${p.value}%` },
      { field: "funders", headerName: "Funders", width: 100 },
      { field: "paid_cents", headerName: "Paid to doer", width: 130, valueFormatter: (p) => usd(p.value) },
      { field: "hold_expires_at", headerName: "Holds expire", width: 130, valueFormatter: (p) => day(p.value), cellClass: (p) => (p.value && new Date(p.value).getTime() - Date.now() < 7 * 86_400_000 ? "warn-cell" : "") },
      { field: "deadline", headerName: "Deadline", width: 120, valueFormatter: (p) => day(p.value) },
      { field: "area", headerName: "Area", width: 140, filter: true },
    ],
    [],
  );

  const totals = rows.reduce((s, r) => ({ held: s.held + r.authorized_cents, paid: s.paid + r.paid_cents, open: s.open + (["funding", "funded"].includes(r.status) ? 1 : 0) }), { held: 0, paid: 0, open: 0 });

  return (
    <section>
      <div className="hero">
        <div>
          <h1>Fixes your neighbours will pay for</h1>
          <p>
            Pledge with PayPal and nothing is charged until an AI has checked the before and after photos. Part of the payment waits a week, until a neighbour shows the fix
            held.
          </p>
        </div>
        <div className="stats">
          <div>
            <b>{totals.open}</b>
            <span>open bounties</span>
          </div>
          <div>
            <b>{usd(totals.held)}</b>
            <span>held, not charged</span>
          </div>
          <div>
            <b>{usd(totals.paid)}</b>
            <span>paid to neighbours</span>
          </div>
        </div>
      </div>
      <div className="toolbar">
        <input placeholder="Search bounties…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search bounties" />
        <a className="button primary" href="#/report">
          Report a problem
        </a>
      </div>
      <div className="grid-box" style={{ height: 460 }}>
        <AgGridReact<Row>
          theme={gridTheme}
          rowData={rows}
          columnDefs={cols}
          quickFilterText={q}
          defaultColDef={{ sortable: true, resizable: true }}
          getRowId={(p) => p.data.id}
          onRowDoubleClicked={(e) => (location.hash = `#/b/${e.data!.id}`)}
          animateRows
        />
      </div>
    </section>
  );
}
