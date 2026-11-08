# Reference

**Parsed** endpoints return the typed payload and raise `ApiError` on a documented non-2xx. For the raw endpoints, see [Raw API Reference](raw-api-reference.md).

> Source: [PitchInApiClient](pitch_in_api/client.py)

## Bounties

> Source: [Bounties](pitch_in_api/apis/bounties.py)

<details>
<summary><code>def claim_bounty(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.bounties.claim_bounty("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ClaimBountyErrorBody
```

**Async**

```python
try:
    response = await async_client.bounties.claim_bounty("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ClaimBountyErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Claimed

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ClaimBountyErrorBody](pitch_in_api/errors/claim_bounty_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def get_area_health(*, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Area health (measured, plus labelled sample trends)

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.bounties.get_area_health()
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type GetAreaHealthErrorBody
```

**Async**

```python
try:
    response = await async_client.bounties.get_area_health()
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type GetAreaHealthErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Areas

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[GetAreaHealthErrorBody](pitch_in_api/errors/get_area_health_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def get_bounty(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

A bounty with its pledges, payouts, photos, AI checks and receipts

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.bounties.get_bounty("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type GetBountyErrorBody
```

**Async**

```python
try:
    response = await async_client.bounties.get_bounty("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type GetBountyErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Bounty detail

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[GetBountyErrorBody](pitch_in_api/errors/get_bounty_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def list_bounties(*, request_options: RequestOptionsOrDict | None = None) -> list[Bounty]</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

List bounties with money totals

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.bounties.list_bounties()
    # TODO: Handle 'response' of type list[Bounty]
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ListBountiesErrorBody
```

**Async**

```python
try:
    response = await async_client.bounties.list_bounties()
    # TODO: Handle 'response' of type list[Bounty]
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ListBountiesErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>list&#91;[Bounty](pitch_in_api/models/bounty.py)&#93;</code> -- Bounties

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ListBountiesErrorBody](pitch_in_api/errors/list_bounties_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def publish_bounty(id_: str, *, body: BountiesPublishRequest | BountiesPublishRequestDict | None = None, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Publish a draft; the goal can't go below the fair-price floor

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.bounties.publish_bounty("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type PublishBountyErrorBody
```

**Async**

```python
try:
    response = await async_client.bounties.publish_bounty("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type PublishBountyErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>body</code> | <code>[BountiesPublishRequest](pitch_in_api/models/bounties_publish_request.py) \| [BountiesPublishRequestDict](pitch_in_api/models/bounties_publish_request.py) \| None</code> | The request body.<br>**Default**: <code>None</code> |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Published

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[PublishBountyErrorBody](pitch_in_api/errors/publish_bounty_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def report_problem(body: ReportsRequest | ReportsRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> Bounty</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.bounties.report_problem(
        ReportsRequest(text="some example string", area="some example string", lat=1.5, lng=1.5)
    )
    # TODO: Handle 'response' of type Bounty
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ReportProblemErrorBody
```

**Async**

```python
try:
    response = await async_client.bounties.report_problem(
        ReportsRequest(text="some example string", area="some example string", lat=1.5, lng=1.5)
    )
    # TODO: Handle 'response' of type Bounty
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ReportProblemErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body</code> | <code>[ReportsRequest](pitch_in_api/models/reports_request.py) \| [ReportsRequestDict](pitch_in_api/models/reports_request.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Bounty](pitch_in_api/models/bounty.py)</code> -- Draft bounty

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ReportProblemErrorBody](pitch_in_api/errors/report_problem_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

## Pledges

> Source: [Pledges](pitch_in_api/apis/pledges.py)

<details>
<summary><code>def confirm_pledge(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Pledge</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

After PayPal approval, authorize the order (money held, not charged)

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.pledges.confirm_pledge("pl_123456789abc")
    # TODO: Handle 'response' of type Pledge
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ConfirmPledgeErrorBody
```

**Async**

```python
try:
    response = await async_client.pledges.confirm_pledge("pl_123456789abc")
    # TODO: Handle 'response' of type Pledge
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ConfirmPledgeErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Pledge id |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[Pledge](pitch_in_api/models/pledge.py)</code> -- Authorized

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ConfirmPledgeErrorBody](pitch_in_api/errors/confirm_pledge_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def start_pledge(id_: str, body: BountiesPledgesRequest | BountiesPledgesRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> BountiesPledgesResponse</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.pledges.start_pledge("b_canal", BountiesPledgesRequest(amount_cents=1))
    # TODO: Handle 'response' of type BountiesPledgesResponse
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type StartPledgeErrorBody
```

**Async**

```python
try:
    response = await async_client.pledges.start_pledge("b_canal", BountiesPledgesRequest(amount_cents=1))
    # TODO: Handle 'response' of type BountiesPledgesResponse
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type StartPledgeErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>body</code> | <code>[BountiesPledgesRequest](pitch_in_api/models/bounties_pledges_request.py) \| [BountiesPledgesRequestDict](pitch_in_api/models/bounties_pledges_request.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[BountiesPledgesResponse](pitch_in_api/models/bounties_pledges_response.py)</code> -- Order created

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[StartPledgeErrorBody](pitch_in_api/errors/start_pledge_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

## Proof

> Source: [Proof](pitch_in_api/apis/proof.py)

<details>
<summary><code>def add_photo(id_: str, body: BountiesPhotosRequest | BountiesPhotosRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Doer adds the before or after photo

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.proof.add_photo(
        "b_canal",
        BountiesPhotosRequest(
            image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True, kind=Kind.BEFORE
        ),
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type AddPhotoErrorBody
```

**Async**

```python
try:
    response = await async_client.proof.add_photo(
        "b_canal",
        BountiesPhotosRequest(
            image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True, kind=Kind.BEFORE
        ),
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type AddPhotoErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>body</code> | <code>[BountiesPhotosRequest](pitch_in_api/models/bounties_photos_request.py) \| [BountiesPhotosRequestDict](pitch_in_api/models/bounties_photos_request.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Stored (EXIF stripped)

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[AddPhotoErrorBody](pitch_in_api/errors/add_photo_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def neighbour_confirm(id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

A neighbour confirms a large bounty on the spot

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.proof.neighbour_confirm(
        "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type NeighbourConfirmErrorBody
```

**Async**

```python
try:
    response = await async_client.proof.neighbour_confirm(
        "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type NeighbourConfirmErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>body</code> | <code>[Photo](pitch_in_api/models/photo.py) \| [PhotoDict](pitch_in_api/models/photo.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Confirmed

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[NeighbourConfirmErrorBody](pitch_in_api/errors/neighbour_confirm_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def object_to_release(id_: str, body: BountiesObjectRequest | BountiesObjectRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

A funder objects during the 24-hour window

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.proof.object_to_release("b_canal", BountiesObjectRequest(reason="some example string"))
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ObjectToReleaseErrorBody
```

**Async**

```python
try:
    response = await async_client.proof.object_to_release(
        "b_canal", BountiesObjectRequest(reason="some example string")
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ObjectToReleaseErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>body</code> | <code>[BountiesObjectRequest](pitch_in_api/models/bounties_object_request.py) \| [BountiesObjectRequestDict](pitch_in_api/models/bounties_object_request.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Sent to vote

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ObjectToReleaseErrorBody](pitch_in_api/errors/object_to_release_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def submit_proof(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection window, ask a neighbour, or send it to the funders' vote

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.proof.submit_proof("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type SubmitProofErrorBody
```

**Async**

```python
try:
    response = await async_client.proof.submit_proof("b_canal")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type SubmitProofErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Decision applied

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[SubmitProofErrorBody](pitch_in_api/errors/submit_proof_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def submit_recheck(id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

The "still fixed?" recheck; pays the held-back share if the fix held

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.proof.submit_recheck(
        "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type SubmitRecheckErrorBody
```

**Async**

```python
try:
    response = await async_client.proof.submit_recheck(
        "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type SubmitRecheckErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>body</code> | <code>[Photo](pitch_in_api/models/photo.py) \| [PhotoDict](pitch_in_api/models/photo.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Recheck applied

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[SubmitRecheckErrorBody](pitch_in_api/errors/submit_recheck_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def vote(id_: str, body: BountiesVoteRequest | BountiesVoteRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Funder votes; weighted by amount pledged, a tie pays the doer

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.proof.vote("b_canal", BountiesVoteRequest(choice=Choice.PAY))
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type VoteErrorBody
```

**Async**

```python
try:
    response = await async_client.proof.vote("b_canal", BountiesVoteRequest(choice=Choice.PAY))
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type VoteErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Bounty id |
| <code>body</code> | <code>[BountiesVoteRequest](pitch_in_api/models/bounties_vote_request.py) \| [BountiesVoteRequestDict](pitch_in_api/models/bounties_vote_request.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Vote recorded

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[VoteErrorBody](pitch_in_api/errors/vote_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

## Receipts

> Source: [Receipts](pitch_in_api/apis/receipts.py)

<details>
<summary><code>def list_receipts(*, request_options: RequestOptionsOrDict | None = None) -> list[LedgerEntry]</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Every receipt, hash-chained

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.receipts.list_receipts()
    # TODO: Handle 'response' of type list[LedgerEntry]
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ListReceiptsErrorBody
```

**Async**

```python
try:
    response = await async_client.receipts.list_receipts()
    # TODO: Handle 'response' of type list[LedgerEntry]
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ListReceiptsErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>list&#91;[LedgerEntry](pitch_in_api/models/ledger_entry.py)&#93;</code> -- Receipts

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ListReceiptsErrorBody](pitch_in_api/errors/list_receipts_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def verify_receipts(*, request_options: RequestOptionsOrDict | None = None) -> LedgerVerifyResponse</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Re-check the whole hash chain

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.receipts.verify_receipts()
    # TODO: Handle 'response' of type LedgerVerifyResponse
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type VerifyReceiptsErrorBody
```

**Async**

```python
try:
    response = await async_client.receipts.verify_receipts()
    # TODO: Handle 'response' of type LedgerVerifyResponse
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type VerifyReceiptsErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>[LedgerVerifyResponse](pitch_in_api/models/ledger_verify_response.py)</code> -- Result

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[VerifyReceiptsErrorBody](pitch_in_api/errors/verify_receipts_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

## Session

> Source: [Session](pitch_in_api/apis/session.py)

<details>
<summary><code>def sign_in(body: SessionRequest | SessionRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Sign in as a demo neighbour

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.session.sign_in(SessionRequest(user_id="some example string"))
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type SignInErrorBody
```

**Async**

```python
try:
    response = await async_client.session.sign_in(SessionRequest(user_id="some example string"))
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type SignInErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body</code> | <code>[SessionRequest](pitch_in_api/models/session_request.py) \| [SessionRequestDict](pitch_in_api/models/session_request.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Signed in

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[SignInErrorBody](pitch_in_api/errors/sign_in_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

## Support

> Source: [Support](pitch_in_api/apis/support.py)

<details>
<summary><code>def investigate_case(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.support.investigate_case("case_123456789abc")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type InvestigateCaseErrorBody
```

**Async**

```python
try:
    response = await async_client.support.investigate_case("case_123456789abc")
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type InvestigateCaseErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id_</code> | <code>str</code> | Case id |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Finding

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[InvestigateCaseErrorBody](pitch_in_api/errors/investigate_case_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def list_cases(*, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Support cases

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.support.list_cases()
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ListCasesErrorBody
```

**Async**

```python
try:
    response = await async_client.support.list_cases()
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ListCasesErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Cases

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ListCasesErrorBody](pitch_in_api/errors/list_cases_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def open_case(body: CasesRequest | CasesRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Open a support case

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.support.open_case(CasesRequest(kind="some example string", body="some example string"))
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type OpenCaseErrorBody
```

**Async**

```python
try:
    response = await async_client.support.open_case(
        CasesRequest(kind="some example string", body="some example string")
    )
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type OpenCaseErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body</code> | <code>[CasesRequest](pitch_in_api/models/cases_request.py) \| [CasesRequestDict](pitch_in_api/models/cases_request.py)</code> | The request body. |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Opened

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[OpenCaseErrorBody](pitch_in_api/errors/open_case_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>def reconcile_with_pay_pal(*, request_options: RequestOptionsOrDict | None = None) -> Any</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Compare our records with PayPal's; open a case per mismatch

</dd>
</dl>

### Usage

<dl>
<dd>

**Sync**

```python
try:
    response = client.support.reconcile_with_pay_pal()
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ReconcileWithPayPalErrorBody
```

**Async**

```python
try:
    response = await async_client.support.reconcile_with_pay_pal()
    # TODO: Handle 'response' of type Any
except ApiError as e:
    ...  # TODO: Handle 'e.error' of type ReconcileWithPayPalErrorBody
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>request_options</code> | <code>[RequestOptionsOrDict](pitch_in_api/core/request_options.py) \| None</code> | Per-call overrides for this one request, such as a timeout, extra headers, or its retry count and statuses. |

</dd>
</dl>

### Response

<dl>
<dd>

**OnSuccess**: <code>Any</code> -- Mismatches

**OnError**: <code>[ApiError](pitch_in_api/core/exceptions.py)&#91;[ReconcileWithPayPalErrorBody](pitch_in_api/errors/reconcile_with_pay_pal_error.py)&#93;</code>

Mapped in first-match order -- an earlier row wins over a later range that also covers the status:

| Status | `error` is |
| --- | --- |
| 400, 409 | <code>[Error](pitch_in_api/models/error.py)</code> |
| anything unmapped | <code>[RawError](pitch_in_api/core/results.py)</code> |

</dd>
</dl>

</dd>
</dl>

</details>

