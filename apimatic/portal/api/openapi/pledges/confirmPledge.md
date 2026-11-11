# After PayPal approval, authorize the order (money held, not charged) (/docs/api/openapi/pledges/confirmPledge)

`POST /pledges/{id}/confirm`

After PayPal approval, authorize the order (money held, not charged)

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
  /pledges/{id}/confirm:
    post:
      summary: After PayPal approval, authorize the order (money held, not charged)
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            description: Pledge id
          description: Pledge id
          examples:
            default:
              value: pl_123456789abc
      responses:
        "200":
          description: Authorized
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Pledge"
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: confirmPledge
      tags:
        - Pledges
      description: After PayPal approval, authorize the order (money held, not charged)
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.pledges.confirm_pledge(
                      "pl_123456789abc"
                  )
                  # TODO: Handle 'response' of type Pledge
              except ApiError as e:
                  # TODO: Handle 'e.error' of type ConfirmPledgeErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.pledges.confirmPledge({
                  id: "pl_123456789abc",
                });
                // TODO: Handle 'response' of type Pledge
              } catch (err) {
                // TODO: Handle 'err' of type Pledges.ConfirmPledgeError, discriminated with 'err.payload.kind'
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
    Pledge:
      type: object
      properties:
        id:
          type: string
          description: Unique id
          examples:
            - b_canal
        bounty_id:
          type: string
          description: Bounty this belongs to
        funder_id:
          type: string
          description: Neighbour who pledged
        amount_cents:
          type: integer
          description: Amount in US cents
          examples:
            - 1500
        order_id:
          type: string
          description: PayPal order id (intent AUTHORIZE)
        authorization_id:
          type:
            - string
            - "null"
          description: PayPal authorization id
        auth_expires_at:
          type:
            - string
            - "null"
          format: date-time
          description: When the PayPal hold expires
        status:
          type: string
          enum:
            - created
            - authorized
            - captured
            - voided
            - refunded
            - expired
          description: Where the bounty or pledge is in its lifecycle
        captured_cents:
          type: integer
          description: Amount PayPal captured, in cents
        capture_id:
          type:
            - string
            - "null"
          description: PayPal capture id
      description: A funder's PayPal hold toward a bounty
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
    Refused:
      description: Refused by a rule; reasons say which
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
info:
  title: Pitch In API
  version: 0.1.0
```