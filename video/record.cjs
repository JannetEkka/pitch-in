// Records the demo against a local Pitch In server (real PayPal sandbox + Gemini).
// Logs when each scene starts, so the narration can be placed at exactly those times.
// Usage: node video/record.cjs http://localhost:8095
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const base = process.argv[2] ?? "http://localhost:8095";
const dur = Object.fromEntries(fs.readFileSync(path.join(__dirname, "durations.txt"), "utf8").trim().split("\n").map((l) => l.split("\t")).map(([f, s]) => [f, Number(s) * 1000]));
const photos = path.join(__dirname, "..", "eval", "photos");
const api = async (user, p, body) => {
  const r = await fetch(`${base}/api${p}`, { method: body === undefined ? "GET" : "POST", headers: { "Content-Type": "application/json", "X-Pitch-In-User": user }, body: body === undefined ? undefined : JSON.stringify(body) });
  const j = await r.json();
  if (!r.ok) throw new Error(`${p}: ${JSON.stringify(j)}`);
  return j;
};

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: path.join(__dirname, "rec"), size: { width: 1280, height: 720 } } });
  const page = await ctx.newPage();
  const t0 = Date.now();
  const marks = [];
  const cuts = []; // [from, to] seconds: waiting on the AI or PayPal, trimmed in editing
  const waitCut = async (fn) => { const a = (Date.now() - t0) / 1000 + 1; await fn(); const b = (Date.now() - t0) / 1000 - 0.5; if (b > a) cuts.push([a, b]); };
  let sceneStart = 0;
  const scene = async (n, fn) => {
    sceneStart = Date.now();
    marks.push({ scene: n, at: (sceneStart - t0) / 1000 });
    await fn();
    // Time spent in waits that get cut doesn't count toward the scene's length on screen.
    const startS = (sceneStart - t0) / 1000;
    const cutMs = cuts.filter(([a]) => a >= startS).reduce((sum, [a, b]) => sum + (b - a) * 1000, 0);
    const left = dur[`scene${String(n).padStart(2, "0")}.mp3`] + 400 - (Date.now() - sceneStart - cutMs);
    if (left > 0) await page.waitForTimeout(left);
  };
  const as = async (id) => {
    await page.selectOption('select[aria-label="Choose who you are"]', id);
    await page.waitForTimeout(700);
  };
  const smooth = (y) => page.evaluate((y) => window.scrollTo({ top: y, behavior: "smooth" }), y);

  await page.goto(base);
  await page.waitForTimeout(1500);
  let bountyId;

  await scene(1, async () => {
    await page.waitForTimeout(9000);
    await page.mouse.move(400, 420);
    await page.waitForTimeout(3000);
    await as("u_asha");
  });

  await scene(2, async () => {
    await page.click('a[href="#/report"]');
    await page.waitForTimeout(800);
    await page.type("textarea", "The grass along the edge of the playing field next to the footpath is overgrown, and there's plastic litter in it. People walking there have to step around it.", { delay: 12 });
    await page.setInputFiles('.camera input[type=file]', path.join(photos, "field-day2.jpg"));
    await page.waitForTimeout(1200);
    await page.click("text=Write the bounty");
    await waitCut(() => page.waitForSelector(".card h2", { timeout: 60000 }));
    await page.waitForTimeout(800);
    await smooth(250);
    await page.waitForTimeout(3500);
  });

  // Publish with the suggested goal, then find the new bounty's id.
  await page.click("text=Publish and ask neighbours to pledge");
  await waitCut(() => page.waitForURL(/#\/b\//, { timeout: 20000 }));
  bountyId = page.url().split("#/b/")[1];
  const b = (await api("u_ben", `/bounties/${bountyId}`)).bounty;

  await scene(3, async () => {
    await page.waitForTimeout(1500);
    const { pledge_id, order_id } = await api("u_ben", `/bounties/${bountyId}/pledges`, { amount_cents: b.goal_cents });
    await waitCut(async () => { await page.goto(`https://www.sandbox.paypal.com/checkoutnow?token=${order_id}`, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(2500); });
    if (await page.locator("#email").isVisible().catch(() => false)) {
      await page.fill("#email", process.env.PAYPAL_SANDBOX_BUYER_EMAIL);
      if (await page.locator("#btnNext").isVisible().catch(() => false)) await page.click("#btnNext");
      await waitCut(() => page.waitForSelector("#password", { timeout: 20000 }));
      await page.fill("#password", process.env.PAYPAL_SANDBOX_BUYER_PASSWORD);
      await page.click("#btnLogin");
    }
    const btn = page.locator('#payment-submit-btn, button[data-id="payment-submit-btn"], button:has-text("Continue"), button:has-text("Agree"), button:has-text("Complete")').first();
    await waitCut(() => btn.waitFor({ timeout: 45000 }));
    await page.waitForTimeout(2500);
    await btn.click();
    await page.waitForTimeout(2500);
    await waitCut(async () => { await api("u_ben", `/pledges/${pledge_id}/confirm`, {}); await page.goto(`${base}/#/b/${bountyId}`); });
    await page.waitForTimeout(500);
    await as("u_ben");
    await page.waitForTimeout(1500);
  });

  await scene(4, async () => {
    await as("u_dev");
    await page.click("text=Claim this job");
    await page.waitForTimeout(1200);
    await page.setInputFiles('.camera input[type=file]', path.join(photos, "field-day1.jpg"));
    await page.waitForTimeout(900);
    await page.click("text=Save before photo");
    await page.waitForTimeout(1200);
    await page.setInputFiles('.camera input[type=file]', path.join(photos, "field-day2.jpg"));
    await page.waitForTimeout(900);
    await page.click("text=Save after photo");
    await page.waitForTimeout(1200);
  });

  await scene(5, async () => {
    await page.click("text=Submit proof and get paid");
    await waitCut(() => page.waitForSelector("text=AI check of the proof", { timeout: 60000 }));
    await page.waitForTimeout(600);
    await page.locator("text=AI check of the proof").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy({ top: -120, behavior: "smooth" }));
    await page.waitForTimeout(7000);
    await as("u_ben");
    await smooth(0);
    await page.waitForTimeout(800);
    await page.click("text=Don't pay (cancel holds)");
    await page.waitForTimeout(2500);
  });

  await scene(6, async () => {
    await page.goto(`${base}/#/b/b_canal`);
    await page.waitForTimeout(3500);
    await page.locator("text=Receipts for this bounty").scrollIntoViewIfNeeded();
    await page.waitForTimeout(6000);
    await page.goto(`${base}/#/ledger`);
    await page.waitForTimeout(1200);
    await page.check('.check input[type=checkbox]');
    await page.waitForTimeout(1000);
  });

  await scene(7, async () => {
    await page.click("text=Verify the chain");
    await page.waitForTimeout(3500);
    await page.goto(`${base}/#/support`);
    await page.waitForTimeout(1500);
    await page.locator(".ag-row", { hasText: "investigated" }).first().click();
    await page.waitForTimeout(1500);
  });

  await scene(8, async () => {
    await page.goto(`${base}/#/plan`);
    await page.waitForTimeout(7000);
    await page.goto(`${base}/docs/`);
    await page.waitForTimeout(2500);
    await page.click("text=SDKs");
    await page.waitForTimeout(3000);
  });

  await scene(9, async () => {
    await page.goto(`${base}/#/`);
    await page.waitForTimeout(500);
  });
  await page.waitForTimeout(1500);

  fs.writeFileSync(path.join(__dirname, "marks.json"), JSON.stringify({ marks, cuts }, null, 1));
  console.log(JSON.stringify(marks), "bounty", bountyId);
  await ctx.close();
  await browser.close();
})();
