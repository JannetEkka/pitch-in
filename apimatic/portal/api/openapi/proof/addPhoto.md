# Doer adds the before or after photo (/docs/api/openapi/proof/addPhoto)

`POST /bounties/{id}/photos`

Doer adds the before or after photo

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
  /bounties/{id}/photos:
    post:
      summary: Doer adds the before or after photo
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
              allOf:
                - $ref: "#/components/schemas/Photo"
                - type: object
                  required:
                    - kind
                  properties:
                    kind:
                      type: string
                      enum:
                        - before
                        - after
                      description: Kind of case or photo
              description: Request body
      responses:
        "200":
          description: Stored (EXIF stripped)
          content:
            application/json:
              schema:
                type: object
                additionalProperties: true
                description: Stored (EXIF stripped)
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: addPhoto
      tags:
        - Proof
      description: Doer adds the before or after photo
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.proof.add_photo(
                      "b_canal",
                      BountiesPhotosRequest(
                          image="some example string",
                          lat=1.5,
                          lng=1.5,
                          accuracy=1.5,
                          live_capture=True,
                          kind=Kind.BEFORE,
                      ),
                  )
                  # TODO: Handle 'response' of type Any
              except ApiError as e:
                  ...  # TODO: Handle 'e.error' of type AddPhotoErrorBody
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.proof.addPhoto({
                  id: "b_canal",
                  body: {
                    image: "some example string",
                    lat: 1.5,
                    lng: 1.5,
                    accuracy: 1.5,
                    liveCapture: true,
                    kind: Kind.Before,
                  },
                });
                // TODO: Handle 'response' of type Record<string, unknown>
              } catch (err) {
                // TODO: Handle 'err' of type Proof.AddPhotoError, discriminated with 'err.payload.kind'
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
    Photo:
      type: object
      required:
        - image
        - lat
        - lng
        - accuracy
        - live_capture
      properties:
        image:
          type: string
          description: data:image/jpeg;base64,...
        lat:
          type:
            - number
            - "null"
          description: Latitude of the spot
          examples:
            - 12.9719
        lng:
          type:
            - number
            - "null"
          description: Longitude of the spot
          examples:
            - 77.6412
        accuracy:
          type:
            - number
            - "null"
          description: Location accuracy in metres
        live_capture:
          type: boolean
          description: Taken with the in-app camera
      description: A photo with the place and time it was taken
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