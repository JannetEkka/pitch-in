import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import {
  bountiesPledgesRequestSchema,
  type BountiesPledgesRequest,
} from "../models/bounties-pledges-request.js";
import {
  bountiesPledgesResponseSchema,
  type BountiesPledgesResponse,
} from "../models/bounties-pledges-response.js";
import { errorSchema, type Error } from "../models/error.js";
import { pledgeSchema, type Pledge } from "../models/pledge.js";
import type { Servers } from "../servers.js";

/**
 * PayPal holds toward a bounty
 */
export class Pledges {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * After PayPal approval, authorize the order (money held, not charged)
   *
   * @remarks
   * After PayPal approval, authorize the order (money held, not charged)
   *
   * @returns Authorized
   *
   * @throws {@link Pledges.ConfirmPledgeError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  confirmPledge(
    request: Pledges.ConfirmPledgeRequest,
    options?: RequestOptions,
  ): ApiPromise<Pledge, Pledges.ConfirmPledgeError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/pledges/{id}/confirm"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: pledgeSchema },
        errorFactory: Pledges.ConfirmPledgeError,
      },
      options,
    );
  }

  /**
   * Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve
   *
   * @remarks
   * Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve
   *
   * @returns Order created
   *
   * @throws {@link Pledges.StartPledgeError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  startPledge(
    request: Pledges.StartPledgeRequest,
    options?: RequestOptions,
  ): ApiPromise<BountiesPledgesResponse, Pledges.StartPledgeError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/pledges"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: bountiesPledgesRequestSchema },
      },
      {
        success: { kind: "json", schema: bountiesPledgesResponseSchema },
        errorFactory: Pledges.StartPledgeError,
      },
      options,
    );
  }
}

export namespace Pledges {
  export type ConfirmPledgeRequest = {
    /** Pledge id */
    id: string;
  };

  export class ConfirmPledgeError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ConfirmPledgeError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type StartPledgeRequest = {
    /** Bounty id */
    id: string;
    body: BountiesPledgesRequest;
  };

  export class StartPledgeError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<StartPledgeError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
