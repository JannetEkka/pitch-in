import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import {
  bountiesObjectRequestSchema,
  type BountiesObjectRequest,
} from "../models/bounties-object-request.js";
import {
  bountiesPhotosRequestSchema,
  type BountiesPhotosRequest,
} from "../models/bounties-photos-request.js";
import { bountiesVoteRequestSchema, type BountiesVoteRequest } from "../models/bounties-vote-request.js";
import { errorSchema, type Error } from "../models/error.js";
import { photoSchema, type Photo } from "../models/photo.js";
import type { Servers } from "../servers.js";

/**
 * Photos, AI checks, votes and the recheck
 */
export class Proof {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Doer adds the before or after photo
   *
   * @remarks
   * Doer adds the before or after photo
   *
   * @returns Stored (EXIF stripped)
   *
   * @throws {@link Proof.AddPhotoError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  addPhoto(
    request: Proof.AddPhotoRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Proof.AddPhotoError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/photos"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: bountiesPhotosRequestSchema },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Proof.AddPhotoError,
      },
      options,
    );
  }

  /**
   * A neighbour confirms a large bounty on the spot
   *
   * @remarks
   * A neighbour confirms a large bounty on the spot
   *
   * @returns Confirmed
   *
   * @throws {@link Proof.NeighbourConfirmError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  neighbourConfirm(
    request: Proof.NeighbourConfirmRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Proof.NeighbourConfirmError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/confirm"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: photoSchema },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Proof.NeighbourConfirmError,
      },
      options,
    );
  }

  /**
   * A funder objects during the 24-hour window
   *
   * @remarks
   * A funder objects during the 24-hour window
   *
   * @returns Sent to vote
   *
   * @throws {@link Proof.ObjectToReleaseError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  objectToRelease(
    request: Proof.ObjectToReleaseRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Proof.ObjectToReleaseError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/object"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: bountiesObjectRequestSchema },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Proof.ObjectToReleaseError,
      },
      options,
    );
  }

  /**
   * Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an
   * objection window, ask a ne
   *
   * @remarks
   * Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an
   * objection window, ask a neighbour, or send it to the funders' vote
   *
   * @returns Decision applied
   *
   * @throws {@link Proof.SubmitProofError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  submitProof(
    request: Proof.SubmitProofRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Proof.SubmitProofError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/proof"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Proof.SubmitProofError,
      },
      options,
    );
  }

  /**
   * The still-fixed recheck; pays the held-back share if the fix held
   *
   * @remarks
   * The "still fixed?" recheck; pays the held-back share if the fix held
   *
   * @returns Recheck applied
   *
   * @throws {@link Proof.SubmitRecheckError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  submitRecheck(
    request: Proof.SubmitRecheckRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Proof.SubmitRecheckError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/recheck"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: photoSchema },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Proof.SubmitRecheckError,
      },
      options,
    );
  }

  /**
   * Funder votes; weighted by amount pledged, a tie pays the doer
   *
   * @remarks
   * Funder votes; weighted by amount pledged, a tie pays the doer
   *
   * @returns Vote recorded
   *
   * @throws {@link Proof.VoteError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  vote(
    request: Proof.VoteRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Proof.VoteError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/bounties/{id}/vote"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: bountiesVoteRequestSchema },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Proof.VoteError,
      },
      options,
    );
  }
}

export namespace Proof {
  export type AddPhotoRequest = {
    /** Bounty id */
    id: string;
    body: BountiesPhotosRequest;
  };

  export class AddPhotoError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<AddPhotoError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type NeighbourConfirmRequest = {
    /** Bounty id */
    id: string;
    body: Photo;
  };

  export class NeighbourConfirmError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<NeighbourConfirmError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type ObjectToReleaseRequest = {
    /** Bounty id */
    id: string;
    body: BountiesObjectRequest;
  };

  export class ObjectToReleaseError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ObjectToReleaseError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type SubmitProofRequest = {
    /** Bounty id */
    id: string;
  };

  export class SubmitProofError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<SubmitProofError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type SubmitRecheckRequest = {
    /** Bounty id */
    id: string;
    body: Photo;
  };

  export class SubmitRecheckError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<SubmitRecheckError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type VoteRequest = {
    /** Bounty id */
    id: string;
    body: BountiesVoteRequest;
  };

  export class VoteError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<VoteError> = [
      { on: 409, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 400, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
