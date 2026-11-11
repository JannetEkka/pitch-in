import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Order created */
export type BountiesPledgesResponse = {
  /** Pitch In pledge id */
  pledgeId?: string;
  /** PayPal order id */
  orderId?: string;
};

export const bountiesPledgesResponseSchema: Schema<BountiesPledgesResponse> =
  s.object<BountiesPledgesResponse>({
    pledgeId: s.optional(s.string()),
    orderId: s.optional(s.string()),
    _keysMap: {
      pledgeId: "pledge_id",
      orderId: "order_id",
    },
  });
