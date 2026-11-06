export function About() {
  return (
    <section className="narrow prose">
      <h1>How Pitch In works</h1>
      <p>
        Small things in a neighbourhood stay broken because they're nobody's job: a blocked drain, litter along a footpath, a cracked bench. Plenty of neighbours would chip in to
        get them fixed, and plenty of people nearby would do the work for fair pay. What's missing is trust in both directions: funders don't want to pay for a job that wasn't
        done, and the person doing it wants to know the money is really there.
      </p>
      <h2>The flow</h2>
      <ol>
        <li>
          <b>Report.</b> A neighbour describes the problem and takes a photo. The AI writes the bounty: a checklist the after photo must show, an estimate of hours and skill, and
          a fair price (hours × local fair rate × skill + materials). Dangerous jobs are never priced; they become a report to the council.
        </li>
        <li>
          <b>Pledge.</b> Neighbours pledge through PayPal. Each pledge is a PayPal authorization: the money is held on the funder's account, not charged.
        </li>
        <li>
          <b>Claim.</b> Someone nearby claims the job (not the reporter, not a funder). The claim locks it to them, and the money is already held.
        </li>
        <li>
          <b>Proof.</b> Before and after photos, taken live in the app, with time and place. The AI checks it's the same spot, checks each checklist item, and looks for
          staging. Plain-code fraud checks catch reused or unchanged photos.
        </li>
        <li>
          <b>Pay.</b> If everything passes, PayPal captures each funder's share and pays the doer through PayPal Payouts the same day, minus a held-back share. Bigger bounties
          add a 24-hour objection window, and over $100 a neighbour confirms on the spot.
        </li>
        <li>
          <b>Recheck.</b> A week later another neighbour photographs the spot. If the fix held, the held-back share is paid. If not, funders decide whether to refund it.
        </li>
      </ol>
      <h2>Who decides what</h2>
      <p>
        The AI does the judging and explains it. Plain code decides whether money moves, and enforces limits the AI can't break: no payout larger than what was captured, no paying
        twice (every PayPal call carries an idempotency key), no claim on a bounty whose holds are about to expire. The AI never rejects anyone on its own: anything short of a
        clean pass goes to the funders, weighted by what they pledged, and a tie pays the doer.
      </p>
      <h2>Receipts and support</h2>
      <p>
        Every decision and money movement is written to a hash-chained receipt log with the PayPal ids behind it. Failed payments, holds that run out mid-job, and mismatches
        found by reconciling against PayPal open a support case automatically. An AI investigator reads PayPal through the PayPal Agent Toolkit (read-only) and proposes a next
        step.
      </p>
      <h2>Honest limits of this demo</h2>
      <ul>
        <li>It runs on the PayPal sandbox with test money. In production, holding neighbours' money and paying it to someone else needs PayPal's marketplace setup (multiparty / Commerce Platform) and the licences that go with it.</li>
        <li>Sign-in here is a persona picker. Production would use Log in with PayPal, which ties each account to a verified phone, email and bank.</li>
        <li>The area-health trends are sample data and are labelled as such.</li>
      </ul>
    </section>
  );
}
