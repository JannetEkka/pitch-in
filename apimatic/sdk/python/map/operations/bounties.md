<!-- Generated file — do not edit; regenerated with the SDK. -->

# Bounties — operations

Accessor: `client.bounties` · Source: `pitch_in_api/apis/bounties.py` · 6 operations

Each `###` block is one operation and assumes `sdk-map.md` is loaded: blocks omit what its invariants table covers and are otherwise self-contained, so chunk at block level. Signatures are the sync parsed spelling; the async and raw spellings take the same parameters (see sdk-map.md). **Type sources** names the module declaring each type an operation mentions, so resolving a body, return or error payload is a lookup rather than a search; the runtime types `RawError` and `ApiResult` are excluded.

### client.bounties.claim_bounty

- **Route**: `POST /bounties/{id}/claim`
- **Auth**: `demo_user`
- **Signature**: `def claim_bounty(id_: str, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`
- **Params**: `id_` — path `id`
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, ClaimBountyErrorBody]`
- **Error**: `ClaimBountyErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `ClaimBountyErrorBody` | `pitch_in_api/errors/claim_bounty_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.bounties.get_area_health

- **Route**: `GET /health/areas`
- **Signature**: `def get_area_health(*, request_options: RequestOptionsOrDict | None = None)`
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, GetAreaHealthErrorBody]`
- **Error**: `GetAreaHealthErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `GetAreaHealthErrorBody` | `pitch_in_api/errors/get_area_health_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.bounties.get_bounty

- **Route**: `GET /bounties/{id}`
- **Signature**: `def get_bounty(id_: str, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`
- **Params**: `id_` — path `id`
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, GetBountyErrorBody]`
- **Error**: `GetBountyErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `GetBountyErrorBody` | `pitch_in_api/errors/get_bounty_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.bounties.list_bounties

- **Route**: `GET /bounties`
- **Signature**: `def list_bounties(*, request_options: RequestOptionsOrDict | None = None)`
- **Returns (parsed)**: `list[Bounty]`
- **Returns (raw)**: `ApiResult[list[Bounty], ListBountiesErrorBody]`
- **Error**: `ListBountiesErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `Bounty` | `pitch_in_api/models/bounty.py` |
| `ListBountiesErrorBody` | `pitch_in_api/errors/list_bounties_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.bounties.publish_bounty

- **Route**: `POST /bounties/{id}/publish`
- **Auth**: `demo_user`
- **Signature**: `def publish_bounty(id_: str, *, body: BountiesPublishRequest | BountiesPublishRequestDict | None = None, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`
- **Params**: `id_` — path `id` · `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, PublishBountyErrorBody]`
- **Error**: `PublishBountyErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `BountiesPublishRequest` | `pitch_in_api/models/bounties_publish_request.py` |
| `BountiesPublishRequestDict` | `pitch_in_api/models/bounties_publish_request.py` |
| `PublishBountyErrorBody` | `pitch_in_api/errors/publish_bounty_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.bounties.report_problem

- **Route**: `POST /reports`
- **Auth**: `demo_user`
- **Signature**: `def report_problem(body: ReportsRequest | ReportsRequestDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `body`
- **Params**: `body` — JSON body
- **Returns (parsed)**: `Bounty`
- **Returns (raw)**: `ApiResult[Bounty, ReportProblemErrorBody]`
- **Error**: `ReportProblemErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `ReportsRequest` | `pitch_in_api/models/reports_request.py` |
| `ReportsRequestDict` | `pitch_in_api/models/reports_request.py` |
| `Bounty` | `pitch_in_api/models/bounty.py` |
| `ReportProblemErrorBody` | `pitch_in_api/errors/report_problem_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

