from __future__ import annotations

from functools import cached_property
from types import TracebackType

from typing_extensions import Self

from .apis.bounties import Bounties
from .apis.pledges import Pledges
from .apis.proof import Proof
from .apis.receipts import Receipts
from .apis.session import Session
from .apis.support import Support
from .auth import AuthSchemes
from .base_client import DEFAULT_TIMEOUT, BasePitchInApiClient
from .core import (
    OPERATING_SYSTEM,
    PYTHON_RUNTIME,
    ApiKeyHeaderScheme,
    HttpClient,
    Httpx2Client,
    LoggingOptionsOrDict,
    RawClient,
    RetryOptionsOrDict,
    no_auth,
    param,
)
from .server.environment import Environment


class PitchInApiClient(BasePitchInApiClient[RawClient]):
    def __init__(
        self,
        *,
        environment: Environment = "production",
        base_url: str | None = None,
        timeout: float = DEFAULT_TIMEOUT,
        retry_options: int | RetryOptionsOrDict | None = None,
        logging_options: LoggingOptionsOrDict | None = None,
        custom_http_client: HttpClient | None = None,
        demo_user: str | None = None,
    ) -> None:
        super().__init__(
            environment=environment,
            base_url=base_url,
            timeout=timeout,
            retry_options=retry_options,
            logging_options=logging_options,
        )
        self._raw_client = RawClient(
            http_client=custom_http_client if custom_http_client is not None else Httpx2Client(timeout=timeout),
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
        self._auth = AuthSchemes(
            demo_user=ApiKeyHeaderScheme("X-Pitch-In-User", demo_user) if demo_user is not None else no_auth
        )

    @cached_property
    def bounties(self) -> Bounties:
        return Bounties(self._raw_client, self._server, self._auth)

    @cached_property
    def pledges(self) -> Pledges:
        return Pledges(self._raw_client, self._server, self._auth)

    @cached_property
    def proof(self) -> Proof:
        return Proof(self._raw_client, self._server, self._auth)

    @cached_property
    def receipts(self) -> Receipts:
        return Receipts(self._raw_client, self._server)

    @cached_property
    def session(self) -> Session:
        return Session(self._raw_client, self._server)

    @cached_property
    def support(self) -> Support:
        return Support(self._raw_client, self._server, self._auth)

    def close(self) -> None:
        self._raw_client.http_client.close()

    def __enter__(self) -> Self:
        return self

    def __exit__(
        self, exc_type: type[BaseException] | None, exc: BaseException | None, exc_tb: TracebackType | None
    ) -> None:
        self.close()


Client = PitchInApiClient
