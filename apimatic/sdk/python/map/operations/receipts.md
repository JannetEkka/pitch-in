<!-- Generated file — do not edit; regenerated with the SDK. -->

# Receipts — operations

Accessor: `client.receipts` · Source: `pitch_in_api/apis/receipts.py` · 2 operations

Each `###` block is one operation and assumes `sdk-map.md` is loaded: blocks omit what its invariants table covers and are otherwise self-contained, so chunk at block level. Signatures are the sync parsed spelling; the async and raw spellings take the same parameters (see sdk-map.md). **Type sources** names the module declaring each type an operation mentions, so resolving a body, return or error payload is a lookup rather than a search; the runtime types `RawError` and `ApiResult` are excluded.

### client.receipts.list_receipts

- **Route**: `GET /ledger`
- **Signature**: `def list_receipts(*, request_options: RequestOptionsOrDict | None = None)`
- **Returns (parsed)**: `list[LedgerEntry]`
- **Returns (raw)**: `ApiResult[list[LedgerEntry], ListReceiptsErrorBody]`
- **Error**: `ListReceiptsErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `LedgerEntry` | `pitch_in_api/models/ledger_entry.py` |
| `ListReceiptsErrorBody` | `pitch_in_api/errors/list_receipts_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

### client.receipts.verify_receipts

- **Route**: `GET /ledger/verify`
- **Signature**: `def verify_receipts(*, request_options: RequestOptionsOrDict | None = None)`
- **Returns (parsed)**: `LedgerVerifyResponse`
- **Returns (raw)**: `ApiResult[LedgerVerifyResponse, VerifyReceiptsErrorBody]`
- **Error**: `VerifyReceiptsErrorBody` — **Case A (typed)**
- **Error arms**: `Error` [400] · `RawError` [anything unmapped]

| Type | Source |
| --- | --- |
| `LedgerVerifyResponse` | `pitch_in_api/models/ledger_verify_response.py` |
| `VerifyReceiptsErrorBody` | `pitch_in_api/errors/verify_receipts_error.py` |
| `Error` | `pitch_in_api/models/error.py` |

