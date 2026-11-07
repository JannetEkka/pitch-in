export class ApiError extends Error {
  constructor(public status: number, message: string, public reasons: string[] = []) {
    super(message);
  }
}

export async function api<T = any>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "same-origin",
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, j.error ?? res.statusText, j.reasons ?? j.issues ?? []);
  return j as T;
}

export const usd = (c: number | null | undefined) => (c == null ? "—" : `$${(c / 100).toFixed(2)}`);
export const day = (iso: string | null | undefined) => (iso ? new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" }) : "—");
export const when = (iso: string) => new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  funding: "Raising pledges",
  funded: "Open to claim",
  claimed: "Being fixed",
  checking: "Checking proof",
  objection_window: "Objection window",
  needs_neighbour: "Needs a neighbour's OK",
  vote: "Funders deciding",
  paid: "Paid · recheck pending",
  recheck_vote: "Funders deciding (recheck)",
  closed: "Settled",
  expired: "Expired · nobody charged",
  referred: "Sent to the council",
};

export const STATUS_TONE: Record<string, string> = {
  draft: "muted",
  funding: "info",
  funded: "info",
  claimed: "work",
  checking: "work",
  objection_window: "wait",
  needs_neighbour: "wait",
  vote: "wait",
  paid: "good",
  recheck_vote: "wait",
  closed: "good",
  expired: "muted",
  referred: "bad",
};
