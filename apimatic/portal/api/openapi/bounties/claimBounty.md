# Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left) (/docs/api/openapi/bounties/claimBounty)

`POST /bounties/{id}/claim`

Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)

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
  /bounties/{id}/claim:
    post:
      summary: Claim a funded bounty (not the reporter or a funder; holds must have
        10+ days left)
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
          description: Claimed
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Claimed
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: claimBounty
      tags:
        - Bounties
      description: Claim a funded bounty (not the reporter or a funder; holds must
        have 10+ days left)
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.bounties.claim_bounty("b_canal")
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  # TODO: Handle 'e.error' of type ClaimBountyErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.bounties.claimBounty({
                  id: "b_canal",
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Bounties.ClaimBountyError, discriminated with 'err.payload.kind'
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
    Refused:
      description: Refused by a rule; reasons say which
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