<!-- Generated file — do not edit; regenerated with the SDK. -->

# Receipts — operations

Accessor: `client.receipts` · Source: `src/resources/receipts.ts` · 2 operations · Request and error types: namespace `Receipts`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `pitch-in-api`; the `Source` path is where to **read** the shape, never what to import. `ApiError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### listReceipts

- **Signature**: `listReceipts(options?: RequestOptions): ApiPromise<LedgerEntry[], Receipts.ListReceiptsError>`
- **Wire**: `GET /ledger`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `LedgerEntry[]` — a bare `application/json` array; the success type *is* the array, not a wrapper model
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Receipts.ListReceiptsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `LedgerEntry` | `ledgerEntrySchema` | `src/models/ledger-entry.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

### verifyReceipts

- **Signature**: `verifyReceipts(options?: RequestOptions): ApiPromise<LedgerVerifyResponse, Receipts.VerifyReceiptsError>`
- **Wire**: `GET /ledger/verify`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `LedgerVerifyResponse`
- **Error**: `PitchInApiError` with `kind: "api"`, an instance of `Receipts.VerifyReceiptsError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error"` [400] `Error` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `LedgerVerifyResponse` | `ledgerVerifyResponseSchema` | `src/models/ledger-verify-response.ts` |
| `Error` | `errorSchema` | `src/models/error.ts` |

