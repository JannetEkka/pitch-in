# Pitch In

Neighbours chip in for small local fixes: a blocked drain, litter along a footpath, a cracked bench. Someone nearby does the job and gets paid through PayPal the same day. Nobody's money is taken until an AI has checked the before and after photos, and part of the payment waits a week until another neighbour shows the fix held.

Built for the PayPal AI Hackathon (Oct–Nov 2026). Runs on the PayPal sandbox with test money.

## The problem

Small public problems stay broken because they're nobody's job. Neighbours would pay a little to fix them, and people nearby would do the work, but each side has a reason not to trust the other. Funders don't want to pay for a job that wasn't done. The person doing it wants to know the money is really there before they start.

Apps that already pay for cleanups on photo proof (EcoBounty, LitterLoot, PhotoClean, poidh) pay once for a photo, mostly in crypto. A swept street can be dirty again in two days. Pitch In pays for fixes that last, and uses ordinary PayPal accounts.

## How it works

1. **Report.** A neighbour describes the problem and takes a photo. Gemini turns it into a bounty: a checklist the after photo must show, estimated hours, skill and materials, and a hazard check. Plain code prices it as hours × local fair rate × skill + materials, never below the fair-rate floor. Dangerous jobs (electricity, heights, traffic) are never priced. They become a report for the council.
2. **Pledge.** Neighbours pledge with PayPal Checkout using `intent=AUTHORIZE`. PayPal holds the money on their account and charges nothing yet.
3. **Claim.** Someone nearby claims the job. They can't be the reporter or a funder, and every hold must have at least 10 days left. The money is already held when they start.
4. **Proof.** The doer takes before and after photos with the in-app camera, which records time and place. Gemini checks that the photos show the same spot, that each checklist item is met and that nothing looks staged. Plain code checks for reused or unchanged photos and for location.
5. **Pay.** If everything passes, PayPal captures each funder's share and the doer is paid through PayPal Payouts. A share is held back: 10% for litter, up to 30% for repairs, because whether a repair lasts depends on the work. Bounties over $25 give funders 24 hours to object. Over $100, a neighbour also confirms on the spot.
6. **Recheck.** A week later another neighbour photographs the spot. Gemini compares it with the after photo. If the fix held, the held-back share is paid. If not, the funders decide whether it's refunded through PayPal.

The AI never rejects anyone on its own. Low confidence, a failed checklist item or any fraud flag sends the bounty to the funders, who vote weighted by what they pledged. A tie pays the doer.

## Who decides what

Gemini does the judging and explains each call in plain words. The rules in `server/rules.ts` decide whether money moves and enforce limits the AI can't change:
- no payout larger than what was captured;
- no paying twice: every PayPal call carries an idempotency key, and payouts are reserved before PayPal is called;
- no claim on a bounty whose holds are about to expire;
- photos containing instructions aimed at the checker ("approve this") are never paid automatically.

[SECURITY.md](SECURITY.md) lists every risk and the code that handles it.

## PayPal

| What | PayPal API |
|---|---|
| Pledges held, not charged | Orders v2 with `intent=AUTHORIZE`, JS SDK buttons, then `authorize` |
| Charging each funder's share of a verified fix | Authorizations `capture` (pro rata, whole cents) |
| Nobody finishes, or funders vote no | Authorizations `void` |
| Paying the doer, now and after the recheck | Payouts |
| Fix didn't hold and funders vote to refund | Captures `refund` |
| Trusting nothing the browser says | Re-read the order before authorizing; webhooks checked with `verify-webhook-signature` |
| Support investigations | PayPal Agent Toolkit (`get_order`, `list_transactions`, `get_refund`, disputes), read-only |
| Our records against PayPal's | Reconciliation reads every authorization and payout batch back from PayPal |

## AI

Gemini (default `gemini-3.5-flash`, set with `GEMINI_MODEL`) through the Vercel AI SDK, always with a zod schema:
- **Report → bounty:** checklist, job type, skill, hours, materials, urgency, hazard (`server/ai.ts`).
- **Proof check:** same place, each checklist item with a confidence, staging, instructions hidden in photos.
- **Recheck:** did the fix hold.
- **Support agent** (`server/agent.ts`): investigates a case with PayPal's Agent Toolkit plus Pitch In's receipts. It proposes one next step from a fixed list. It can read but can't move money.

