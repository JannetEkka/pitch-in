# Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection window, ask a ne (/docs/api/openapi/proof/submitProof)

`POST /bounties/{id}/proof`

Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection window, ask a neighbour, or send it to the funders' vote

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
  /bounties/{id}/proof:
    post:
      summary: Submit proof; AI check plus fraud checks, then the rules capture
        pledges and pay out, open an objection window, ask a ne
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
          description: Decision applied
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Decision applied
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: submitProof
      tags:
        - Proof
      description: Submit proof; AI check plus fraud checks, then the rules capture
        pledges and pay out, open an objection window, ask a neighbour, or send
        it to the funders' vote
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.proof.submit_proof("b_canal")
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  # TODO: Handle 'e.error' of type SubmitProofErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.proof.submitProof({
                  id: "b_canal",
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Proof.SubmitProofError, discriminated with 'err.payload.kind'
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