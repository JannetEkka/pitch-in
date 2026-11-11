import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { status1Schema, type Status1 } from "./status1.js";

/** A funder's PayPal hold toward a bounty */
export type Pledge = {
  /** Unique id */
  id?: string;
  /** Bounty this belongs to */
  bountyId?: string;
  /** Neighbour who pledged */
  funderId?: string;
  /** Amount in US cents */
  amountCents?: number;
  /** PayPal order id (intent AUTHORIZE) */
  orderId?: string;
  /** PayPal authorization id */
  authorizationId?: string | null;
  /** When the PayPal hold expires */
  authExpiresAt?: Date | null;
  /** Where the bounty or pledge is in its lifecycle */
  status?: Status1;
  /** Amount PayPal captured, in cents */
  capturedCents?: number;
  /** PayPal capture id */
  captureId?: string | null;
};

export const pledgeSchema: Schema<Pledge> = s.object<Pledge>({
  id: s.optional(s.string()),
  bountyId: s.optional(s.string()),
  funderId: s.optional(s.string()),
  amountCents: s.optional(s.int()),
  orderId: s.optional(s.string()),
  authorizationId: s.optionalNullable(s.string()),
  authExpiresAt: s.optionalNullable(s.dateTime()),
  status: s.optional(s.lazy(() => status1Schema)),
  capturedCents: s.optional(s.int()),
  captureId: s.optionalNullable(s.string()),
  _keysMap: {
    bountyId: "bounty_id",
    funderId: "funder_id",
    amountCents: "amount_cents",
    orderId: "order_id",
    authorizationId: "authorization_id",
    authExpiresAt: "auth_expires_at",
    capturedCents: "captured_cents",
    captureId: "capture_id",
  },
});
