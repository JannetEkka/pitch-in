import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { api, usd, when } from "../api";
import { useApp } from "../App";
import { gridTheme } from "../grid";

const MONEY_EVENTS = new Set(["pledge.authorized", "pledge.captured", "pledge.voided", "pledge.refunded", "pledge.expired", "payout.sent", "payout.refused"]);

// Every receipt, in order. Each row's hash covers the row before it, so the chain proves nothing was edited or removed.
export function Ledger() {
  const { tick } = useApp();
  const [rows, setRows] = useState<any[]>([]);
  const [check, setCheck] = useState<any>(null);
  const [onlyMoney, setOnlyMoney] = useState(false);
  const [q, setQ] = useState("");
  useEffect(() => {
    void api<any[]>("/ledger").then((r) => setRows(r.reverse()));
    setCheck(null);
  }, [tick]);

  const cols = useMemo<ColDef[]>(
    () => [
      { field: "seq", headerName: "#", width: 80, sort: "desc" },
      { field: "at", headerName: "When", width: 160, valueFormatter: (p) => when(p.value) },
      { field: "event", headerName: "Event", width: 190, filter: true, cellClass: (p) => (MONEY_EVENTS.has(p.value) ? "money-cell" : "") },
      {
        field: "bounty_id",
        headerName: "Bounty",
        width: 140,
        cellRenderer: (p: any) => (p.value ? <a href={`#/b/${p.value}`}>{p.value}</a> : "—"),
      },
      { headerName: "Amount", colId: "amount", width: 110, valueGetter: (p) => p.data.data.amount_cents ?? p.data.data.paid_now_cents ?? null, valueFormatter: (p) => (p.value == null ? "" : usd(p.value)) },
      {
        headerName: "PayPal id",
        colId: "pp",
        width: 210,
        valueGetter: (p) => p.data.data.capture_id ?? p.data.data.authorization_id ?? p.data.data.paypal_batch_id ?? p.data.data.order_id ?? p.data.data.refund_id ?? "",
      },
      { headerName: "Details", colId: "details", flex: 1, minWidth: 260, valueGetter: (p) => JSON.stringify(p.data.data), tooltipValueGetter: (p) => JSON.stringify(p.data.data, null, 1) },
      { field: "hash", headerName: "Hash", width: 140, valueFormatter: (p) => `${p.value.slice(0, 12)}…`, tooltipField: "hash" },
      { field: "prev_hash", headerName: "Previous", width: 140, valueFormatter: (p) => `${p.value.slice(0, 12)}…`, tooltipField: "prev_hash" },
    ],
    [],
  );

  const shown = onlyMoney ? rows.filter((r) => MONEY_EVENTS.has(r.event)) : rows;
  return (
    <section>
      <h1>Receipts</h1>
      <p>Every decision and every movement of money, with the PayPal ids behind it. Anyone can re-check the chain.</p>
      <div className="toolbar">
        <input placeholder="Search receipts…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search receipts" />
        <label className="check">
          <input type="checkbox" checked={onlyMoney} onChange={(e) => setOnlyMoney(e.target.checked)} /> Money events only
        </label>
        <button onClick={() => void api("/ledger/verify").then(setCheck)}>Verify the chain</button>
        {check && (
          <span className={`pill ${check.ok ? "good" : "bad"}`}>
            {check.ok ? `Intact: ${check.count} entries, head ${check.head.slice(0, 12)}…` : `Broken at entry #${check.broken_at}`}
          </span>
        )}
      </div>
      <div className="grid-box" style={{ height: 520 }}>
        <AgGridReact theme={gridTheme} rowData={shown} columnDefs={cols} quickFilterText={q} defaultColDef={{ sortable: true, resizable: true }} tooltipShowDelay={300} pagination paginationPageSize={50} />
      </div>
    </section>
  );
}
