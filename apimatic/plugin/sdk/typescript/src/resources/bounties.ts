import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { noneAuth } from "../core/auth/schemes.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import {
  bountiesPublishRequestSchema,
  type BountiesPublishRequest,
} from "../models/bounties-publish-request.js";
import { bountySchema, type Bounty } from "../models/bounty.js";
import { errorSchema, type Error } from "../models/error.js";
import { reportsRequestSchema, type ReportsRequest } from "../models/reports-request.js";
import type { Servers } from "../servers.js";

/**
 * Report, publish, list and claim bounties
 */
export class Bounties {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)
   *
   * @remarks
   * Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)
   *
   * @returns Claimed
   *
   * @throws {@link Bounties.ClaimBountyError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  claimBounty(
    request: Bounties.ClaimBountyRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Bounties.ClaimBountyError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/claim"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Bounties.ClaimBountyError,
      },
      options,
    );
  }

  /**
   * Area health (measured, plus labelled sample trends)
   *
   * @remarks
   * Area health (measured, plus labelled sample trends)
   *
   * @returns Areas
   *
   * @throws {@link Bounties.GetAreaHealthError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getAreaHealth(options?: RequestOptions): ApiPromise<Record<string, unknown>, Bounties.GetAreaHealthError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/health/areas"),
        auth: noneAuth,
        pathParams: [],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Bounties.GetAreaHealthError,
      },
      options,
    );
  }

  /**
   * A bounty with its pledges, payouts, photos, AI checks and receipts
   *
   * @remarks
   * A bounty with its pledges, payouts, photos, AI checks and receipts
   *
   * @returns Bounty detail
   *
   * @throws {@link Bounties.GetBountyError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  getBounty(
    request: Bounties.GetBountyRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Bounties.GetBountyError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/bounties/{id}"),
        auth: noneAuth,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Bounties.GetBountyError,
      },
      options,
    );
  }

  /**
   * List bounties with money totals
   *
   * @remarks
   * List bounties with money totals
   *
   * @returns Bounties
   *
   * @throws {@link Bounties.ListBountiesError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  listBounties(options?: RequestOptions): ApiPromise<Bounty[], Bounties.ListBountiesError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/bounties"),
        auth: noneAuth,
        pathParams: [],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.array(s.lazy(() => bountySchema)) },
        errorFactory: Bounties.ListBountiesError,
      },
      options,
    );
  }

  /**
   * Publish a draft; the goal can't go below the fair-price floor
   *
   * @remarks
   * Publish a draft; the goal can't go below the fair-price floor
   *
   * @returns Published
   *
   * @throws {@link Bounties.PublishBountyError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  publishBounty(
    request: Bounties.PublishBountyRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Bounties.PublishBountyError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/publish"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "json",
          value: request.body,
          schema: s.optional(s.lazy(() => bountiesPublishRequestSchema)),
        },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Bounties.PublishBountyError,
      },
      options,
    );
  }

  /**
   * Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it
   *
   * @remarks
   * Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it
   *
   * @returns Draft bounty
   *
   * @throws {@link Bounties.ReportProblemError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  reportProblem(
    request: Bounties.ReportProblemRequest,
    options?: RequestOptions,
  ): ApiPromise<Bounty, Bounties.ReportProblemError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/reports"),
        auth: this.#auth.demoUser,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: reportsRequestSchema },
      },
      {
        success: { kind: "json", schema: bountySchema },
        errorFactory: Bounties.ReportProblemError,
      },
      options,
    );
  }
}

export namespace Bounties {
  export type ClaimBountyRequest = {
    /** Bounty id */
    id: string;
  };

  export class ClaimBountyError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ClaimBountyError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export class GetAreaHealthError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Undeclared;

    static readonly errors: ErrorDecoders<GetAreaHealthError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type GetBountyRequest = {
    /** Bounty id */
    id: string;
  };

  export class GetBountyError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Undeclared;

    static readonly errors: ErrorDecoders<GetBountyError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export class ListBountiesError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ListBountiesError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type PublishBountyRequest = {
    /** Bounty id */
    id: string;
    body?: BountiesPublishRequest;
  };

  export class PublishBountyError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<PublishBountyError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ReportProblemRequest = {
    body: ReportsRequest;
  };

  export class ReportProblemError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ReportProblemError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
