import type { AuthSchemes } from "../auth-schemes.js";
import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { noneAuth } from "../core/auth/schemes.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { casesRequestSchema, type CasesRequest } from "../models/cases-request.js";
import { errorSchema, type Error } from "../models/error.js";
import type { Servers } from "../servers.js";

/**
 * Support cases and reconciliation with PayPal
 */
export class Support {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step
   *
   * @remarks
   * AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step
   *
   * @returns Finding
   *
   * @throws {@link Support.InvestigateCaseError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  investigateCase(
    request: Support.InvestigateCaseRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Support.InvestigateCaseError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/cases/{id}/investigate"),
        auth: this.#auth.demoUser,
        pathParams: [{ name: "id", value: request.id, schema: s.string() }],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Support.InvestigateCaseError,
      },
      options,
    );
  }

  /**
   * Support cases
   *
   * @remarks
   * Support cases
   *
   * @returns Cases
   *
   * @throws {@link Support.ListCasesError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  listCases(options?: RequestOptions): ApiPromise<Record<string, unknown>, Support.ListCasesError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/cases"),
        auth: noneAuth,
        pathParams: [],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Support.ListCasesError,
      },
      options,
    );
  }

  /**
   * Open a support case
   *
   * @remarks
   * Open a support case
   *
   * @returns Opened
   *
   * @throws {@link Support.OpenCaseError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  openCase(
    request: Support.OpenCaseRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Support.OpenCaseError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/cases"),
        auth: this.#auth.demoUser,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: casesRequestSchema },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Support.OpenCaseError,
      },
      options,
    );
  }

  /**
   * Compare our records with PayPal's; open a case per mismatch
   *
   * @remarks
   * Compare our records with PayPal's; open a case per mismatch
   *
   * @returns Mismatches
   *
   * @throws {@link Support.ReconcileWithPayPalError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  reconcileWithPayPal(
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Support.ReconcileWithPayPalError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/reconcile"),
        auth: this.#auth.demoUser,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Support.ReconcileWithPayPalError,
      },
      options,
    );
  }
}

export namespace Support {
  export type InvestigateCaseRequest = {
    /** Case id */
    id: string;
  };

  export class InvestigateCaseError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<InvestigateCaseError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export class ListCasesError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ListCasesError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export type OpenCaseRequest = {
    body: CasesRequest;
  };

  export class OpenCaseError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<OpenCaseError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export class ReconcileWithPayPalError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ReconcileWithPayPalError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
