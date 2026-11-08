<!-- Generated file — do not edit; regenerated with the SDK. -->

# Bounties — operations

Accessor: `client.bounties` · Source: `src/resources/bounties.ts` · 6 operations · Request and error types: namespace `Bounties`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `pitch-in-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### claimBounty

- **Signature**: `claimBounty(request: Bounties.ClaimBountyRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Bounties.ClaimBountyError>`
- **Wire**: `POST /bounties/{id}/claim`
- **Auth**: `demoUser`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Bounties.ClaimBountyError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Bounties.ClaimBountyRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

### getAreaHealth

- **Signature**: `getAreaHealth(options?: RequestOptions): ApiPromise<Record<string, unknown>, Bounties.GetAreaHealthError>`
- **Wire**: `GET /health/areas`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Bounties.GetAreaHealthError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

### getBounty

- **Signature**: `getBounty(request: Bounties.GetBountyRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Bounties.GetBountyError>`
- **Wire**: `GET /bounties/{id}`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Bounties.GetBountyError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Bounties.GetBountyRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

### listBounties

- **Signature**: `listBounties(options?: RequestOptions): ApiPromise<Bounty[], Bounties.ListBountiesError>`
- **Wire**: `GET /bounties`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Bounty[]` — a bare `application/json` array; the success type *is* the array, not a wrapper model
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Bounties.ListBountiesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `Bounty` | `bountySchema` | `src/models/bounty.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### publishBounty

- **Signature**: `publishBounty(request: Bounties.PublishBountyRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Bounties.PublishBountyError>`
- **Wire**: `POST /bounties/{id}/publish`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field. **Optional**: omit it and the request carries no body and no `Content-Type` header at all
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Bounties.PublishBountyError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Bounties.PublishBountyRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `BountiesPublishRequest` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `BountiesPublishRequest` | `bountiesPublishRequestSchema` | `src/models/bounties-publish-request.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### reportProblem

- **Signature**: `reportProblem(request: Bounties.ReportProblemRequest, options?: RequestOptions): ApiPromise<Bounty, Bounties.ReportProblemError>`
- **Wire**: `POST /reports`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Bounty`
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Bounties.ReportProblemError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Bounties.ReportProblemRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `body` | `body` | `ReportsRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ReportsRequest` | `reportsRequestSchema` | `src/models/reports-request.ts` |
| `Bounty` | `bountySchema` | `src/models/bounty.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

