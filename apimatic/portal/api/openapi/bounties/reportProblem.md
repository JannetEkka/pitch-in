# Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it (/docs/api/openapi/bounties/reportProblem)

`POST /reports`

Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it

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
  /reports:
    post:
      summary: Report a problem; the AI writes the bounty (checklist, estimate,
        hazard) and the rules price it
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - text
                - area
                - lat
                - lng
              properties:
                text:
                  type: string
                  description: Plain-language text
                  examples:
                    - The drain outside the school gate is blocked with leaves.
                area:
                  type: string
                  description: Neighbourhood name
                  examples:
                    - Lakeview Lane
                lat:
                  type: number
                  description: Latitude of the spot
                  examples:
                    - 12.9719
                lng:
                  type: number
                  description: Longitude of the spot
                  examples:
                    - 77.6412
                photo:
                  $ref: "#/components/schemas/Photo"
              description: Request body
      responses:
        "200":
          description: Draft bounty
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Bounty"
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Refused"
      operationId: reportProblem
      tags:
        - Bounties
      description: Report a problem; the AI writes the bounty (checklist, estimate,
        hazard) and the rules price it
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.bounties.report_problem(
                      ReportsRequest(
                          text="some example string",
                          area="some example string",
                          lat=1.5,
                          lng=1.5,
                      ),
                  )
                  # TODO: Handle 'response' of type Bounty
              except ApiError as e:
                  # TODO: Handle 'e.error' of type ReportProblemErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.bounties.reportProblem({
                  body: {
                    text: "some example string",
                    area: "some example string",
                    lat: 1.5,
                    lng: 1.5,
                  },
                });
                // TODO: Handle 'response' of type Bounty
              } catch (err) {
                // TODO: Handle 'err' of type Bounties.ReportProblemError, discriminated with 'err.payload.kind'
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
    Bounty:
      type: object
      properties:
        id:
          type: string
          description: Unique id
          examples:
            - b_canal
        title:
          type: string
          description: Short title of the job
          examples:
            - Clear litter along the canal footpath
        report_text:
          type: string
          description: The reporter's own words
        area:
          type: string
          description: Neighbourhood name
          examples:
            - Lakeview Lane
        lat:
          type: number
          description: Latitude of the spot
          examples:
            - 12.9719
        lng:
          type: number
          description: Longitude of the spot
          examples:
            - 77.6412
        job_type:
          type: string
          enum:
            - litter
            - drain
            - paint
            - repair
            - greenery
            - other
          description: Kind of job
        skill:
          type: string
          enum:
            - basic
            - semi
            - skilled
          description: Skill the job needs
        est_hours:
          type: number
          description: Estimated hours for one person
        materials_cents:
          type: integer
          description: Materials, in US cents
        hazard:
          type:
            - string
            - "null"
          description: Why the job is unsafe for a neighbour, if it is
        checklist:
          type: array
          items:
            $ref: "#/components/schemas/ChecklistItem"
          description: What the after photo must show
        price_low_cents:
          type: integer
          description: Bottom of the fair price range, in cents
        price_high_cents:
          type: integer
          description: Top of the fair price range, in cents
        goal_cents:
          type: integer
          description: Funding goal, in cents
          examples:
            - 2300
        holdback_pct:
          type: integer
          description: Share of the payment held until the recheck
        status:
          type: string
          enum:
            - draft
            - funding
            - funded
            - claimed
            - checking
            - objection_window
            - needs_neighbour
            - vote
            - paid
            - recheck_vote
            - closed
            - expired
            - referred
          description: Where the bounty or pledge is in its lifecycle
        reporter_id:
          type: string
          description: Neighbour who reported the problem
        doer_id:
          type:
            - string
            - "null"
          description: Neighbour who claimed the job
        deadline:
          type: string
          format: date-time
          description: When unfinished holds are voided
        recheck_due_at:
          type:
            - string
            - "null"
          format: date-time
          description: When the "still fixed" recheck opens
      description: A local job neighbours pay for
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
    ChecklistItem:
      type: object
      required:
        - id
        - text
      properties:
        id:
          type: string
          description: Unique id
          examples:
            - b_canal
        text:
          type: string
          description: What the after photo must show
          examples:
            - The drain outside the school gate is blocked with leaves.
      description: One thing the after photo must show
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