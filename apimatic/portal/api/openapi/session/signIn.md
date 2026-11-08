# Sign in as a demo neighbour (/docs/api/openapi/session/signIn)

`POST /session`

Sign in as a demo neighbour

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
  /session:
    post:
      summary: Sign in as a demo neighbour
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - user_id
              properties:
                user_id:
                  type: string
                  description: Id of a sample neighbour
                  examples:
                    - u_ben
              description: Request body
      responses:
        "200":
          description: Signed in
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Signed in
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: signIn
      tags:
        - Session
      description: Sign in as a demo neighbour
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.session.sign_in(
                      SessionRequest(user_id="some example string")
                  )
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  ...  # TODO: Handle 'e.error' of type SignInErrorBody
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.session.signIn({
                  body: { userId: "some example string" },
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Session.SignInError, discriminated with 'err.payload.kind'
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