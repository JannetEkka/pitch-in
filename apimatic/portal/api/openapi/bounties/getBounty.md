# A bounty with its pledges, payouts, photos, AI checks and receipts (/docs/api/openapi/bounties/getBounty)

`GET /bounties/{id}`

A bounty with its pledges, payouts, photos, AI checks and receipts

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
  /bounties/{id}:
    get:
      summary: A bounty with its pledges, payouts, photos, AI checks and receipts
      security: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            description: Bounty id
          description: Bounty id
          examples:
            default:
              value: b_canal
      responses:
        "200":
          description: Bounty detail
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Bounty detail
        "400":
          $ref: "#/components/responses/BadRequest"
      operationId: getBounty
      tags:
        - Bounties
      description: A bounty with its pledges, payouts, photos, AI checks and receipts
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.bounties.get_bounty("b_canal")
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  ...  # TODO: Handle 'e.error' of type GetBountyErrorBody
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.bounties.getBounty({
                  id: "b_canal",
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Bounties.GetBountyError, discriminated with 'err.payload.kind'
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