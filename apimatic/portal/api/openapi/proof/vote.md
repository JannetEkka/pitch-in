# Funder votes; weighted by amount pledged, a tie pays the doer (/docs/api/openapi/proof/vote)

`POST /bounties/{id}/vote`

Funder votes; weighted by amount pledged, a tie pays the doer

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
  /bounties/{id}/vote:
    post:
      summary: Funder votes; weighted by amount pledged, a tie pays the doer
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - choice
              properties:
                choice:
                  type: string
                  enum:
                    - pay
                    - refund
                  description: pay or refund
                  examples:
                    - pay
              description: Request body
      responses:
        "200":
          description: Vote recorded
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Vote recorded
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: vote
      tags:
        - Proof
      description: Funder votes; weighted by amount pledged, a tie pays the doer
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.proof.vote(
                      "b_canal", BountiesVoteRequest(choice=Choice.PAY)
                  )
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  ...  # TODO: Handle 'e.error' of type VoteErrorBody
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.proof.vote({
                  id: "b_canal",
                  body: { choice: Choice.Pay },
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Proof.VoteError, discriminated with 'err.payload.kind'
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