<!-- Generated file — do not edit; regenerated with the SDK. -->

# Support — operations

Accessor: `client.support` · Source: `src/resources/support.ts` · 4 operations · Request and error types: namespace `Support`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `pitch-in-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### investigateCase

- **Signature**: `investigateCase(request: Support.InvestigateCaseRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Support.InvestigateCaseError>`
- **Wire**: `POST /cases/{id}/investigate`
- **Auth**: `demoUser`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Support.InvestigateCaseError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [409] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Support.InvestigateCaseRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

### listCases

- **Signature**: `listCases(options?: RequestOptions): ApiPromise<Record<string, unknown>, Support.ListCasesError>`
- **Wire**: `GET /cases`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Support.ListCasesError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

### openCase

- **Signature**: `openCase(request: Support.OpenCaseRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Support.OpenCaseError>`
- **Wire**: `POST /cases`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Support.OpenCaseError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [409] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Support.OpenCaseRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `body` | `body` | `CasesRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `CasesRequest` | `casesRequestSchema` | `src/models/cases-request.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### reconcileWithPayPal

- **Signature**: `reconcileWithPayPal(options?: RequestOptions): ApiPromise<Record<string, unknown>, Support.ReconcileWithPayPalError>`
- **Wire**: `POST /reconcile`
- **Auth**: `demoUser`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Support.ReconcileWithPayPalError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [409] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

