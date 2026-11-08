import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Request body */
export type BountiesObjectRequest = {
  /** Why */
  reason: string;
};

export const bountiesObjectRequestSchema: Schema<BountiesObjectRequest> = s.object<BountiesObjectRequest>({
  reason: s.string(),
});
