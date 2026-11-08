import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Request body */
export type BountiesPublishRequest = {
  /** Funding goal, in cents */
  goalCents?: number;
};

export const bountiesPublishRequestSchema: Schema<BountiesPublishRequest> = s.object<BountiesPublishRequest>({
  goalCents: s.optional(s.int()),
  _keysMap: {
    goalCents: "goal_cents",
  },
});
