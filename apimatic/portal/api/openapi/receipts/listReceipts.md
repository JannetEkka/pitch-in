# Every receipt, hash-chained (/docs/api/openapi/receipts/listReceipts)

`GET /ledger`

Every receipt, hash-chained

```yaml
openapi: 3.2.0
servers:
  - url: https://pitch-in.onrender.com/api
    description: Hosted demo (sandbox)
  - url: http://localhost:8080/api
    description: Local
security:
  - demoUser: []
paths:
  /ledger:
    get:
      summary: Every receipt, hash-chained
      security: []
      responses:
        "200":
          description: Receipts
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/LedgerEntry"
                description: Receipts
        "400":
          $ref: "#/components/responses/BadRequest"
      operationId: listReceipts
      tags:
        - Receipts
      description: Every receipt, hash-chained
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.receipts.list_receipts()
                  # TODO: Handle 'response' of type list[LedgerEntry]
              except ApiError as e:
                  # TODO: Handle 'e.error' of type ListReceiptsErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.receipts.listReceipts();
                // TODO: Handle 'response' of type LedgerEntry[]
              } catch (err) {
                // TODO: Handle 'err' of type Receipts.ListReceiptsError, discriminated with 'err.payload.kind'
              }
components:
  securitySchemes:
    demoUser:
      type: apiKey
      in: header
      name: X-Pitch-In-User
      description: "Demo sign-in: the id of a sample neighbour (u_asha, u_ben, u_chen,
        u_dev, u_esi). Production would use Log in with PayPal."
  schemas:
    LedgerEntry:
      type: object
      properties:
        seq:
          type: integer
          description: Position in the receipt chain
        at:
          type: string
          format: date-time
          description: When it happened
        bounty_id:
          type:
            - string
            - "null"
          description: Bounty this belongs to
        event:
          type: string
          description: What happened
        data:
          type: object
          additionalProperties: true
          description: Details of the event
        prev_hash:
          type: string
          description: Hash of the previous receipt
        hash:
          type: string
          description: SHA-256 over this receipt and the previous hash
      description: One receipt in the hash-chained log
    Error:
      type: object
      properties:
        error:
          type: string
          description: What went wrong
        reasons:
          type: array
          items:
            type: string
            description: Entry
          description: Each rule that refused the request
      description: Error returned when a request is refused or invalid
  responses:
    BadRequest:
      description: Invalid input
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
info:
  title: Pitch In API
  version: 0.1.0
```