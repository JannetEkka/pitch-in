import { buildAuthSchemes, type AuthSchemes } from "./auth-schemes.js";
import type { ClientOptions } from "./client-options.js";
import { buildCoreClientOptions } from "./core/client-options.js";
import { RawClient } from "./core/raw-client.js";
import * as host from "./core/runtime-environment.js";
import * as s from "./core/validation/index.js";
import { Bounties } from "./resources/bounties.js";
import { Pledges } from "./resources/pledges.js";
import { Proof } from "./resources/proof.js";
import { Receipts } from "./resources/receipts.js";
import { Session } from "./resources/session.js";
import { Support } from "./resources/support.js";
import { buildServers, type Servers } from "./servers.js";

/**
 * Neighbourhood bounties paid through PayPal only when the fix is verified, and again when it
 * lasts. Pledges are PayPal authorizations (held, not charged). The doer is paid with PayPal
 * Payouts. Sign in by sending a sample neighbour id in the X-Pitch-In-User header (demo only;
 * production would use Log in with PayPal).
 */
export class PitchInApiClient {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;
  #bounties?: Bounties;
  #pledges?: Pledges;
  #proof?: Proof;
  #receipts?: Receipts;
  #support?: Support;
  #session?: Session;

  constructor(options: ClientOptions = {}) {
    this.#rawClient = new RawClient({
      ...buildCoreClientOptions(options, "PITCH_IN_API_CLIENT_LOG"),
      defaultHeaders: [
        { name: "User-Agent", value: "PitchInApiClient/0.1.0 TypeScript", schema: s.string() },
        { name: "X-APIMatic-Lang", value: "TypeScript", schema: s.string() },
        { name: "X-APIMatic-Package-Version", value: "0.1.0", schema: s.string() },
        { name: "X-APIMatic-Gen-Version", value: "4.0.0", schema: s.string() },
        { name: "X-APIMatic-OS", value: host.operatingSystem(), schema: s.optional(s.string()) },
        { name: "X-APIMatic-Runtime", value: host.runtimeDescription(), schema: s.optional(s.string()) },
      ],
      defaultQuery: [],
      defaultPathParams: [],
    });

    this.#servers = buildServers(options);

    this.#auth = buildAuthSchemes(options);
  }

  /**
   * Report, publish, list and claim bounties
   */
  get bounties(): Bounties {
    return (this.#bounties ??= new Bounties(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * PayPal holds toward a bounty
   */
  get pledges(): Pledges {
    return (this.#pledges ??= new Pledges(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * Photos, AI checks, votes and the recheck
   */
  get proof(): Proof {
    return (this.#proof ??= new Proof(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * The hash-chained receipt log
   */
  get receipts(): Receipts {
    return (this.#receipts ??= new Receipts(this.#rawClient, this.#servers));
  }

  /**
   * Support cases and reconciliation with PayPal
   */
  get support(): Support {
    return (this.#support ??= new Support(this.#rawClient, this.#servers, this.#auth));
  }

  /**
   * Demo sign-in
   */
  get session(): Session {
    return (this.#session ??= new Session(this.#rawClient, this.#servers));
  }
}
