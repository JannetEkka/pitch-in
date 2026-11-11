import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Request body */
export type CasesRequest = {
  /** Bounty this belongs to */
  bountyId?: string | null;
  /** Kind of case or photo */
  kind: string;
  /** What happened, in your words */
  body: string;
};

export const casesRequestSchema: Schema<CasesRequest> = s.object<CasesRequest>({
  bountyId: s.optionalNullable(s.string()),
  kind: s.string(),
  body: s.string(),
  _keysMap: {
    bountyId: "bounty_id",
  },
});
