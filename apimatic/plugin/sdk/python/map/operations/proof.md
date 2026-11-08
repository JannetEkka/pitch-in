<!-- Generated file — do not edit; regenerated with the SDK. -->

# Proof — operations

Accessor: `client.proof` · Source: `pitch_in_api/apis/proof.py` · 6 operations

Each `###` block is one operation and assumes `sdk-map.md` is loaded: blocks omit what its invariants table covers and are otherwise self-contained, so chunk at block level. Signatures are the sync parsed spelling; the async and raw spellings take the same parameters (see sdk-map.md). **Type sources** names the module declaring each type an operation mentions, so resolving a body, return or error payload is a lookup rather than a search; the runtime types `RawError` and `ApiResult` are excluded.

### client.proof.add_photo

- **Route**: `POST /bounties/{id}/photos`
- **Auth**: `demo_user`
- **Signature**: `def add_photo(id_: str, body: BountiesPhotosRequest | BountiesPhotosRequestDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`, `body`
- **Params**: `id_` — path `id` · `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, AddPhotoErrorBody]`
- **Error**: `AddPhotoErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `BountiesPhotosRequest` | `pitch_in_api/models/bounties_photos_request.py` |
| `BountiesPhotosRequestDict` | `pitch_in_api/models/bounties_photos_request.py` |
| `AddPhotoErrorBody` | `pitch_in_api/errors/add_photo_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.proof.neighbour_confirm

- **Route**: `POST /bounties/{id}/confirm`
- **Auth**: `demo_user`
- **Signature**: `def neighbour_confirm(id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`, `body`
- **Params**: `id_` — path `id` · `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, NeighbourConfirmErrorBody]`
- **Error**: `NeighbourConfirmErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `Photo` | `pitch_in_api/models/photo.py` |
| `PhotoDict` | `pitch_in_api/models/photo.py` |
| `NeighbourConfirmErrorBody` | `pitch_in_api/errors/neighbour_confirm_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.proof.object_to_release

- **Route**: `POST /bounties/{id}/object`
- **Auth**: `demo_user`
- **Signature**: `def object_to_release(id_: str, body: BountiesObjectRequest | BountiesObjectRequestDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`, `body`
- **Params**: `id_` — path `id` · `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, ObjectToReleaseErrorBody]`
- **Error**: `ObjectToReleaseErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `BountiesObjectRequest` | `pitch_in_api/models/bounties_object_request.py` |
| `BountiesObjectRequestDict` | `pitch_in_api/models/bounties_object_request.py` |
| `ObjectToReleaseErrorBody` | `pitch_in_api/errors/object_to_release_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.proof.submit_proof

- **Route**: `POST /bounties/{id}/proof`
- **Auth**: `demo_user`
- **Signature**: `def submit_proof(id_: str, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`
- **Params**: `id_` — path `id`
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, SubmitProofErrorBody]`
- **Error**: `SubmitProofErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `SubmitProofErrorBody` | `pitch_in_api/errors/submit_proof_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.proof.submit_recheck

- **Route**: `POST /bounties/{id}/recheck`
- **Auth**: `demo_user`
- **Signature**: `def submit_recheck(id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`, `body`
- **Params**: `id_` — path `id` · `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, SubmitRecheckErrorBody]`
- **Error**: `SubmitRecheckErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `Photo` | `pitch_in_api/models/photo.py` |
| `PhotoDict` | `pitch_in_api/models/photo.py` |
| `SubmitRecheckErrorBody` | `pitch_in_api/errors/submit_recheck_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.proof.vote

- **Route**: `POST /bounties/{id}/vote`
- **Auth**: `demo_user`
- **Signature**: `def vote(id_: str, body: BountiesVoteRequest | BountiesVoteRequestDict, *, request_options: RequestOptionsOrDict | None = None)`
  - required, positional: `id_`, `body`
- **Params**: `id_` — path `id` · `body` — JSON body
- **Returns (parsed)**: `Any`
- **Returns (raw)**: `ApiResult[Any, VoteErrorBody]`
- **Error**: `VoteErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400, 409] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `BountiesVoteRequest` | `pitch_in_api/models/bounties_vote_request.py` |
| `BountiesVoteRequestDict` | `pitch_in_api/models/bounties_vote_request.py` |
| `VoteErrorBody` | `pitch_in_api/errors/vote_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

