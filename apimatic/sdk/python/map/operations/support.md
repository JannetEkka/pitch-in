<!-- Generated file — do not edit; regenerated with the SDK. -->

# Support — operations

Accessor: `client.support` · Source: `pitch_in_api/apis/support.py` · 4 operations

Each `###` block is one operation and assumes `sdk-map.md` is loaded: blocks omit what its invariants table covers and are otherwise self-contained, so chunk at block level. Signatures are the sync parsed spelling; the async and raw spellings take the same parameters (see sdk-map.md). **Type sources** names the module declaring each type an operation mentions, so resolving a body, return or error payload is a lookup rather than a search; the runtime types `RawError` and `ApiResult` are excluded.

### client.support.investigate_case

- **Route**: `POST /cases/{id}/investigate`
- **Auth**: `demo_user`
- **Signature**: `def investigate_case(id_: str, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`
- **Params**: `id_` — path `id`
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, InvestigateCaseErrorBody]`
- **Error**: `InvestigateCaseErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `InvestigateCaseErrorBody` | `pitch_in_api/errors/investigate_case_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.support.list_cases

- **Route**: `GET /cases`
- **Signature**: `def list_cases(*, request_options: RequestOptionsOrDict | None = None)`
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, ListCasesErrorBody]`
- **Error**: `ListCasesErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `ListCasesErrorBody` | `pitch_in_api/errors/list_cases_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.support.open_case

- **Route**: `POST /cases`
- **Auth**: `demo_user`
- **Signature**: `def open_case(body: CasesRequest | CasesRequestDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `body`
- **Params**: `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, OpenCaseErrorBody]`
- **Error**: `OpenCaseErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `CasesRequest` | `pitch_in_api/models/cases_request.py` |
| `CasesRequestDict` | `pitch_in_api/models/cases_request.py` |
| `OpenCaseErrorBody` | `pitch_in_api/errors/open_case_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.support.reconcile_with_pay_pal

- **Route**: `POST /reconcile`
- **Auth**: `demo_user`
- **Signature**: `def reconcile_with_pay_pal(*, request_options: RequestOptionsOrDict | None = None)`
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, ReconcileWithPayPalErrorBody]`
- **Error**: `ReconcileWithPayPalErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `ReconcileWithPayPalErrorBody` | `pitch_in_api/errors/reconcile_with_pay_pal_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

