# AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step (/docs/api/openapi/support/investigateCase)

`POST /cases/{id}/investigate`

AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step

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
  /cases/{id}/investigate:
    post:
      summary: AI investigates with the PayPal Agent Toolkit (read-only) and proposes
        a next step
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            description: Case id
          description: Case id
          examples:
            default:
              value: case_123456789abc
      responses:
        "200":
          description: Finding
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Finding
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: investigateCase
      tags:
        - Support
      description: AI investigates with the PayPal Agent Toolkit (read-only) and
        proposes a next step
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.support.investigate_case(
                      "case_123456789abc"
                  )
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  # TODO: Handle 'e.error' of type
                  # InvestigateCaseErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.support.investigateCase({
                  id: "case_123456789abc",
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Support.InvestigateCaseError, discriminated with 'err.payload.kind'
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