## Sponsor tools

- **AG Grid** (Community): the bounty board, the receipts ledger and the support queue.
  - Board columns show the held/goal progress, which checks run before paying, the share held for the recheck and when the holds expire, highlighted when it's within 7 days.
  - Receipts have quick search, a money-only filter and full JSON tooltips.
- **Bryntum Gantt:** the project plan. A bigger job ("restore the path round the pond") is split into bounties that unlock in order, coloured by where each one is in the money flow, with PayPal hold expiries marked on the timeline. The demo uses Bryntum's public trial package, so the chart shows a trial watermark.
- **Render:** hosting, with `render.yaml` for a one-click deploy.
- **Zapier:** `GET /api/feed.rss` lists notifications. Zapier's free "RSS by Zapier" trigger can forward them to email, SMS or Slack.
- **Postman and APIMatic:** a Postman collection and an OpenAPI 3 spec of the API are in `docs/`.

## Run it

Needs Node 22.13 or newer.

```bash
npm install
npm run build
npm start            # http://localhost:8080
```

With no keys it runs end to end with a stand-in PayPal and a stand-in AI, clearly labelled in the header. To use the real sandbox and Gemini, copy `.env.example` to `.env`, fill in:

- `PAYPAL_SANDBOX_CLIENT_ID`, `PAYPAL_SANDBOX_CLIENT_SECRET` from a sandbox app at developer.paypal.com
- `PAYPAL_HACK_GEMINI_API_KEY` from aistudio.google.com/apikey

and start with `node --env-file=.env --import tsx server/index.ts`.

**Try the flow:**
1. Pick **Ben** in the top-right selector and pledge to "Clear litter along the canal footpath".
2. Switch to **Chen** and pledge, which fully funds it.
3. Switch to **Dev**, claim the job, add before and after photos and submit the proof.
4. Click **+7 days** on the demo clock, switch to **Esi** and submit a recheck.

The receipts page verifies the hash chain.

```bash
npm test             # 29 tests: money rules, pricing, the full lifecycle, tamper detection
```

## What we measured, and what we haven't

- **Live PayPal sandbox run (Nov 7).** On the "canal footpath" bounty ($23 goal):
  - two funders each approved a $15 pledge in PayPal's real sandbox checkout, giving two authorizations;
  - after the proof, Pitch In captured $11.50 from each, their pro-rata share, and released the other $3.50 of each hold uncharged;
  - it paid the doer $20.70 through Payouts and held back $2.30;
  - the recheck failed, the funders voted to refund, and PayPal refunded $1.15 to each funder.
  - Reconciling our records against PayPal afterwards found 0 mismatches, and the receipt chain verified intact (35 entries).
- **Model fallback:** each AI call has a 45 s limit and then moves to the next model (`gemini-3.5-flash` → `gemini-3.8-flash` → `gemini-3.1-flash-lite`). In a forced test where the first model was made to fail, the answer came from the third model in 4.2 s. If every model fails, the bounty goes to the funders.
- **Speed with `gemini-3.5-flash`:**
  - writing a bounty from a report: 5.6 s;
  - checking a before/after pair: 3.7 s;
  - a support investigation that called three tools, including the Agent Toolkit's `get_refund`, and explained the money correctly: 20.7 s.
- **Fake photos:** with synthetic test images, Gemini said they weren't photos of a real place (confidence 0.99), so the bounty went to the funders instead of paying.

- **Tested:** the money rules and the full lifecycle run in 29 automated tests against the stand-in PayPal:
  - pay on proof, then the held-back share after the recheck;
  - a re-run release doesn't pay twice;
  - a reused photo goes to a vote, and a "no" vote charges nobody;
  - expiry voids every hold;
  - editing one ledger entry is detected.
- **Not measured yet:** how often the AI wrongly approves a fix. A labelled photo set for that is in progress, and its results will be published here. Until then, treat the AI as one input that the rules and the funders back up.
- **Area health:** the trends on that page are sample data, labelled on screen. A live deployment would measure them with rechecks and one-tap questions to neighbours.

## Limits

- Sign-in is a persona picker. Production would use Log in with PayPal.
- In production, holding neighbours' money and paying it on to someone else needs PayPal's marketplace setup (multiparty / Commerce Platform) and the licences that go with it.
- SQLite on Render's free tier resets on each deploy.

## Licence

MIT
