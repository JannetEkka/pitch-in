import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** One receipt in the hash-chained log */
export type LedgerEntry = {
  /** Position in the receipt chain */
  seq?: number;
  /** When it happened */
  at?: Date;
  /** Bounty this belongs to */
  bountyId?: string | null;
  /** What happened */
  event?: string;
  /** Details of the event */
  data?: Record<string, unknown>;
  /** Hash of the previous receipt */
  prevHash?: string;
  /** SHA-256 over this receipt and the previous hash */
  hash?: string;
};

export const ledgerEntrySchema: Schema<LedgerEntry> = s.object<LedgerEntry>({
  seq: s.optional(s.int()),
  at: s.optional(s.dateTime()),
  bountyId: s.optionalNullable(s.string()),
  event: s.optional(s.string()),
  data: s.optional(s.record(s.string(), s.unknown())),
  prevHash: s.optional(s.string()),
  hash: s.optional(s.string()),
  _keysMap: {
    bountyId: "bounty_id",
    prevHash: "prev_hash",
  },
});
