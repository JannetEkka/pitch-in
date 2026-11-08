# Raw Reference

**Raw** endpoints, reached through `with_raw_response`, return `ApiResult[T, E]` and never raise for an API error. For the parsed endpoints, see [API Reference](api-reference.md).

> Source: [PitchInApiClient](pitch_in_api/client.py)

## Bounties

> Source: [Bounties](pitch_in_api/apis/bounties.py)

<details>
<summary><code>def claim_bounty(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, ClaimBountyErrorBody]</code></summary>

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
result = client.bounties.with_raw_response.claim_bounty("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ClaimBountyErrorBody
```

**Async**

```python
result = await async_client.bounties.with_raw_response.claim_bounty("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ClaimBountyErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [ClaimBountyErrorBody](pitch_in_api/errors/claim_bounty_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Claimed

**On `Failure`**: `error` is <code>[ClaimBountyErrorBody](pitch_in_api/errors/claim_bounty_error.py)</code>

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
<summary><code>def get_area_health(*, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, GetAreaHealthErrorBody]</code></summary>

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
result = client.bounties.with_raw_response.get_area_health()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type GetAreaHealthErrorBody
```

**Async**

```python
result = await async_client.bounties.with_raw_response.get_area_health()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type GetAreaHealthErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [GetAreaHealthErrorBody](pitch_in_api/errors/get_area_health_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Areas

**On `Failure`**: `error` is <code>[GetAreaHealthErrorBody](pitch_in_api/errors/get_area_health_error.py)</code>

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
<summary><code>def get_bounty(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, GetBountyErrorBody]</code></summary>

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
result = client.bounties.with_raw_response.get_bounty("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type GetBountyErrorBody
```

**Async**

```python
result = await async_client.bounties.with_raw_response.get_bounty("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type GetBountyErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [GetBountyErrorBody](pitch_in_api/errors/get_bounty_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Bounty detail

**On `Failure`**: `error` is <code>[GetBountyErrorBody](pitch_in_api/errors/get_bounty_error.py)</code>

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
<summary><code>def list_bounties(*, request_options: RequestOptionsOrDict | None = None) -> ApiResult[list[Bounty], ListBountiesErrorBody]</code></summary>

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
result = client.bounties.with_raw_response.list_bounties()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type list[Bounty]
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ListBountiesErrorBody
```

**Async**

```python
result = await async_client.bounties.with_raw_response.list_bounties()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type list[Bounty]
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ListBountiesErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;list&#91;[Bounty](pitch_in_api/models/bounty.py)&#93;, [ListBountiesErrorBody](pitch_in_api/errors/list_bounties_error.py)&#93;</code>

**On `Success`**: `payload` is <code>list&#91;[Bounty](pitch_in_api/models/bounty.py)&#93;</code> -- Bounties

**On `Failure`**: `error` is <code>[ListBountiesErrorBody](pitch_in_api/errors/list_bounties_error.py)</code>

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
<summary><code>def publish_bounty(id_: str, *, body: BountiesPublishRequest | BountiesPublishRequestDict | None = None, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, PublishBountyErrorBody]</code></summary>

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
result = client.bounties.with_raw_response.publish_bounty("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type PublishBountyErrorBody
```

**Async**

```python
result = await async_client.bounties.with_raw_response.publish_bounty("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type PublishBountyErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [PublishBountyErrorBody](pitch_in_api/errors/publish_bounty_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Published

**On `Failure`**: `error` is <code>[PublishBountyErrorBody](pitch_in_api/errors/publish_bounty_error.py)</code>

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
<summary><code>def report_problem(body: ReportsRequest | ReportsRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Bounty, ReportProblemErrorBody]</code></summary>

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
result = client.bounties.with_raw_response.report_problem(
    ReportsRequest(text="some example string", area="some example string", lat=1.5, lng=1.5)
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Bounty
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ReportProblemErrorBody
```

**Async**

```python
result = await async_client.bounties.with_raw_response.report_problem(
    ReportsRequest(text="some example string", area="some example string", lat=1.5, lng=1.5)
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Bounty
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ReportProblemErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;[Bounty](pitch_in_api/models/bounty.py), [ReportProblemErrorBody](pitch_in_api/errors/report_problem_error.py)&#93;</code>

**On `Success`**: `payload` is <code>[Bounty](pitch_in_api/models/bounty.py)</code> -- Draft bounty

**On `Failure`**: `error` is <code>[ReportProblemErrorBody](pitch_in_api/errors/report_problem_error.py)</code>

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
<summary><code>def confirm_pledge(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Pledge, ConfirmPledgeErrorBody]</code></summary>

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
result = client.pledges.with_raw_response.confirm_pledge("pl_123456789abc")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Pledge
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ConfirmPledgeErrorBody
```

**Async**

```python
result = await async_client.pledges.with_raw_response.confirm_pledge("pl_123456789abc")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Pledge
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ConfirmPledgeErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;[Pledge](pitch_in_api/models/pledge.py), [ConfirmPledgeErrorBody](pitch_in_api/errors/confirm_pledge_error.py)&#93;</code>

**On `Success`**: `payload` is <code>[Pledge](pitch_in_api/models/pledge.py)</code> -- Authorized

**On `Failure`**: `error` is <code>[ConfirmPledgeErrorBody](pitch_in_api/errors/confirm_pledge_error.py)</code>

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
<summary><code>def start_pledge(id_: str, body: BountiesPledgesRequest | BountiesPledgesRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[BountiesPledgesResponse, StartPledgeErrorBody]</code></summary>

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
result = client.pledges.with_raw_response.start_pledge("b_canal", BountiesPledgesRequest(amount_cents=1))
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type BountiesPledgesResponse
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type StartPledgeErrorBody
```

**Async**

```python
result = await async_client.pledges.with_raw_response.start_pledge("b_canal", BountiesPledgesRequest(amount_cents=1))
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type BountiesPledgesResponse
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type StartPledgeErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;[BountiesPledgesResponse](pitch_in_api/models/bounties_pledges_response.py), [StartPledgeErrorBody](pitch_in_api/errors/start_pledge_error.py)&#93;</code>

**On `Success`**: `payload` is <code>[BountiesPledgesResponse](pitch_in_api/models/bounties_pledges_response.py)</code> -- Order created

**On `Failure`**: `error` is <code>[StartPledgeErrorBody](pitch_in_api/errors/start_pledge_error.py)</code>

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
<summary><code>def add_photo(id_: str, body: BountiesPhotosRequest | BountiesPhotosRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, AddPhotoErrorBody]</code></summary>

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
result = client.proof.with_raw_response.add_photo(
    "b_canal",
    BountiesPhotosRequest(
        image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True, kind=Kind.BEFORE
    ),
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type AddPhotoErrorBody
```

**Async**

```python
result = await async_client.proof.with_raw_response.add_photo(
    "b_canal",
    BountiesPhotosRequest(
        image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True, kind=Kind.BEFORE
    ),
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type AddPhotoErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [AddPhotoErrorBody](pitch_in_api/errors/add_photo_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Stored (EXIF stripped)

**On `Failure`**: `error` is <code>[AddPhotoErrorBody](pitch_in_api/errors/add_photo_error.py)</code>

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
<summary><code>def neighbour_confirm(id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, NeighbourConfirmErrorBody]</code></summary>

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
result = client.proof.with_raw_response.neighbour_confirm(
    "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type NeighbourConfirmErrorBody
```

**Async**

```python
result = await async_client.proof.with_raw_response.neighbour_confirm(
    "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type NeighbourConfirmErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [NeighbourConfirmErrorBody](pitch_in_api/errors/neighbour_confirm_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Confirmed

**On `Failure`**: `error` is <code>[NeighbourConfirmErrorBody](pitch_in_api/errors/neighbour_confirm_error.py)</code>

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
<summary><code>def object_to_release(id_: str, body: BountiesObjectRequest | BountiesObjectRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, ObjectToReleaseErrorBody]</code></summary>

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
result = client.proof.with_raw_response.object_to_release(
    "b_canal", BountiesObjectRequest(reason="some example string")
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ObjectToReleaseErrorBody
```

**Async**

```python
result = await async_client.proof.with_raw_response.object_to_release(
    "b_canal", BountiesObjectRequest(reason="some example string")
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ObjectToReleaseErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [ObjectToReleaseErrorBody](pitch_in_api/errors/object_to_release_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Sent to vote

**On `Failure`**: `error` is <code>[ObjectToReleaseErrorBody](pitch_in_api/errors/object_to_release_error.py)</code>

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
<summary><code>def submit_proof(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, SubmitProofErrorBody]</code></summary>

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
result = client.proof.with_raw_response.submit_proof("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type SubmitProofErrorBody
```

**Async**

```python
result = await async_client.proof.with_raw_response.submit_proof("b_canal")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type SubmitProofErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [SubmitProofErrorBody](pitch_in_api/errors/submit_proof_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Decision applied

**On `Failure`**: `error` is <code>[SubmitProofErrorBody](pitch_in_api/errors/submit_proof_error.py)</code>

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
<summary><code>def submit_recheck(id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, SubmitRecheckErrorBody]</code></summary>

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
result = client.proof.with_raw_response.submit_recheck(
    "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type SubmitRecheckErrorBody
```

**Async**

```python
result = await async_client.proof.with_raw_response.submit_recheck(
    "b_canal", Photo(image="some example string", lat=1.5, lng=1.5, accuracy=1.5, live_capture=True)
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type SubmitRecheckErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [SubmitRecheckErrorBody](pitch_in_api/errors/submit_recheck_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Recheck applied

**On `Failure`**: `error` is <code>[SubmitRecheckErrorBody](pitch_in_api/errors/submit_recheck_error.py)</code>

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
<summary><code>def vote(id_: str, body: BountiesVoteRequest | BountiesVoteRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, VoteErrorBody]</code></summary>

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
result = client.proof.with_raw_response.vote("b_canal", BountiesVoteRequest(choice=Choice.PAY))
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type VoteErrorBody
```

**Async**

```python
result = await async_client.proof.with_raw_response.vote("b_canal", BountiesVoteRequest(choice=Choice.PAY))
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type VoteErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [VoteErrorBody](pitch_in_api/errors/vote_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Vote recorded

**On `Failure`**: `error` is <code>[VoteErrorBody](pitch_in_api/errors/vote_error.py)</code>

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
<summary><code>def list_receipts(*, request_options: RequestOptionsOrDict | None = None) -> ApiResult[list[LedgerEntry], ListReceiptsErrorBody]</code></summary>

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
result = client.receipts.with_raw_response.list_receipts()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type list[LedgerEntry]
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ListReceiptsErrorBody
```

**Async**

```python
result = await async_client.receipts.with_raw_response.list_receipts()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type list[LedgerEntry]
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ListReceiptsErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;list&#91;[LedgerEntry](pitch_in_api/models/ledger_entry.py)&#93;, [ListReceiptsErrorBody](pitch_in_api/errors/list_receipts_error.py)&#93;</code>

**On `Success`**: `payload` is <code>list&#91;[LedgerEntry](pitch_in_api/models/ledger_entry.py)&#93;</code> -- Receipts

**On `Failure`**: `error` is <code>[ListReceiptsErrorBody](pitch_in_api/errors/list_receipts_error.py)</code>

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
<summary><code>def verify_receipts(*, request_options: RequestOptionsOrDict | None = None) -> ApiResult[LedgerVerifyResponse, VerifyReceiptsErrorBody]</code></summary>

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
result = client.receipts.with_raw_response.verify_receipts()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type LedgerVerifyResponse
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type VerifyReceiptsErrorBody
```

**Async**

```python
result = await async_client.receipts.with_raw_response.verify_receipts()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type LedgerVerifyResponse
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type VerifyReceiptsErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;[LedgerVerifyResponse](pitch_in_api/models/ledger_verify_response.py), [VerifyReceiptsErrorBody](pitch_in_api/errors/verify_receipts_error.py)&#93;</code>

**On `Success`**: `payload` is <code>[LedgerVerifyResponse](pitch_in_api/models/ledger_verify_response.py)</code> -- Result

**On `Failure`**: `error` is <code>[VerifyReceiptsErrorBody](pitch_in_api/errors/verify_receipts_error.py)</code>

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
<summary><code>def sign_in(body: SessionRequest | SessionRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, SignInErrorBody]</code></summary>

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
result = client.session.with_raw_response.sign_in(SessionRequest(user_id="some example string"))
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type SignInErrorBody
```

**Async**

```python
result = await async_client.session.with_raw_response.sign_in(SessionRequest(user_id="some example string"))
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type SignInErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [SignInErrorBody](pitch_in_api/errors/sign_in_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Signed in

**On `Failure`**: `error` is <code>[SignInErrorBody](pitch_in_api/errors/sign_in_error.py)</code>

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
<summary><code>def investigate_case(id_: str, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, InvestigateCaseErrorBody]</code></summary>

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
result = client.support.with_raw_response.investigate_case("case_123456789abc")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type InvestigateCaseErrorBody
```

**Async**

```python
result = await async_client.support.with_raw_response.investigate_case("case_123456789abc")
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type InvestigateCaseErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [InvestigateCaseErrorBody](pitch_in_api/errors/investigate_case_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Finding

**On `Failure`**: `error` is <code>[InvestigateCaseErrorBody](pitch_in_api/errors/investigate_case_error.py)</code>

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
<summary><code>def list_cases(*, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, ListCasesErrorBody]</code></summary>

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
result = client.support.with_raw_response.list_cases()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ListCasesErrorBody
```

**Async**

```python
result = await async_client.support.with_raw_response.list_cases()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ListCasesErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [ListCasesErrorBody](pitch_in_api/errors/list_cases_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Cases

**On `Failure`**: `error` is <code>[ListCasesErrorBody](pitch_in_api/errors/list_cases_error.py)</code>

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
<summary><code>def open_case(body: CasesRequest | CasesRequestDict, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, OpenCaseErrorBody]</code></summary>

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
result = client.support.with_raw_response.open_case(
    CasesRequest(kind="some example string", body="some example string")
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type OpenCaseErrorBody
```

**Async**

```python
result = await async_client.support.with_raw_response.open_case(
    CasesRequest(kind="some example string", body="some example string")
)
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type OpenCaseErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [OpenCaseErrorBody](pitch_in_api/errors/open_case_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Opened

**On `Failure`**: `error` is <code>[OpenCaseErrorBody](pitch_in_api/errors/open_case_error.py)</code>

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
<summary><code>def reconcile_with_pay_pal(*, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, ReconcileWithPayPalErrorBody]</code></summary>

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
result = client.support.with_raw_response.reconcile_with_pay_pal()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ReconcileWithPayPalErrorBody
```

**Async**

```python
result = await async_client.support.with_raw_response.reconcile_with_pay_pal()
match result:
    case Success(payload=payload):
        ...  # TODO: Handle 'payload' of type Any
    case Failure(error=error):
        ...  # TODO: Handle 'error' of type ReconcileWithPayPalErrorBody
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

**Returns**: <code>[ApiResult](pitch_in_api/core/results.py)&#91;Any, [ReconcileWithPayPalErrorBody](pitch_in_api/errors/reconcile_with_pay_pal_error.py)&#93;</code>

**On `Success`**: `payload` is <code>Any</code> -- Mismatches

**On `Failure`**: `error` is <code>[ReconcileWithPayPalErrorBody](pitch_in_api/errors/reconcile_with_pay_pal_error.py)</code>

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

