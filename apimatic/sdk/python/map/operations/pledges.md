<!-- Generated file — do not edit; regenerated with the SDK. -->

# Pledges — operations

Accessor: `client.pledges` · Source: `pitch_in_api/apis/pledges.py` · 2 operations

Each `###` block is one operation and assumes `sdk-map.md` is loaded: blocks omit what its invariants table covers and are otherwise self-contained, so chunk at block level. Signatures are the sync parsed spelling; the async and raw spellings take the same parameters (see sdk-map.md). **Type sources** names the module declaring each type an operation mentions, so resolving a body, return or error payload is a lookup rather than a search; the runtime types `RawError` and `ApiResult` are excluded.

### client.pledges.confirm_pledge

- **Route**: `POST /pledges/{id}/confirm`
- **Auth**: `demo_user`
- **Signature**: `def confirm_pledge(id_: str, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`
- **Params**: `id_` — path `id`
- **Returns (parsed)**: `Pledge`
- **Returns (raw)**: `ApiResult[Pledge, ConfirmPledgeErrorBody]`
- **Error**: `ConfirmPledgeErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `Pledge` | `pitch_in_api/models/pledge.py` |
| `ConfirmPledgeErrorBody` | `pitch_in_api/errors/confirm_pledge_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.pledges.start_pledge

- **Route**: `POST /bounties/{id}/pledges`
- **Auth**: `demo_user`
- **Signature**: `def start_pledge(id_: str, body: BountiesPledgesRequest | BountiesPledgesRequestDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`, `body`
- **Params**: `id_` — path `id` · `body` — JSON body
- **Returns (parsed)**: `BountiesPledgesResponse`
- **Returns (raw)**: `ApiResult[BountiesPledgesResponse, StartPledgeErrorBody]`
- **Error**: `StartPledgeErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `BountiesPledgesRequest` | `pitch_in_api/models/bounties_pledges_request.py` |
| `BountiesPledgesRequestDict` | `pitch_in_api/models/bounties_pledges_request.py` |
| `BountiesPledgesResponse` | `pitch_in_api/models/bounties_pledges_response.py` |
| `StartPledgeErrorBody` | `pitch_in_api/errors/start_pledge_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

