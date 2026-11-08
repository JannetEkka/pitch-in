<!-- Generated file — do not edit; regenerated with the SDK. -->

# Session — operations

Accessor: `client.session` · Source: `pitch_in_api/apis/session.py` · 1 operation

Each `###` block is one operation and assumes `sdk-map.md` is loaded: blocks omit what its invariants table covers and are otherwise self-contained, so chunk at block level. Signatures are the sync parsed spelling; the async and raw spellings take the same parameters (see sdk-map.md). **Type sources** names the module declaring each type an operation mentions, so resolving a body, return or error payload is a lookup rather than a search; the runtime types `RawError` and `ApiResult` are excluded.

### client.session.sign_in

- **Route**: `POST /session`
- **Signature**: `def sign_in(body: SessionRequest | SessionRequestDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `body`
- **Params**: `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, SignInErrorBody]`
- **Error**: `SignInErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `SessionRequest` | `pitch_in_api/models/session_request.py` |
| `SessionRequestDict` | `pitch_in_api/models/session_request.py` |
| `SignInErrorBody` | `pitch_in_api/errors/sign_in_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

