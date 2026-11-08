# List bounties with money totals (/docs/api/openapi/bounties/listBounties)

`GET /bounties`

List bounties with money totals

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
  /bounties:
    get:
      summary: List bounties with money totals
      security: []
      responses:
        "200":
          description: Bounties
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Bounty"
                description: Bounties
        "400":
          $ref: "#/components/responses/BadRequest"
      operationId: listBounties
      tags:
        - Bounties
      description: List bounties with money totals
      x-apimatic-codeSamples:
        - lang: python
          label: Python
          sources:
            Example: |-
              try:
                  response = client.bounties.list_bounties()
                  # TODO: Handle 'response' of type list[Bounty]
              except ApiError as e:
                  # TODO: Handle 'e.error' of type ListBountiesErrorBody
                  ...
        - lang: typescript
          label: TypeScript
          sources:
            Example: >-
              try {
                const response = await client.bounties.listBounties();
                // TODO: Handle 'response' of type Bounty[]
              } catch (err) {
                // TODO: Handle 'err' of type Bounties.ListBountiesError, discriminated with 'err.payload.kind'
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
info:
  title: Pitch In API
  version: 0.1.0
```