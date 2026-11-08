// A residents' association runs its own website. When a resident fills in its "report a problem" form,
// this script turns it into a Pitch In bounty through the APIMatic-generated SDK, publishes it, and starts
// the association's own pledge, which a committee member then approves in PayPal.
//
//   PITCH_IN_URL=https://pitch-in.onrender.com/api npm start
import { PitchInApiClient } from "pitch-in-api";

const baseUrl = process.env.PITCH_IN_URL ?? "http://localhost:8080/api";
const resident = new PitchInApiClient({ serverOptions: { baseUrl }, demoUser: "u_asha" });
const committee = new PitchInApiClient({ serverOptions: { baseUrl }, demoUser: "u_ben" });

const draft = await resident.bounties.reportProblem({
  body: {
    text: "The bus shelter on Lakeview Lane has posters and tape stuck all over the glass. People can't see the bus coming.",
    area: "Lakeview Lane",
    lat: 12.9721,
    lng: 77.6409,
  },
});
console.log(`AI wrote: "${draft.title}" (${draft.jobType}, ${draft.skill} skill, about ${draft.estHours} h)`);
for (const c of draft.checklist ?? []) console.log(`  after photo must show: ${c.text}`);
console.log(`Fair price $${(draft.priceLowCents! / 100).toFixed(2)} to $${(draft.priceHighCents! / 100).toFixed(2)}, goal $${(draft.goalCents! / 100).toFixed(2)}`);

if (draft.status === "referred") {
  console.log(`Hazard (${draft.hazard}): sent to the council instead.`);
} else {
  await resident.bounties.publishBounty({ id: draft.id!, body: {} });
  const pledge = await committee.pledges.startPledge({ id: draft.id!, body: { amountCents: 1000 } });
  console.log(`Committee pledge ${pledge.pledgeId}: PayPal order ${pledge.orderId} is waiting for approval.`);
  console.log(`Once approved in PayPal, confirmPledge({ id: "${pledge.pledgeId}" }) places the hold.`);
}
const all = await resident.bounties.listBounties();
console.log(`${all.length} bounties on Pitch In now.`);
