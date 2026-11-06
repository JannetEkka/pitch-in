import { useCallback, useEffect, useState } from "react";
import { api, ApiError, day, STATUS_LABEL, STATUS_TONE, usd, when } from "../api";
import { useApp } from "../App";
import { Camera, type Shot } from "../components/Camera";
import { PayPalPledge } from "../components/PayPalPledge";

export function BountyPage({ id }: { id: string }) {
  const { me, config, tick, bump } = useApp();
  const [v, setV] = useState<any>(null);
  const [err, setErr] = useState<string[]>([]);
  const [busy, setBusy] = useState("");
  const [shots, setShots] = useState<Record<string, Shot | null>>({});

  const load = useCallback(() => api(`/bounties/${id}`).then(setV), [id]);
  useEffect(() => {
    void load();
  }, [load, tick]);

  const act = async (label: string, fn: () => Promise<unknown>) => {
    setBusy(label);
    setErr([]);
    try {
      await fn();
      bump();
    } catch (e) {
      setErr(e instanceof ApiError ? [e.message, ...e.reasons.filter((r) => r !== e.message)] : [String(e)]);
    } finally {
      setBusy("");
    }
  };

  if (!v) return <p>Loading…</p>;
  const b = v.bounty;
  const uid = me?.user.id;
  const isDoer = b.doer_id === uid;
  const isFunder = v.pledges.some((p: any) => p.funder_id === uid && !["created", "voided"].includes(p.status));
  const photo = (kind: string) => v.photos.filter((p: any) => p.kind === kind).at(-1);
  const proof = v.checks.filter((c: any) => c.stage === "proof").at(-1);
  const recheck = v.checks.filter((c: any) => c.stage === "recheck").at(-1);
  const fallback = { lat: b.lat, lng: b.lng };
  const shotOf = (k: string) => shots[k] ?? null;
  const setShot = (k: string) => (s: Shot) => setShots((x) => ({ ...x, [k]: s }));

  return (
    <section className="bounty">
      <a href="#/" className="small">
        ← All bounties
      </a>
      <div className="bounty-head">
        <div>
          <h1>{b.title}</h1>
          <p className="small">
            {b.area} · {b.job_type} · {b.skill} skill · about {b.est_hours} h · deadline {day(b.deadline)}
          </p>
        </div>
        <span className={`pill big ${STATUS_TONE[b.status]}`}>{STATUS_LABEL[b.status]}</span>
      </div>

      <div className="cols">
        <div>
          <div className="card">
            <h3>Reported</h3>
            <p>"{b.report_text}"</p>
            <h3>The after photo must show</h3>
            <ul className="checklist">
              {b.checklist.map((c: any) => {
                const r = proof?.verdict.criteria.find((x: any) => x.id === c.id);
                return (
                  <li key={c.id} className={r ? (r.pass && r.confidence >= 0.75 ? "ok" : "no") : ""}>
                    {c.text}
                    {r && (
                      <span className="small">
                        {" "}
                        — AI: {r.pass ? "met" : "not met"} ({Math.round(r.confidence * 100)}%). {r.reason}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="photos">
            {["report", "before", "after", "confirm", "recheck"].map((k) =>
              photo(k) ? (
                <figure key={k}>
                  <img src={`/api/photos/${photo(k).id}`} alt={`${k} photo`} />
                  <figcaption>
                    {k} · {when(photo(k).taken_at)}
                    {!photo(k).live_capture && <span className="tag warn">uploaded, not live</span>}
                  </figcaption>
                </figure>
              ) : null,
            )}
          </div>

          {proof && (
            <div className="card">
              <h3>AI check of the proof</h3>
              <p>{proof.verdict.summary}</p>
              <p className="small">
                Same place: {proof.verdict.same_place.pass ? "yes" : "no"} ({Math.round(proof.verdict.same_place.confidence * 100)}%), {proof.verdict.same_place.reason}
              </p>
              {proof.flags.length > 0 && (
                <ul className="flags">
                  {proof.flags.map((f: any, i: number) => (
                    <li key={i} className={f.blocking ? "no" : ""}>
                      <b>{f.code.replace(/_/g, " ")}</b>: {f.detail}
                    </li>
                  ))}
                </ul>
              )}
              <p className="small">Model: {proof.verdict.model}. The AI's verdict is an input; the money rules decide.</p>
            </div>
          )}
          {recheck && (
            <div className="card">
              <h3>"Still fixed?" recheck</h3>
              <p>
                {recheck.verdict.still_fixed ? "Held" : "Didn't hold"} ({Math.round(recheck.verdict.confidence * 100)}%): {recheck.verdict.reason}
              </p>
            </div>
          )}

          <div className="card">
            <h3>Receipts for this bounty</h3>
            <ol className="timeline">
              {v.ledger.map((e: any) => (
                <li key={e.seq}>
                  <span className="when">{when(e.at)}</span> <b>{e.event}</b> <Detail e={e} />
                  <code title={`prev ${e.prev_hash}`}>#{e.seq} {e.hash.slice(0, 10)}…</code>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <div className="card money">
            <h3>Money</h3>
            <dl>
              <dt>Goal</dt>
              <dd>{usd(b.goal_cents)}</dd>
              <dt>Held on PayPal</dt>
              <dd>{usd(v.authorized_cents)}</dd>
              <dt>Captured</dt>
              <dd>{usd(v.captured_cents)}</dd>
              <dt>Paid to doer</dt>
              <dd>{usd(v.payouts.reduce((s: number, p: any) => s + p.amount_cents, 0))}</dd>
              <dt>Held for recheck</dt>
              <dd>{b.holdback_pct}%</dd>
              <dt>Fair price</dt>
              <dd>
                {usd(b.price_low_cents)}–{usd(b.price_high_cents)}
              </dd>
            </dl>
            <details>
              <summary className="small">How the price was worked out</summary>
              <ul className="small">
                {b.pricing_notes.map((n: string, i: number) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </details>
            <table className="pledges">
              <tbody>
                {v.pledges
                  .filter((p: any) => p.status !== "created")
                  .map((p: any) => (
                    <tr key={p.id}>
                      <td>{p.funder_id.replace("u_", "")}</td>
                      <td>{usd(p.amount_cents)}</td>
                      <td>
                        <span className="tag">{p.status}</span>
                      </td>
                      <td className="small">{p.status === "authorized" ? `until ${day(p.auth_expires_at)}` : p.captured_cents ? `charged ${usd(p.captured_cents)}` : ""}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {!me ? (
            <p className="note">Choose who you are (top right) to take part.</p>
          ) : (
            <div className="card actions">
              <h3>What you can do</h3>

              {["funding", "funded", "claimed"].includes(b.status) && !isDoer && (
                <PayPalPledge bountyId={b.id} defaultCents={Math.max(500, Math.min(2000, b.goal_cents - v.authorized_cents))} onDone={() => bump()} />
              )}

              {b.status === "funded" && (
                <button className="primary" disabled={!!busy} onClick={() => void act("claim", () => api(`/bounties/${b.id}/claim`, {}))}>
                  Claim this job
                </button>
              )}

              {b.status === "claimed" && isDoer && (
                <>
                  <p className="small">Take the before photo now and the after photo when you're done, from the same spot.</p>
                  {!photo("before") ? (
                    <>
                      <Camera label="Before photo" onShot={setShot("before")} demo={!!config?.demo} fallbackLocation={fallback} />
                      <button className="primary" disabled={!shotOf("before") || !!busy} onClick={() => void act("before", () => api(`/bounties/${b.id}/photos`, { kind: "before", ...shotOf("before") }))}>
                        Save before photo
                      </button>
                    </>
                  ) : !photo("after") ? (
                    <>
                      <Camera label="After photo" onShot={setShot("after")} demo={!!config?.demo} fallbackLocation={fallback} />
                      <button className="primary" disabled={!shotOf("after") || !!busy} onClick={() => void act("after", () => api(`/bounties/${b.id}/photos`, { kind: "after", ...shotOf("after") }))}>
                        Save after photo
                      </button>
                    </>
                  ) : (
                    <button className="primary" disabled={!!busy} onClick={() => void act("proof", () => api(`/bounties/${b.id}/proof`, {}))}>
                      {busy === "proof" ? "AI is checking the photos…" : "Submit proof and get paid"}
                    </button>
                  )}
                </>
              )}

              {b.status === "objection_window" && (
                <p>
                  All checks passed. Funders can object until {when(b.window_ends_at)}; then it's paid automatically.
                  {isFunder && (
                    <button onClick={() => { const r = prompt("Why do you object?"); if (r) void act("object", () => api(`/bounties/${b.id}/object`, { reason: r })); }}>
                      Object
                    </button>
                  )}
                </p>
              )}

              {b.status === "needs_neighbour" && !isDoer && !isFunder && b.reporter_id !== uid && (
                <>
                  <p className="small">Walk past and take a photo on the spot to confirm the job is done.</p>
                  <Camera label="Confirmation photo" onShot={setShot("confirm")} demo={!!config?.demo} fallbackLocation={fallback} />
                  <button className="primary" disabled={!shotOf("confirm") || !!busy} onClick={() => void act("confirm", () => api(`/bounties/${b.id}/confirm`, shotOf("confirm")))}>
                    Confirm it's done
                  </button>
                </>
              )}

              {(b.status === "vote" || b.status === "recheck_vote") && (
                <>
                  <p>The AI wasn't sure, or something was flagged. It never rejects on its own, so the funders decide, weighted by how much they pledged. A tie pays the doer.</p>
                  {isFunder && (
                    <div className="row">
                      <button className="primary" disabled={!!busy} onClick={() => void act("pay", () => api(`/bounties/${b.id}/vote`, { choice: "pay" }))}>
                        Pay the doer
                      </button>
                      <button disabled={!!busy} onClick={() => void act("refund", () => api(`/bounties/${b.id}/vote`, { choice: "refund" }))}>
                        {b.status === "vote" ? "Don't pay (cancel holds)" : "Refund the held share"}
                      </button>
                    </div>
                  )}
                  {v.votes.length > 0 && <p className="small">{v.votes.map((x: any) => `${x.funder_id.replace("u_", "")}: ${x.choice}`).join(" · ")}</p>}
                </>
              )}

              {b.status === "paid" && !isDoer && (
                <>
                  <p className="small">
                    Recheck opens {day(b.recheck_due_at)}. Take a photo from the same spot; if the fix held, the held-back {b.holdback_pct}% goes to the doer.
                  </p>
                  <Camera label="Recheck photo" onShot={setShot("recheck")} demo={!!config?.demo} fallbackLocation={fallback} />
                  <button className="primary" disabled={!shotOf("recheck") || !!busy} onClick={() => void act("recheck", () => api(`/bounties/${b.id}/recheck`, shotOf("recheck")))}>
                    {busy === "recheck" ? "AI is comparing…" : "Submit recheck"}
                  </button>
                </>
              )}

              <button className="link" onClick={() => { const t = prompt("What's the problem? Support sees the full receipt trail."); if (t) void act("case", () => api("/cases", { bounty_id: b.id, kind: "question", body: t })); }}>
                Something wrong? Open a support case
              </button>
            </div>
          )}
          {err.length > 0 && (
            <ul className="error">
              {err.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Detail({ e }: { e: any }) {
  const d = e.data;
  const bits: string[] = [];
  if (d.amount_cents != null) bits.push(usd(d.amount_cents));
  for (const k of ["order_id", "authorization_id", "capture_id", "paypal_batch_id", "refund_id"]) if (d[k]) bits.push(`${k.replace("_id", "")} ${d[k]}`);
  if (d.action) bits.push(`→ ${d.action}`);
  if (d.reasons) bits.push(d.reasons.join(" "));
  if (d.sample) bits.push("(sample)");
  return <span className="small">{bits.join(" · ")}</span>;
}
