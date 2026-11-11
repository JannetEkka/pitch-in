from __future__ import annotations

from functools import cached_property
from types import TracebackType

from typing_extensions import Self

from .apis.bounties import AsyncBounties
from .apis.pledges import AsyncPledges
from .apis.proof import AsyncProof
from .apis.receipts import AsyncReceipts
from .apis.session import AsyncSession
from .apis.support import AsyncSupport
from .auth import AsyncAuthSchemes
from .base_client import DEFAULT_TIMEOUT, BasePitchInApiClient
from .core import (
    OPERATING_SYSTEM,
    PYTHON_RUNTIME,
    ApiKeyHeaderScheme,
    AsyncHttpClient,
    AsyncHttpx2Client,
    AsyncRawClient,
    LoggingOptionsOrDict,
    RetryOptionsOrDict,
    no_auth,
    param,
)
from .server.environment import Environment


class AsyncPitchInApiClient(BasePitchInApiClient[AsyncRawClient]):
    def __init__(
        self,
        *,
        environment: Environment = "production",
        base_url: str | None = None,
        timeout: float = DEFAULT_TIMEOUT,
        retry_options: int | RetryOptionsOrDict | None = None,
        logging_options: LoggingOptionsOrDict | None = None,
        custom_async_http_client: AsyncHttpClient | None = None,
        demo_user: str | None = None,
    ) -> None:
        super().__init__(
            environment=environment,
            base_url=base_url,
            timeout=timeout,
            retry_options=retry_options,
            logging_options=logging_options,
        )
        self._raw_client = AsyncRawClient(
            http_client=(
                custom_async_http_client if custom_async_http_client is not None else AsyncHttpx2Client(timeout=timeout)
            ),
            retry_options=self._retry_options,
            logging_options=self._logging_options,
            global_headers=[
                param[str]("User-Agent", "PitchInApiClient/0.1.0 Python"),
                param[str]("X-APIMatic-Lang", "Python"),
                param[str]("X-APIMatic-Package-Version", "0.1.0"),
                param[str]("X-APIMatic-Gen-Version", "4.0.0"),
                param[str]("X-APIMatic-OS", OPERATING_SYSTEM),
                param[str]("X-APIMatic-Runtime", PYTHON_RUNTIME),
            ],
        )
        self._auth = AsyncAuthSchemes(
            demo_user=ApiKeyHeaderScheme("X-Pitch-In-User", demo_user) if demo_user is not None else no_auth
        )

    @cached_property
    def bounties(self) -> AsyncBounties:
        return AsyncBounties(self._raw_client, self._server, self._auth)

    @cached_property
    def pledges(self) -> AsyncPledges:
        return AsyncPledges(self._raw_client, self._server, self._auth)

    @cached_property
    def proof(self) -> AsyncProof:
        return AsyncProof(self._raw_client, self._server, self._auth)

    @cached_property
    def receipts(self) -> AsyncReceipts:
        return AsyncReceipts(self._raw_client, self._server)

    @cached_property
    def session(self) -> AsyncSession:
        return AsyncSession(self._raw_client, self._server)

    @cached_property
    def support(self) -> AsyncSupport:
        return AsyncSupport(self._raw_client, self._server, self._auth)

    async def aclose(self) -> None:
        await self._raw_client.http_client.aclose()

    async def __aenter__(self) -> Self:
        return self

    async def __aexit__(
        self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: TracebackType | None
    ) -> None:
        await self.aclose()


AsyncClient = AsyncPitchInApiClient
