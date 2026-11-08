# Open a support case (/docs/api/openapi/support/openCase)

`POST /cases`

Open a support case

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
  /cases:
    post:
      summary: Open a support case
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - kind
                - body
              properties:
                bounty_id:
                  type:
                    - string
                    - "null"
                  description: Bounty this belongs to
                kind:
                  type: string
                  description: Kind of case or photo
                body:
                  type: string
                  description: What happened, in your words
              description: Request body
      responses:
        "200":
          description: Opened
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Opened
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: openCase
      tags:
        - Support
      description: Open a support case
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.support.open_case(
                      CasesRequest(
                          kind="some example string",
                          body="some example string",
                      ),
                  )
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  ...  # TODO: Handle 'e.error' of type OpenCaseErrorBody
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.support.openCase({
                  body: {
                    kind: "some example string",
                    body: "some example string",
                  },
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Support.OpenCaseError, discriminated with 'err.payload.kind'
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