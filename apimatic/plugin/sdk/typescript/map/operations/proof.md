<!-- Generated file — do not edit; regenerated with the SDK. -->

# Proof — operations

Accessor: `client.proof` · Source: `src/resources/proof.ts` · 6 operations · Request and error types: namespace `Proof`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `pitch-in-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### addPhoto

- **Signature**: `addPhoto(request: Proof.AddPhotoRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Proof.AddPhotoError>`
- **Wire**: `POST /bounties/{id}/photos`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Proof.AddPhotoError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Proof.AddPhotoRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `BountiesPhotosRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `BountiesPhotosRequest` | `bountiesPhotosRequestSchema` | `src/models/bounties-photos-request.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### neighbourConfirm

- **Signature**: `neighbourConfirm(request: Proof.NeighbourConfirmRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Proof.NeighbourConfirmError>`
- **Wire**: `POST /bounties/{id}/confirm`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Proof.NeighbourConfirmError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Proof.NeighbourConfirmRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `Photo` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Photo` | `photoSchema` | `src/models/photo.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### objectToRelease

- **Signature**: `objectToRelease(request: Proof.ObjectToReleaseRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Proof.ObjectToReleaseError>`
- **Wire**: `POST /bounties/{id}/object`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Proof.ObjectToReleaseError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Proof.ObjectToReleaseRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `BountiesObjectRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `BountiesObjectRequest` | `bountiesObjectRequestSchema` | `src/models/bounties-object-request.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### submitProof

- **Signature**: `submitProof(request: Proof.SubmitProofRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Proof.SubmitProofError>`
- **Wire**: `POST /bounties/{id}/proof`
- **Auth**: `demoUser`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Proof.SubmitProofError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Proof.SubmitProofRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Error` | `errorSchema` | `src/models/error.ts` |

### submitRecheck

- **Signature**: `submitRecheck(request: Proof.SubmitRecheckRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Proof.SubmitRecheckError>`
- **Wire**: `POST /bounties/{id}/recheck`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Proof.SubmitRecheckError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Proof.SubmitRecheckRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `Photo` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Photo` | `photoSchema` | `src/models/photo.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### vote

- **Signature**: `vote(request: Proof.VoteRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Proof.VoteError>`
- **Wire**: `POST /bounties/{id}/vote`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Proof.VoteError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Proof.VoteRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `BountiesVoteRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `BountiesVoteRequest` | `bountiesVoteRequestSchema` | `src/models/bounties-vote-request.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

