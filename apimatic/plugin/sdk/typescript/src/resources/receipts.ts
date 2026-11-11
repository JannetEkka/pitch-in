import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { noneAuth } from "../core/auth/schemes.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import * as s from "../core/validation/index.js";
import { errorSchema, type Error } from "../models/error.js";
import { ledgerEntrySchema, type LedgerEntry } from "../models/ledger-entry.js";
import { ledgerVerifyResponseSchema, type LedgerVerifyResponse } from "../models/ledger-verify-response.js";
import type { Servers } from "../servers.js";

/**
 * The hash-chained receipt log
 */
export class Receipts {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;

  constructor(rawClient: RawClient, servers: Servers) {
    this.#rawClient = rawClient;
    this.#servers = servers;
  }

  /**
   * Every receipt, hash-chained
   *
   * @remarks
   * Every receipt, hash-chained
   *
   * @returns Receipts
   *
   * @throws {@link Receipts.ListReceiptsError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  listReceipts(options?: RequestOptions): ApiPromise<LedgerEntry[], Receipts.ListReceiptsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/ledger"),
        auth: noneAuth,
        pathParams: [],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: s.array(s.lazy(() => ledgerEntrySchema)) },
        errorFactory: Receipts.ListReceiptsError,
      },
      options,
    );
  }

  /**
   * Re-check the whole hash chain
   *
   * @remarks
   * Re-check the whole hash chain
   *
   * @returns Result
   *
   * @throws {@link Receipts.VerifyReceiptsError} when the API answers with an error status — narrow
   * on `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  verifyReceipts(options?: RequestOptions): ApiPromise<LedgerVerifyResponse, Receipts.VerifyReceiptsError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        urlTemplate: this.#servers.default("/ledger/verify"),
        auth: noneAuth,
        pathParams: [],
        query: [],
        headers: [],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: ledgerVerifyResponseSchema },
        errorFactory: Receipts.VerifyReceiptsError,
      },
      options,
    );
  }
}

export namespace Receipts {
  export class ListReceiptsError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Undeclared;

    static readonly errors: ErrorDecoders<ListReceiptsError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
    ];
  }

  export class VerifyReceiptsError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Undeclared;

    static readonly errors: ErrorDecoders<VerifyReceiptsError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
