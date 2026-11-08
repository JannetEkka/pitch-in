import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Where the bounty or pledge is in its lifecycle */
export const Status1 = {
  Created: "created",
  Authorized: "authorized",
  Captured: "captured",
  Voided: "voided",
  Refunded: "refunded",
  Expired: "expired",
} as const;
export type Status1 = (typeof Status1)[keyof typeof Status1] | (string & {});

export const status1Schema: EnumSchema<Status1> = s.enumOf<Status1>(Status1);
