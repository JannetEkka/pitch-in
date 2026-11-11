# Reference

> Source: [PitchInApiClient](src/client.ts)

## Bounties

> Source: [Bounties](src/resources/bounties.ts)

<details>
<summary><code>claimBounty(request: Bounties.ClaimBountyRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Bounties.ClaimBountyError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.bounties.claimBounty({ id: "b_canal" });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Bounties.ClaimBountyError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.bounties.claimBounty({ id: "b_canal" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.bounties.claimBounty(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Bounties.ClaimBountyError](src/resources/bounties.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.bounties.claimBounty(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Bounties.ClaimBountyError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getAreaHealth(options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Bounties.GetAreaHealthError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Area health (measured, plus labelled sample trends)

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.bounties.getAreaHealth();
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Bounties.GetAreaHealthError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.bounties.getAreaHealth().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.bounties.getAreaHealth()`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Bounties.GetAreaHealthError](src/resources/bounties.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.bounties.getAreaHealth().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Bounties.GetAreaHealthError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getBounty(request: Bounties.GetBountyRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Bounties.GetBountyError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

A bounty with its pledges, payouts, photos, AI checks and receipts

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.bounties.getBounty({ id: "b_canal" });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Bounties.GetBountyError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.bounties.getBounty({ id: "b_canal" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.bounties.getBounty(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Bounties.GetBountyError](src/resources/bounties.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.bounties.getBounty(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Bounties.GetBountyError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listBounties(options?: RequestOptions): ApiPromise&lt;Bounty[], Bounties.ListBountiesError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

List bounties with money totals

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.bounties.listBounties();
  // TODO: Handle 'response' of type Bounty[]
} catch (err) {
  // TODO: Handle 'err' of type Bounties.ListBountiesError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.bounties.listBounties().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Bounty[]
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.bounties.listBounties()`

- **OnSuccess**: <code>[Bounty](src/models/bounty.ts)[]</code>
- **OnError**: throws <code>[Bounties.ListBountiesError](src/resources/bounties.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.bounties.listBounties().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Bounty[], Bounties.ListBountiesError&gt;</code>, with `result.value` of type <code>[Bounty](src/models/bounty.ts)[]</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>publishBounty(request: Bounties.PublishBountyRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Bounties.PublishBountyError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Publish a draft; the goal can't go below the fair-price floor

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.bounties.publishBounty({ id: "b_canal" });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Bounties.PublishBountyError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.bounties.publishBounty({ id: "b_canal" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |
| <code>body?</code> | <code>[BountiesPublishRequest](src/models/bounties-publish-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.bounties.publishBounty(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Bounties.PublishBountyError](src/resources/bounties.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.bounties.publishBounty(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Bounties.PublishBountyError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>reportProblem(request: Bounties.ReportProblemRequest, options?: RequestOptions): ApiPromise&lt;Bounty, Bounties.ReportProblemError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.bounties.reportProblem({
    body: { text: "some example string", area: "some example string", lat: 1.5, lng: 1.5 },
  });
  // TODO: Handle 'response' of type Bounty
} catch (err) {
  // TODO: Handle 'err' of type Bounties.ReportProblemError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.bounties.reportProblem({
  body: { text: "some example string", area: "some example string", lat: 1.5, lng: 1.5 },
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Bounty
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body</code> | <code>[ReportsRequest](src/models/reports-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.bounties.reportProblem(request)`

- **OnSuccess**: <code>[Bounty](src/models/bounty.ts)</code>
- **OnError**: throws <code>[Bounties.ReportProblemError](src/resources/bounties.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.bounties.reportProblem(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Bounty, Bounties.ReportProblemError&gt;</code>, with `result.value` of type <code>[Bounty](src/models/bounty.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Pledges

> Source: [Pledges](src/resources/pledges.ts)

<details>
<summary><code>confirmPledge(request: Pledges.ConfirmPledgeRequest, options?: RequestOptions): ApiPromise&lt;Pledge, Pledges.ConfirmPledgeError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

After PayPal approval, authorize the order (money held, not charged)

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.pledges.confirmPledge({ id: "pl_123456789abc" });
  // TODO: Handle 'response' of type Pledge
} catch (err) {
  // TODO: Handle 'err' of type Pledges.ConfirmPledgeError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.pledges.confirmPledge({ id: "pl_123456789abc" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Pledge
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Pledge id |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.pledges.confirmPledge(request)`

- **OnSuccess**: <code>[Pledge](src/models/pledge.ts)</code>
- **OnError**: throws <code>[Pledges.ConfirmPledgeError](src/resources/pledges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.pledges.confirmPledge(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Pledge, Pledges.ConfirmPledgeError&gt;</code>, with `result.value` of type <code>[Pledge](src/models/pledge.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>startPledge(request: Pledges.StartPledgeRequest, options?: RequestOptions): ApiPromise&lt;BountiesPledgesResponse, Pledges.StartPledgeError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.pledges.startPledge({ id: "b_canal", body: { amountCents: 1 } });
  // TODO: Handle 'response' of type BountiesPledgesResponse
} catch (err) {
  // TODO: Handle 'err' of type Pledges.StartPledgeError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.pledges.startPledge({ id: "b_canal", body: { amountCents: 1 } }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type BountiesPledgesResponse
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |
| <code>body</code> | <code>[BountiesPledgesRequest](src/models/bounties-pledges-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.pledges.startPledge(request)`

- **OnSuccess**: <code>[BountiesPledgesResponse](src/models/bounties-pledges-response.ts)</code>
- **OnError**: throws <code>[Pledges.StartPledgeError](src/resources/pledges.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.pledges.startPledge(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;BountiesPledgesResponse, Pledges.StartPledgeError&gt;</code>, with `result.value` of type <code>[BountiesPledgesResponse](src/models/bounties-pledges-response.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Proof

> Source: [Proof](src/resources/proof.ts)

<details>
<summary><code>addPhoto(request: Proof.AddPhotoRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Proof.AddPhotoError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Doer adds the before or after photo

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
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
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.proof.addPhoto({
  id: "b_canal",
  body: {
    image: "some example string",
    lat: 1.5,
    lng: 1.5,
    accuracy: 1.5,
    liveCapture: true,
    kind: Kind.Before,
  },
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |
| <code>body</code> | <code>[BountiesPhotosRequest](src/models/bounties-photos-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.proof.addPhoto(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Proof.AddPhotoError](src/resources/proof.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.proof.addPhoto(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Proof.AddPhotoError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>neighbourConfirm(request: Proof.NeighbourConfirmRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Proof.NeighbourConfirmError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

A neighbour confirms a large bounty on the spot

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.proof.neighbourConfirm({
    id: "b_canal",
    body: { image: "some example string", lat: 1.5, lng: 1.5, accuracy: 1.5, liveCapture: true },
  });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Proof.NeighbourConfirmError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.proof.neighbourConfirm({
  id: "b_canal",
  body: { image: "some example string", lat: 1.5, lng: 1.5, accuracy: 1.5, liveCapture: true },
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |
| <code>body</code> | <code>[Photo](src/models/photo.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.proof.neighbourConfirm(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Proof.NeighbourConfirmError](src/resources/proof.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.proof.neighbourConfirm(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Proof.NeighbourConfirmError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>objectToRelease(request: Proof.ObjectToReleaseRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Proof.ObjectToReleaseError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

A funder objects during the 24-hour window

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.proof.objectToRelease({
    id: "b_canal",
    body: { reason: "some example string" },
  });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Proof.ObjectToReleaseError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.proof.objectToRelease({
  id: "b_canal",
  body: { reason: "some example string" },
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |
| <code>body</code> | <code>[BountiesObjectRequest](src/models/bounties-object-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.proof.objectToRelease(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Proof.ObjectToReleaseError](src/resources/proof.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.proof.objectToRelease(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Proof.ObjectToReleaseError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>submitProof(request: Proof.SubmitProofRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Proof.SubmitProofError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection window, ask a neighbour, or send it to the funders' vote

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.proof.submitProof({ id: "b_canal" });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Proof.SubmitProofError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.proof.submitProof({ id: "b_canal" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.proof.submitProof(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Proof.SubmitProofError](src/resources/proof.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.proof.submitProof(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Proof.SubmitProofError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>submitRecheck(request: Proof.SubmitRecheckRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Proof.SubmitRecheckError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

The "still fixed?" recheck; pays the held-back share if the fix held

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.proof.submitRecheck({
    id: "b_canal",
    body: { image: "some example string", lat: 1.5, lng: 1.5, accuracy: 1.5, liveCapture: true },
  });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Proof.SubmitRecheckError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.proof.submitRecheck({
  id: "b_canal",
  body: { image: "some example string", lat: 1.5, lng: 1.5, accuracy: 1.5, liveCapture: true },
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |
| <code>body</code> | <code>[Photo](src/models/photo.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.proof.submitRecheck(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Proof.SubmitRecheckError](src/resources/proof.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.proof.submitRecheck(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Proof.SubmitRecheckError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>vote(request: Proof.VoteRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Proof.VoteError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Funder votes; weighted by amount pledged, a tie pays the doer

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.proof.vote({ id: "b_canal", body: { choice: Choice.Pay } });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Proof.VoteError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.proof.vote({ id: "b_canal", body: { choice: Choice.Pay } }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Bounty id |
| <code>body</code> | <code>[BountiesVoteRequest](src/models/bounties-vote-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.proof.vote(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Proof.VoteError](src/resources/proof.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.proof.vote(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Proof.VoteError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Receipts

> Source: [Receipts](src/resources/receipts.ts)

<details>
<summary><code>listReceipts(options?: RequestOptions): ApiPromise&lt;LedgerEntry[], Receipts.ListReceiptsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Every receipt, hash-chained

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.receipts.listReceipts();
  // TODO: Handle 'response' of type LedgerEntry[]
} catch (err) {
  // TODO: Handle 'err' of type Receipts.ListReceiptsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.receipts.listReceipts().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type LedgerEntry[]
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.receipts.listReceipts()`

- **OnSuccess**: <code>[LedgerEntry](src/models/ledger-entry.ts)[]</code>
- **OnError**: throws <code>[Receipts.ListReceiptsError](src/resources/receipts.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.receipts.listReceipts().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;LedgerEntry[], Receipts.ListReceiptsError&gt;</code>, with `result.value` of type <code>[LedgerEntry](src/models/ledger-entry.ts)[]</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>verifyReceipts(options?: RequestOptions): ApiPromise&lt;LedgerVerifyResponse, Receipts.VerifyReceiptsError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Re-check the whole hash chain

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.receipts.verifyReceipts();
  // TODO: Handle 'response' of type LedgerVerifyResponse
} catch (err) {
  // TODO: Handle 'err' of type Receipts.VerifyReceiptsError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.receipts.verifyReceipts().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type LedgerVerifyResponse
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.receipts.verifyReceipts()`

- **OnSuccess**: <code>[LedgerVerifyResponse](src/models/ledger-verify-response.ts)</code>
- **OnError**: throws <code>[Receipts.VerifyReceiptsError](src/resources/receipts.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.receipts.verifyReceipts().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;LedgerVerifyResponse, Receipts.VerifyReceiptsError&gt;</code>, with `result.value` of type <code>[LedgerVerifyResponse](src/models/ledger-verify-response.ts)</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Support

> Source: [Support](src/resources/support.ts)

<details>
<summary><code>investigateCase(request: Support.InvestigateCaseRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Support.InvestigateCaseError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.support.investigateCase({ id: "case_123456789abc" });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Support.InvestigateCaseError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.support.investigateCase({ id: "case_123456789abc" }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>id</code> | <code>string</code> | Case id |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.support.investigateCase(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Support.InvestigateCaseError](src/resources/support.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.support.investigateCase(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Support.InvestigateCaseError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>listCases(options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Support.ListCasesError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Support cases

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.support.listCases();
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Support.ListCasesError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.support.listCases().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.support.listCases()`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Support.ListCasesError](src/resources/support.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.support.listCases().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Support.ListCasesError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>openCase(request: Support.OpenCaseRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Support.OpenCaseError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Open a support case

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.support.openCase({
    body: { kind: "some example string", body: "some example string" },
  });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Support.OpenCaseError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.support.openCase({
  body: { kind: "some example string", body: "some example string" },
}).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body</code> | <code>[CasesRequest](src/models/cases-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.support.openCase(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Support.OpenCaseError](src/resources/support.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.support.openCase(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Support.OpenCaseError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>reconcileWithPayPal(options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Support.ReconcileWithPayPalError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Compare our records with PayPal's; open a case per mismatch

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.support.reconcileWithPayPal();
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Support.ReconcileWithPayPalError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.support.reconcileWithPayPal().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.support.reconcileWithPayPal()`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Support.ReconcileWithPayPalError](src/resources/support.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.support.reconcileWithPayPal().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Support.ReconcileWithPayPalError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

## Session

> Source: [Session](src/resources/session.ts)

<details>
<summary><code>signIn(request: Session.SignInRequest, options?: RequestOptions): ApiPromise&lt;Record&lt;string, unknown&gt;, Session.SignInError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Sign in as a demo neighbour

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.session.signIn({ body: { userId: "some example string" } });
  // TODO: Handle 'response' of type Record<string, unknown>
} catch (err) {
  // TODO: Handle 'err' of type Session.SignInError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.session.signIn({ body: { userId: "some example string" } }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type Record<string, unknown>
} else {
  // TODO: Handle 'result', discriminated with 'result.payload.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body</code> | <code>[SessionRequest](src/models/session-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.session.signIn(request)`

- **OnSuccess**: <code>Record&lt;string, unknown&gt;</code>
- **OnError**: throws <code>[Session.SignInError](src/resources/session.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.session.signIn(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;Record&lt;string, unknown&gt;, Session.SignInError&gt;</code>, with `result.value` of type <code>Record&lt;string, unknown&gt;</code>
- **OnError**: `result.payload` discriminated on `kind`, with `result.message`

**Thrown**: <code>[PitchInApiError](src/core/errors.ts)</code> on any operational failure — a caller abort and a programmer error stay outside the family and reach you raw

</dd>
</dl>

</dd>
</dl>

</details>

