<!-- Generated file — do not edit; regenerated with the SDK. -->

# Session — operations

Accessor: `client.session` · Source: `src/resources/session.ts` · 1 operation · Request and error types: namespace `Session`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `pitch-in-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### signIn

- **Signature**: `signIn(request: Session.SignInRequest, options?: RequestOptions): ApiPromise<Record<string, unknown>, Session.SignInError>`
- **Wire**: `POST /session`
- **Auth**: none — public; no credential is sent
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `Record<string, unknown>` — a bare `application/json` map; the success type *is* the map
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Session.SignInError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"error2"` [409] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Session.SignInRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `body` | `body` | `SessionRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SessionRequest` | `sessionRequestSchema` | `src/models/session-request.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

