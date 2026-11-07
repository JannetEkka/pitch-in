import { useState } from "react";
import { api, ApiError, usd } from "../api";
import { useApp } from "../App";
import { Camera, type Shot } from "../components/Camera";

const HOME = { lat: 12.9719, lng: 77.6412 }; // the sample neighbourhood

export function Report() {
  const { me, config, bump } = useApp();
  const [text, setText] = useState("");
  const [area, setArea] = useState("Lakeview Lane");
  const [shot, setShot] = useState<Shot | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string[]>([]);
  const [draft, setDraft] = useState<any>(null);
  const [goal, setGoal] = useState(0);

  if (!me) return <p className="note">Choose who you are (top right) to report a problem.</p>;

  const submit = async () => {
    setBusy(true);
    setErr([]);
    try {
      const b = await api("/reports", { text, area, photo: shot, lat: shot?.lat ?? HOME.lat, lng: shot?.lng ?? HOME.lng });
      setDraft(b);
      setGoal(b.goal_cents);
    } catch (e) {
      setErr(e instanceof ApiError ? [e.message, ...e.reasons] : [String(e)]);
    } finally {
      setBusy(false);
    }
  };
  const publish = async () => {
    try {
      await api(`/bounties/${draft.id}/publish`, { goal_cents: goal });
      bump();
      location.hash = `#/b/${draft.id}`;
    } catch (e) {
      setErr(e instanceof ApiError ? [e.message, ...e.reasons] : [String(e)]);
    }
  };

  return (
    <section className="narrow">
      <h1>Report a problem</h1>
      {!draft ? (
        <>
          <p>Describe it the way you'd tell a neighbour. The AI turns it into a bounty: what the after photo must show, a fair price, and a deadline.</p>
          <label className="field">
            What's wrong?
            <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="The drain outside the school gate is blocked with leaves. Water stands for days and mosquitoes breed." />
          </label>
          <label className="field">
            Area
            <input value={area} onChange={(e) => setArea(e.target.value)} />
          </label>
          <Camera label="Photo of the problem (helps catch staged fixes later)" onShot={setShot} demo={!!config?.demo} fallbackLocation={HOME} />
          <button className="primary" disabled={busy || text.trim().length < 5} onClick={() => void submit()}>
            {busy ? "The AI is writing the bounty…" : "Write the bounty"}
          </button>
        </>
      ) : draft.status === "referred" ? (
        <div className="card bad">
          <h2>This one is for the council, not a neighbour</h2>
          <p>
            The AI flagged a hazard: <b>{draft.hazard}</b>. Pitch In never prices dangerous work. A report with your description and photo is in the support queue to send to the
            municipality.
          </p>
        </div>
      ) : (
        <div className="card">
          <h2>{draft.title}</h2>
          <p className="small">
            {draft.job_type} · {draft.skill} skill · about {draft.est_hours} h
          </p>
          <h3>The after photo must show</h3>
          <ul className="checklist">
            {draft.checklist.map((c: any) => (
              <li key={c.id}>{c.text}</li>
            ))}
          </ul>
          <h3>Fair price</h3>
          <p>
            Suggested {usd(draft.price_low_cents)} to {usd(draft.price_high_cents)}. How it was worked out:
          </p>
          <ul className="small">
            {draft.pricing_notes.map((n: string, i: number) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
          <p className="small">
            {draft.holdback_pct}% of the payment waits for a "still fixed?" check {config?.limits.recheckAfterDays} days later.
          </p>
          <label className="field">
            Goal
            <span className="money-input">
              $<input type="number" min={draft.price_low_cents / 100} step={0.5} value={goal / 100} onChange={(e) => setGoal(Math.round(Number(e.target.value) * 100))} />
            </span>
          </label>
          <button className="primary" onClick={() => void publish()}>
            Publish and ask neighbours to pledge
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
    </section>
  );
}
