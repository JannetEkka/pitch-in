// Live sandbox run: real PayPal buyer approval in a browser, then the money flow through Pitch In's API.
// Usage: node scripts/live-e2e.mjs http://localhost:8093   (needs PAYPAL_SANDBOX_BUYER_EMAIL / _PASSWORD)
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const base = process.argv[2] ?? "http://localhost:8080";
const call = async (user, path, body) => {
  const r = await fetch(`${base}/api${path}`, { method: body === undefined ? "GET" : "POST", headers: { "Content-Type": "application/json", "X-Pitch-In-User": user }, body: body === undefined ? undefined : JSON.stringify(body) });
  const j = await r.json();
  if (!r.ok) throw new Error(`${path}: ${JSON.stringify(j)}`);
  return j;
};
async function approve(page, orderId) {
  await page.goto(`https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);
  if (await page.locator("#email").isVisible().catch(() => false)) {
    await page.fill("#email", process.env.PAYPAL_SANDBOX_BUYER_EMAIL);
    if (await page.locator("#btnNext").isVisible().catch(() => false)) await page.click("#btnNext");
    await page.waitForSelector("#password", { timeout: 20000 });
    await page.fill("#password", process.env.PAYPAL_SANDBOX_BUYER_PASSWORD);
    await page.click("#btnLogin");
  }
  await page.screenshot({ path: "/tmp/claude-0/approve-debug.png" });
  const btn = page.locator('#payment-submit-btn, button[data-id="payment-submit-btn"], button:has-text("Continue"), button:has-text("Agree"), button:has-text("Complete")').first();
  await btn.waitFor({ timeout: 25000 }).catch(async (e) => { await page.screenshot({ path: "/tmp/claude-0/approve-timeout.png" }); console.log("URL", page.url()); throw e; });
  await page.waitForTimeout(1500);
  await btn.click();
  await page.waitForTimeout(6000);
}
const b = await chromium.launch();
const page = await b.newPage();
const bid = process.argv[3] ?? "b_canal";
for (const [u, amt] of [["u_ben", 1500], ["u_chen", 1500]]) {
  const { pledge_id, order_id } = await call(u, `/bounties/${bid}/pledges`, { amount_cents: amt });
  await approve(page, order_id);
  await page.screenshot({ path: `/tmp/claude-0/approve-${u}.png` });
  const p = await call(u, `/pledges/${pledge_id}/confirm`, {});
  console.log(u, "pledge", p.status, p.authorization_id, "expires", p.auth_expires_at);
}
await b.close();
console.log("bounty", (await call("u_ben", `/bounties/${bid}`)).bounty.status);
