import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Request body */
export type BountiesPledgesRequest = {
  /** Amount in US cents */
  amountCents: number;
  /** Pledge this one replaces */
  renewOf?: string;
};

export const bountiesPledgesRequestSchema: Schema<BountiesPledgesRequest> = s.object<BountiesPledgesRequest>({
  amountCents: s.int(),
  renewOf: s.optional(s.string()),
  _keysMap: {
    amountCents: "amount_cents",
    renewOf: "renew_of",
  },
});
