<!-- Generated file — do not edit; regenerated with the SDK. -->

# Pledges — operations

Accessor: `client.pledges` · Source: `src/resources/pledges.ts` · 2 operations · Request and error types: namespace `Pledges`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `pitch-in-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### confirmPledge

- **Signature**: `confirmPledge(request: Pledges.ConfirmPledgeRequest, options?: RequestOptions): ApiPromise<Pledge, Pledges.ConfirmPledgeError>`
- **Wire**: `POST /pledges/{id}/confirm`
- **Auth**: `demoUser`
- **Request body**: none — no `Content-Type` header is sent
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Pledge`
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Pledges.ConfirmPledgeError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Pledges.ConfirmPledgeRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `Pledge` | `pledgeSchema` | `src/models/pledge.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### startPledge

- **Signature**: `startPledge(request: Pledges.StartPledgeRequest, options?: RequestOptions): ApiPromise<BountiesPledgesResponse, Pledges.StartPledgeError>`
- **Wire**: `POST /bounties/{id}/pledges`
- **Auth**: `demoUser`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `BountiesPledgesResponse`
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Pledges.StartPledgeError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [409] `Error` · `"error2"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Pledges.StartPledgeRequest` (2):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `id` | `path` | `string` | yes |
| `body` | `body` | `BountiesPledgesRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `BountiesPledgesRequest` | `bountiesPledgesRequestSchema` | `src/models/bounties-pledges-request.ts` |
| `BountiesPledgesResponse` | `bountiesPledgesResponseSchema` | `src/models/bounties-pledges-response.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

