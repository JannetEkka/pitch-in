from __future__ import annotations

from typing import Any
from uuid import UUID, uuid4

from ..core import (
    ApiResult,
    AsyncRawClient,
    BaseRawResponse,
    RawClient,
    RequestOptionsOrDict,
    async_json_decoder,
    json_body,
    json_decoder,
    param,
    unwrap,
)
from ..errors.sign_in_error import SignInErrorBody, sign_in_error_mapper
from ..models.session_request import SessionRequest, SessionRequestDict
from ..server.server import Server


class Session:
    def __init__(self, client: RawClient, server: Server) -> None:
        self._with_raw_response = SessionWithRawResponse(client, server)

    def sign_in(
        self, body: SessionRequest | SessionRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """Sign in as a demo neighbour

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Signed in

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.sign_in(body, request_options=request_options))

    @property
    def with_raw_response(self) -> SessionWithRawResponse:
        return self._with_raw_response


class AsyncSession:
    def __init__(self, client: AsyncRawClient, server: Server) -> None:
        self._with_raw_response = AsyncSessionWithRawResponse(client, server)

    async def sign_in(
        self, body: SessionRequest | SessionRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """Sign in as a demo neighbour

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Signed in

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.sign_in(body, request_options=request_options))

    @property
    def with_raw_response(self) -> AsyncSessionWithRawResponse:
        return self._with_raw_response


class SessionWithRawResponse(BaseRawResponse[RawClient, Server]):
    def sign_in(
        self, body: SessionRequest | SessionRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, SignInErrorBody]:
        """Sign in as a demo neighbour

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/session"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[SessionRequest | SessionRequestDict](body),
            decoder=json_decoder[Any],
            error_mapper=sign_in_error_mapper,
            request_options=request_options,
        )


class AsyncSessionWithRawResponse(BaseRawResponse[AsyncRawClient, Server]):
    async def sign_in(
        self, body: SessionRequest | SessionRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, SignInErrorBody]:
        """Sign in as a demo neighbour

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/session"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[SessionRequest | SessionRequestDict](body),
            decoder=async_json_decoder[Any],
            error_mapper=sign_in_error_mapper,
            request_options=request_options,
        )
