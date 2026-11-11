# Python SDK (/docs/sdks/python)

[Download SDK](/docs/__downloads/sdk/python.zip)

## Intro [#intro]

The Pitch In API SDK provides access to the Pitch In API REST APIs.

Neighbourhood bounties paid through PayPal only when the fix is verified, and again when it lasts. Pledges are PayPal authorizations (held, not charged). The doer is paid with PayPal Payouts. Sign in by sending a sample neighbour id in the X-Pitch-In-User header (demo only; production would use Log in with PayPal).

## Installation [#installation]

Add the SDK to your project from its folder, with whichever package manager your project uses. Give each tool a path containing a slash, such as `../pitch-in-api` — a bare folder name is looked up on PyPI instead, and resolves to whatever project holds that name there:

```bash
pip install <path-to-sdk>
```

```bash
uv add <path-to-sdk>
```

```bash
poetry add <path-to-sdk>
```

## Quick Start [#quick-start]

### Synchronous client [#synchronous-client]

Construct `PitchInApiClient` with keyword arguments, and call `close()` when you are done. Every argument is optional.

```python
from pitch_in_api import PitchInApiClient

client = PitchInApiClient(demo_user="YOUR_API_KEY", environment="production")

client.close()
```

Alternatively, scope it — `with PitchInApiClient(...) as client:` closes the pool on exit.

### Asynchronous client [#asynchronous-client]

`AsyncPitchInApiClient` mirrors `PitchInApiClient` with **identical method names**, and every endpoint method is a coroutine. It takes the same arguments, with some differences — for example, the transport argument is `custom_async_http_client`.

```python
from asyncio import run

from pitch_in_api import AsyncPitchInApiClient

async def main() -> None:
    client = AsyncPitchInApiClient(demo_user="YOUR_API_KEY", environment="production")
    await client.aclose()

run(main())
```

Alternatively, scope it — `async with AsyncPitchInApiClient(...) as client:` closes the pool on exit.