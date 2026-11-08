import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Result */
export type LedgerVerifyResponse = {
  /** True if the chain is intact */
  ok?: boolean;
  /** Receipts checked */
  count?: number;
  /** First receipt that fails, if any */
  brokenAt?: number | null;
  /** Hash of the latest receipt */
  head?: string;
};

export const ledgerVerifyResponseSchema: Schema<LedgerVerifyResponse> = s.object<LedgerVerifyResponse>({
  ok: s.optional(s.boolean()),
  count: s.optional(s.int()),
  brokenAt: s.optionalNullable(s.int()),
  head: s.optional(s.string()),
  _keysMap: {
    brokenAt: "broken_at",
  },
});
