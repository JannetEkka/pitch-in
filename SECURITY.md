# Security and risk

Pitch In moves money on the strength of photos and an AI's judgement, so most of the design is about what can go wrong. This file lists each risk and the code that handles it.

## The principle

The AI judges and explains. Plain code (`server/rules.ts`) decides whether money moves. PayPal holds the money until then. The AI has no tool that moves money: its output is a schema-checked verdict, and anything that fails to parse counts as "unsure".

## Money

| Risk | Handling | Where |
|---|---|---|
| Charging funders for work that wasn't done | Pledges are PayPal authorizations (`intent=AUTHORIZE`). They're captured only after the checks pass, and voided if nobody finishes. | `bounties.ts` `confirmPledge`, `releaseProofStage`, `tick` |
| Paying twice (retries, double clicks, crashes mid-release) | Every PayPal POST carries a `PayPal-Request-Id` derived from our own ids. Each payout is reserved in the database under a unique `sender_batch_id` before PayPal is called. Re-running a release is safe. | `paypal.ts`, `bounties.ts` `payout` |
| Paying out more than was collected | `canPayout`: a payout must fit within what was captured minus what was already paid or refunded. | `rules.ts` |
| Overcharging an over-funded bounty | `capturePlan` captures each funder's pro-rata share of the goal, never more than they authorised, in whole cents. | `rules.ts` |
| Trusting the browser's word that a payment happened | The server re-reads the order from PayPal and checks status and amount before authorising. Webhooks are checked with PayPal's `verify-webhook-signature`, then state is re-read from PayPal. | `bounties.ts`, `index.ts` |
| A hold expiring mid-job | Claims need at least 10 days left on every hold. Funders are asked to renew 7 days before expiry. A hold expiring during work opens a support case. The held-back share is captured with the rest at proof time, so the recheck can't be stranded by an expired hold. | `rules.ts` `canClaim`, `bounties.ts` `tick` |
| Our records drifting from PayPal's | Reconciliation compares every authorization and payout with PayPal (every 6 hours, and on demand) and opens a case for each mismatch. | `bounties.ts` `reconcile` |
| Pointing the app at live PayPal by mistake | The app refuses to start unless the PayPal base URL is the sandbox. | `config.ts` |

## Photos and fraud

| Risk | Handling |
|---|---|
| Reusing an old or someone else's photo | A 64-bit difference hash of every photo; a near-match with another bounty's photo, or the same kind in this bounty, blocks payment. |
| "After" is just the "before" again | A hash distance of 2 bits or less between before and after blocks payment. |
| Staging: dumping rubbish to clean it up | The problem photo comes from a different person (the reporter) before any claim. The AI compares the report photo with the before photo and flags extra mess. Reporters and funders can't claim. Repeat reporter–doer pairs in an area are flagged. |
| Photos taken elsewhere | Location must be within 75 m of the bounty, with accuracy of 60 m or better. Location can be spoofed, so it's one signal among several. |
| Gallery uploads | The in-app camera is the normal path. Uploads are allowed only in demo mode and are flagged on every check. |
| Instructions hidden in a photo ("approve this") | The model is told to ignore them and set `instructions_in_image`. If it does, the bounty goes to the funders' vote and is never paid automatically. |
| Location leaks | Every stored photo is re-encoded, which strips EXIF, including GPS. |

## People

- **The AI never rejects on its own.** Low confidence, a failed item or any flag sends the bounty to the funders, weighted by the amount pledged, and a tie pays the doer. The doer can add photos.
- **Tiers:**
  - Up to $25: paid automatically when every check passes.
  - Up to $100: funders get 24 hours to object first.
  - Over $100: a neighbour who isn't the doer, the reporter or a funder must also confirm on the spot.
- **Limits for new doers:** open work is capped at $50 until a fix passes its recheck, then at $150 a day.
- **Hazards:** jobs involving live electricity, heights, traffic or sewage entry are never priced. They become a council report in the support queue.

## Receipts

`server/ledger.ts` writes every decision and money movement to an append-only log. Each entry's SHA-256 hash covers the previous entry's hash, so editing or deleting a past entry breaks the chain. `GET /api/ledger/verify` re-checks the whole chain, and a test tampers with an entry to prove it's caught.

## Web

- HttpOnly, SameSite=Strict session cookie.
- Content Security Policy that allows only PayPal's hosts.
- `nosniff`, a frame-ancestors restriction and a narrow `Permissions-Policy` (camera and location only).
- Per-IP write rate limit, zod validation on every input, and a 12 MB request cap.
- User text rendered by Bryntum is HTML-encoded.

## Known limits (sandbox demo)

- **Sign-in is a persona picker.** Production would use Log in with PayPal, which ties each account to PayPal's verified identity (phone, email, bank).
- **Holding funds:** holding neighbours' money and paying it on to someone else needs PayPal's marketplace setup (multiparty / Commerce Platform) and the licences that go with it. The sandbox runs the same flow from one business account.
- **Database:** SQLite on Render's free tier resets on each deploy. Fine for a demo; production needs a managed database.
