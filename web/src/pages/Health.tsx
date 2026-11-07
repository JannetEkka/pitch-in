import { useEffect, useState } from "react";
import { api, usd } from "../api";
import { useApp } from "../App";

// One series per chart, one hue, a 2px line, 8px points with hover titles, and a table view underneath.
function Trend({ title, values, labels, unit }: { title: string; values: (number | null)[]; labels: string[]; unit: string }) {
  const w = 280;
  const h = 110;
  const pad = { l: 28, r: 10, t: 10, b: 22 };
  const nums = values.filter((v): v is number => v != null);
  const max = Math.max(...nums) * 1.15 || 1;
  const x = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (values.length - 1);
  const y = (v: number) => h - pad.b - (v / max) * (h - pad.t - pad.b);
  const pts = values.map((v, i) => (v == null ? null : [x(i), y(v), v, labels[i]] as const)).filter(Boolean) as [number, number, number, string][];
  return (
    <figure className="trend">
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${title}: ${pts.map((p) => `${p[3]} ${p[2]}${unit}`).join(", ")}`}>
        <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} className="axis" />
        <text x={pad.l - 6} y={y(max / 1.15) + 4} className="tick" textAnchor="end">
          {Math.round(max / 1.15)}
        </text>
        <polyline points={pts.map((p) => `${p[0]},${p[1]}`).join(" ")} className="line" />
        {pts.map((p) => (
          <g key={p[3]}>
            <circle cx={p[0]} cy={p[1]} r={4} className="dot" />
            <circle cx={p[0]} cy={p[1]} r={12} className="hit">
              <title>{`${p[3]}: ${p[2]}${unit}`}</title>
            </circle>
          </g>
        ))}
        {labels.map((l, i) => (
          <text key={l} x={x(i)} y={h - 6} className="tick" textAnchor="middle">
            {l}
          </text>
        ))}
        {pts.length > 0 && (
          <text x={pts.at(-1)![0]} y={pts.at(-1)![1] - 9} className="label" textAnchor="end">
            {pts.at(-1)![2]}
            {unit}
          </text>
        )}
      </svg>
    </figure>
  );
}

export function Health() {
  const { tick } = useApp();
  const [areas, setAreas] = useState<any[]>([]);
  useEffect(() => {
    void api<any[]>("/health/areas").then(setAreas);
  }, [tick]);

  return (
    <section>
      <h1>Area health</h1>
      <p>Did the street actually get better? The first row is measured from the bounties themselves. The trends show what a live deployment would track.</p>
      {areas.map((a) => (
        <div key={a.area} className="card">
          <h2>{a.area}</h2>
          <div className="tiles">
            <div>
              <b>{a.measured.fixes_paid}</b>
              <span>fixes verified and paid</span>
            </div>
            <div>
              <b>{a.measured.rechecks_passed}</b>
              <span>still fixed a week later</span>
            </div>
            <div>
              <b>{usd(a.measured.pledged_cents)}</b>
              <span>pledged by neighbours</span>
            </div>
            <div>
              <b>{usd(a.measured.paid_to_doers_cents)}</b>
              <span>paid to neighbours who did the work</span>
            </div>
            <div>
              <b>{a.measured.referred_to_council}</b>
              <span>hazards sent to the council</span>
            </div>
          </div>
          <p className="sample-label">{a.sample.label}</p>
          <div className="trends">
            <Trend title="Spots still clean at recheck" values={a.sample.still_clean_pct} labels={a.sample.weeks} unit="%" />
            <Trend title="Neighbours who walked here this week" values={a.sample.neighbours_walking_here_per_week} labels={a.sample.weeks} unit="" />
            <Trend title="Mosquito and fly reports" values={a.sample.mosquito_reports} labels={a.sample.weeks} unit="" />
          </div>
          <details>
            <summary className="small">Show as a table</summary>
            <table className="data">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Still clean</th>
                  <th>Walking here</th>
                  <th>Mosquito reports</th>
                </tr>
              </thead>
              <tbody>
                {a.sample.weeks.map((w: string, i: number) => (
                  <tr key={w}>
                    <td>{w}</td>
                    <td>{a.sample.still_clean_pct[i] ?? "—"}</td>
                    <td>{a.sample.neighbours_walking_here_per_week[i]}</td>
                    <td>{a.sample.mosquito_reports[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
          <p className="small">
            How a live deployment measures these: rechecks give "still clean"; a one-tap question to nearby neighbours ("Did you walk or run here this week?") gives use; neighbour reports
            plus the AI spotting standing water in recheck photos give mosquito risk. Free satellite imagery (10 m) can track tree cover and large dump sites over months; it can't see
            street-level litter.
          </p>
        </div>
      ))}
    </section>
  );
}
