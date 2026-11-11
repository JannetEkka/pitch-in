# Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve (/docs/api/openapi/pledges/startPledge)

`POST /bounties/{id}/pledges`

Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve

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
  /bounties/{id}/pledges:
    post:
      summary: Start a pledge; creates a PayPal order with intent AUTHORIZE for the
        buyer to approve
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
                - amount_cents
              properties:
                amount_cents:
                  type: integer
                  description: Amount in US cents
                  examples:
                    - 1500
                renew_of:
                  type: string
                  description: Pledge this one replaces
              description: Request body
      responses:
        "200":
          description: Order created
          content:
            application/json:
              schema:
                type: object
                properties:
                  pledge_id:
                    type: string
                    description: Pitch In pledge id
                  order_id:
                    type: string
                    description: PayPal order id
                description: Order created
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: startPledge
      tags:
        - Pledges
      description: Start a pledge; creates a PayPal order with intent AUTHORIZE for
        the buyer to approve
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.pledges.start_pledge(
                      "b_canal", BountiesPledgesRequest(amount_cents=1)
                  )
                  # TODO: Handle 'response' of type
                  # BountiesPledgesResponse
              except ApiError as e:
                  # TODO: Handle 'e.error' of type StartPledgeErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.pledges.startPledge({
                  id: "b_canal",
                  body: { amountCents: 1 },
                });
                // TODO: Handle 'response' of type BountiesPledgesResponse
              } catch (err) {
                // TODO: Handle 'err' of type Pledges.StartPledgeError, discriminated with 'err.payload.kind'
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