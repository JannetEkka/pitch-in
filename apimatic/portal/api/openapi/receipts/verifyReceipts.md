# Re-check the whole hash chain (/docs/api/openapi/receipts/verifyReceipts)

`GET /ledger/verify`

Re-check the whole hash chain

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
  /ledger/verify:
    get:
      summary: Re-check the whole hash chain
      security: []
      responses:
        "200":
          description: Result
          content:
            application/json:
              schema:
                type: object
                properties:
                  ok:
                    type: boolean
                    description: True if the chain is intact
                  count:
                    type: integer
                    description: Receipts checked
                  broken_at:
                    type:
                      - integer
                      - "null"
                    description: First receipt that fails, if any
                  head:
                    type: string
                    description: Hash of the latest receipt
                description: Result
        "400":
          $ref: "#/components/responses/BadRequest"
      operationId: verifyReceipts
      tags:
        - Receipts
      description: Re-check the whole hash chain
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.receipts.verify_receipts()
                  # TODO: Handle 'response' of type LedgerVerifyResponse
              except ApiError as e:
                  # TODO: Handle 'e.error' of type VerifyReceiptsErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.receipts.verifyReceipts();
                // TODO: Handle 'response' of type LedgerVerifyResponse
              } catch (err) {
                // TODO: Handle 'err' of type Receipts.VerifyReceiptsError, discriminated with 'err.payload.kind'
              }
components:
  securitySchemes:
    demoUser:
      type: apiKey
      in: header
      name: X-Pitch-In-User
      description: "Demo sign-in: the id of a sample neighbour (u_asha, u_ben, u_chen,
        u_dev, u_esi). Production would use Log in with PayPal."
  responses:
    BadRequest:
      description: Invalid input
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
  schemas:
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
info:
  title: Pitch In API
  version: 0.1.0
```