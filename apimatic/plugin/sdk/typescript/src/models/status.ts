import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Where the bounty or pledge is in its lifecycle */
export const Status = {
  Draft: "draft",
  Funding: "funding",
  Funded: "funded",
  Claimed: "claimed",
  Checking: "checking",
  ObjectionWindow: "objection_window",
  NeedsNeighbour: "needs_neighbour",
  Vote: "vote",
  Paid: "paid",
  RecheckVote: "recheck_vote",
  Closed: "closed",
  Expired: "expired",
  Referred: "referred",
} as const;
export type Status = (typeof Status)[keyof typeof Status] | (string & {});

export const statusSchema: EnumSchema<Status> = s.enumOf<Status>(Status);
