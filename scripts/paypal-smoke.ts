// Live sandbox smoke test of the calls that don't need a buyer to approve: OAuth, order creation, Payouts.
import { paypal } from "../server/paypal.ts";

if (paypal.mode !== "sandbox") throw new Error("Set PAYPAL_SANDBOX_CLIENT_ID and PAYPAL_SANDBOX_CLIENT_SECRET first.");
const id = `smoke-${Date.now()}`;
const order = await paypal.createOrder({ amount_cents: 1500, bounty_id: "b_smoke", pledge_id: id, description: "Smoke test pledge" }, `order-${id}`);
const again = await paypal.createOrder({ amount_cents: 1500, bounty_id: "b_smoke", pledge_id: id, description: "Smoke test pledge" }, `order-${id}`);
console.log("order", order, "same id on retry:", again.id === order.id);
console.log("read back", await paypal.getOrder(order.id));
const p = await paypal.createPayout(`pi-${id}`, { email: process.env.PAYPAL_SANDBOX_DOER_EMAIL ?? "doer@pitchin.example", amount_cents: 250, note: "Smoke test payout", item_id: `pi-${id}-1` });
const p2 = await paypal.createPayout(`pi-${id}`, { email: "doer@pitchin.example", amount_cents: 250, note: "Smoke test payout", item_id: `pi-${id}-1` }).catch((e) => ({ error: String(e).slice(0, 200) }));
console.log("payout", p, "retry:", p2);
await new Promise((r) => setTimeout(r, 4000));
console.log("payout status", await paypal.getPayout(p.payout_batch_id));
