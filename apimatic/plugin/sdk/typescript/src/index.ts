export { PitchInApiClient } from "./client.js";
export type { ClientOptions } from "./client-options.js";

export type { TokenProvider } from "./core/auth/credentials.js";

export { ServerEnvironment } from "./servers.js";

export { Bounties } from "./resources/bounties.js";
export { Pledges } from "./resources/pledges.js";
export { Proof } from "./resources/proof.js";
export { Receipts } from "./resources/receipts.js";
export { Support } from "./resources/support.js";
export { Session } from "./resources/session.js";

export { bountiesObjectRequestSchema, type BountiesObjectRequest } from "./models/bounties-object-request.js";
export { bountiesPhotosRequestSchema, type BountiesPhotosRequest } from "./models/bounties-photos-request.js";
export {
  bountiesPledgesRequestSchema,
  type BountiesPledgesRequest,
} from "./models/bounties-pledges-request.js";
export {
  bountiesPledgesResponseSchema,
  type BountiesPledgesResponse,
} from "./models/bounties-pledges-response.js";
export {
  bountiesPublishRequestSchema,
  type BountiesPublishRequest,
} from "./models/bounties-publish-request.js";
export { bountiesVoteRequestSchema, type BountiesVoteRequest } from "./models/bounties-vote-request.js";
export { bountySchema, type Bounty } from "./models/bounty.js";
export { casesRequestSchema, type CasesRequest } from "./models/cases-request.js";
export { checklistItemSchema, type ChecklistItem } from "./models/checklist-item.js";
export { Choice, choiceSchema } from "./models/choice.js";
export { errorSchema, type Error } from "./models/error.js";
export { errorErrorSchema, type ErrorError } from "./models/error-error.js";
export { JobType, jobTypeSchema } from "./models/job-type.js";
export { Kind, kindSchema } from "./models/kind.js";
export { ledgerVerifyResponseSchema, type LedgerVerifyResponse } from "./models/ledger-verify-response.js";
export { ledgerEntrySchema, type LedgerEntry } from "./models/ledger-entry.js";
export { photoSchema, type Photo } from "./models/photo.js";
export { pledgeSchema, type Pledge } from "./models/pledge.js";
export { reportsRequestSchema, type ReportsRequest } from "./models/reports-request.js";
export { sessionRequestSchema, type SessionRequest } from "./models/session-request.js";
export { Skill, skillSchema } from "./models/skill.js";
export { Status, statusSchema } from "./models/status.js";
export { Status1, status1Schema } from "./models/status1.js";

export {
  CoreError as PitchInApiError,
  ResponseError,
  DecodeError,
  EncodeError,
  ConnectionError,
  TimeoutError,
  AuthError,
  PaginationError,
  ConfigurationError,
} from "./core/errors.js";
export { ApiError } from "./core/api-error.js";
export { SchemaError } from "./core/validation/schema-error.js";
export {
  defaultLoggingOptions,
  type LoggingOptions,
  type RequestLoggingOptions,
  type Logger,
  type LogDetails,
  type HttpRequestDetails,
  type RequestHeadersDetails,
  type RequestBodyDetails,
  type HttpResponseDetails,
  type ResponseHeadersDetails,
  type HttpRetryingDetails,
  type HttpFailedDetails,
  type LogLevel,
} from "./core/logging.js";
export type { ApiPromise, ApiResult } from "./core/api-promise.js";
export type { Pageable, PageableApiResult } from "./core/pagination/pageable.js";
export type { HttpMethod, RequestOptions } from "./core/api-request.js";
export type { RetryOptions, RequestRetryOptions, RetryAttempt, RetryReason } from "./core/retry.js";
export type { BinaryContent, BinaryData, BinaryErrorContent, FileData, FileInput } from "./core/binary.js";
export type { ErrorKind } from "./core/errors.js";
export type { Declared, Undeclared } from "./core/api-error.js";
export type { Schema, EnumSchema, Encoded } from "./core/validation/schema.js";
