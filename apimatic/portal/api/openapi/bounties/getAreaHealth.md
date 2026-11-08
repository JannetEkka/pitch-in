# Area health (measured, plus labelled sample trends) (/docs/api/openapi/bounties/getAreaHealth)

`GET /health/areas`

Area health (measured, plus labelled sample trends)

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
  /health/areas:
    get:
      summary: Area health (measured, plus labelled sample trends)
      security: []
      responses:
        "200":
          description: Areas
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Areas
        "400":
          $ref: "#/components/responses/BadRequest"
      operationId: getAreaHealth
      tags:
        - Bounties
      description: Area health (measured, plus labelled sample trends)
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.bounties.get_area_health()
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  # TODO: Handle 'e.error' of type GetAreaHealthErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.bounties.getAreaHealth();
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Bounties.GetAreaHealthError, discriminated with 'err.payload.kind'
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