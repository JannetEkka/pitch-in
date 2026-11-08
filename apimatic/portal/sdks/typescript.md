# TypeScript SDK (/docs/sdks/typescript)

[Download SDK](/docs/__downloads/sdk/typescript.zip)

## Intro [#intro]

The Pitch In API SDK provides access to the Pitch In API REST APIs.

Neighbourhood bounties paid through PayPal only when the fix is verified, and again when it lasts. Pledges are PayPal authorizations (held, not charged). The doer is paid with PayPal Payouts. Sign in by sending a sample neighbour id in the X-Pitch-In-User header (demo only; production would use Log in with PayPal).

## Installation [#installation]

The SDK compiles to `dist/` before it can be referenced — run its `build` script once in the SDK folder, then add it to your project by path:

```bash
npm install <path-to-sdk>
```

## Quick Start [#quick-start]

Create one client and reuse it. Configure its behaviour through `ClientOptions`.

```ts
import { PitchInApiClient, ServerEnvironment } from "pitch-in-api";

const client = new PitchInApiClient({
  serverEnvironment: ServerEnvironment.Production,
  demoUser: "YOUR_API_KEY",
});
```

Nothing in `ClientOptions` is required — `new PitchInApiClient()` compiles — and each option left out falls back to its default. `serverEnvironment` is spelled out above so the environment a call reaches is visible where the client is built rather than inherited silently.

### From CommonJS [#from-commonjs]

The package ships both dialects from a single entry, so `require` works with full types. In a TypeScript CommonJS file use the `import ... = require(...)` form — a plain destructuring `require` runs fine but gives you `any`.

```ts
import sdk = require("pitch-in-api");

const client = new sdk.PitchInApiClient({
  serverEnvironment: sdk.ServerEnvironment.Production,
  demoUser: "YOUR_API_KEY",
});
```