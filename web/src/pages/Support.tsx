import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { api, ApiError, when } from "../api";
import { useApp } from "../App";
import { gridTheme } from "../grid";

const PROPOSAL_LABEL: Record<string, string> = {
  retry_release: "Retry the payment (safe: idempotent)",
  ask_funders_to_renew: "Ask funders to renew their holds",
  refund_held_share_after_vote: "Refund the held share after a funders' vote",
  no_money_action: "No money action needed",
  escalate_to_person: "Hand to a person",
};

// The support queue: cases opened by neighbours, by failed payments, by expiring holds and by the nightly
// reconciliation against PayPal. The AI investigator reads PayPal through the Agent Toolkit and proposes a next step.
export function Support() {
  const { tick, bump, me } = useApp();
  const [rows, setRows] = useState<any[]>([]);
  const [sel, setSel] = useState<any>(null);
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    void api<any[]>("/cases").then((r) => {
      setRows(r);
      setSel((s: any) => (s ? r.find((x) => x.id === s.id) ?? null : null));
    });
  }, [tick]);

  const cols = useMemo<ColDef[]>(
    () => [
      { field: "created_at", headerName: "Opened", width: 150, valueFormatter: (p) => when(p.value), sort: "desc" },
      { field: "kind", headerName: "Kind", width: 190, filter: true },
      { field: "status", headerName: "Status", width: 130, filter: true },
      { field: "bounty_id", headerName: "Bounty", width: 140 },
      { field: "opened_by", headerName: "Opened by", width: 120 },
      { field: "body", headerName: "What happened", flex: 1, minWidth: 260, tooltipField: "body" },
      { headerName: "AI proposal", colId: "proposal", width: 230, valueGetter: (p) => (p.data.resolution ? PROPOSAL_LABEL[JSON.parse(p.data.resolution).proposal] : "") },
    ],
    [],
  );

  const run = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(label);
    setMsg("");
    try {
      await fn();
      bump();
    } catch (e) {
      setMsg(e instanceof ApiError ? [e.message, ...e.reasons].join(" ") : String(e));
    } finally {
      setBusy("");
    }
  };
  const finding = sel?.resolution ? JSON.parse(sel.resolution) : null;

  return (
    <section>
      <h1>Support</h1>
      <p>Nothing gets stuck silently. Failed payments, holds that run out mid-job and any mismatch between our receipts and PayPal's records open a case here automatically.</p>
      <div className="toolbar">
        <button disabled={!!busy} onClick={() => void run("reconcile", async () => setMsg(`Reconciliation: ${(await api<any>("/reconcile", {})).mismatches.length} mismatches with PayPal.`))}>
          {busy === "reconcile" ? "Comparing with PayPal…" : "Reconcile with PayPal now"}
        </button>
        {msg && <span className="note">{msg}</span>}
      </div>
      <div className="cols">
        <div className="grid-box" style={{ height: 420 }}>
          <AgGridReact theme={gridTheme} rowData={rows} columnDefs={cols} rowSelection={{ mode: "singleRow", enableClickSelection: true }} onRowClicked={(e) => setSel(e.data)} defaultColDef={{ sortable: true, resizable: true }} tooltipShowDelay={300} />
        </div>
        <div className="card">
          {!sel ? (
            <p className="small">Pick a case to see the details.</p>
          ) : (
            <>
              <h3>{sel.kind.replace(/_/g, " ")}</h3>
              <p>{sel.body}</p>
              {sel.bounty_id && <a href={`#/b/${sel.bounty_id}`}>Open the bounty and its receipts →</a>}
              <button className="primary" disabled={!!busy || !me} onClick={() => void run("inv", () => api(`/cases/${sel.id}/investigate`, {}))}>
                {busy === "inv" ? "AI is reading PayPal and the receipts…" : "Investigate with AI"}
              </button>
              {finding && (
                <div className="finding">
                  <h4>Finding</h4>
                  <p>{finding.summary}</p>
                  {finding.evidence?.length > 0 && (
                    <ul className="small">
                      {finding.evidence.map((e: string, i: number) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  )}
                  <p>
                    <b>Proposed next step:</b> {PROPOSAL_LABEL[finding.proposal]}
                  </p>
                  {finding.message_to_people && <p className="small">Message for the people involved: {finding.message_to_people}</p>}
                  <p className="small">
                    {finding.tools_used?.length ? `PayPal and receipt tools used: ${finding.tools_used.join(", ")}. ` : ""}Model: {finding.model}. The agent can only read; a person or the money rules carry
                    out the step.
                  </p>
                  {finding.proposal === "retry_release" && sel.bounty_id && (
                    <button disabled={!!busy} onClick={() => void run("retry", () => api(`/bounties/${sel.bounty_id}/retry-release`, {}))}>
                      Retry the payment
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
