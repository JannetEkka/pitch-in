import { ApiError, type Declared, type Undeclared } from "../core/api-error.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { noneAuth } from "../core/auth/schemes.js";
import type { RawClient } from "../core/raw-client.js";
import type { ErrorDecoders } from "../core/response-decoder.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { errorSchema, type Error } from "../models/error.js";
import { sessionRequestSchema, type SessionRequest } from "../models/session-request.js";
import type { Servers } from "../servers.js";

/**
 * Demo sign-in
 */
export class Session {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;

  constructor(rawClient: RawClient, servers: Servers) {
    this.#rawClient = rawClient;
    this.#servers = servers;
  }

  /**
   * Sign in as a demo neighbour
   *
   * @remarks
   * Sign in as a demo neighbour
   *
   * @returns Signed in
   *
   * @throws {@link Session.SignInError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link PitchInApiError} when no usable response was produced: a connection failure, a
   * timeout, a body that would not decode, a value that would not encode, or a credential that
   * could not be obtained
   */
  signIn(
    request: Session.SignInRequest,
    options?: RequestOptions,
  ): ApiPromise<Record<string, unknown>, Session.SignInError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        urlTemplate: this.#servers.default("/session"),
        auth: noneAuth,
        pathParams: [],
        query: [],
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: sessionRequestSchema },
      },
      {
        success: { kind: "json", schema: s.record(s.string(), s.unknown()) },
        errorFactory: Session.SignInError,
      },
      options,
    );
  }
}

export namespace Session {
  export type SignInRequest = {
    body: SessionRequest;
  };

  export class SignInError extends ApiError {
    declare readonly payload: Declared<"error", Error> | Declared<"error2", Error> | Undeclared;

    static readonly errors: ErrorDecoders<SignInError> = [
      { on: 400, kind: "error", decode: { kind: "json", schema: errorSchema } },
      { on: 409, kind: "error2", decode: { kind: "json", schema: errorSchema } },
    ];
  }
}
