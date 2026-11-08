from __future__ import annotations

from uuid import UUID, uuid4

from ..auth import AsyncAuthSchemes, AuthSchemes
from ..core import (
    ApiResult,
    AsyncRawClient,
    RawClient,
    RequestOptionsOrDict,
    SecuredRawResponse,
    async_json_decoder,
    json_body,
    json_decoder,
    param,
    unwrap,
)
from ..errors.confirm_pledge_error import ConfirmPledgeErrorBody, confirm_pledge_error_mapper
from ..errors.start_pledge_error import StartPledgeErrorBody, start_pledge_error_mapper
from ..models.bounties_pledges_request import BountiesPledgesRequest, BountiesPledgesRequestDict
from ..models.bounties_pledges_response import BountiesPledgesResponse
from ..models.pledge import Pledge
from ..server.server import Server


class Pledges:
    def __init__(self, client: RawClient, server: Server, auth: AuthSchemes) -> None:
        self._with_raw_response = PledgesWithRawResponse(client, server, auth)

    def confirm_pledge(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Pledge:
        """After PayPal approval, authorize the order (money held, not charged)

        Args:
            id_: Pledge id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Authorized

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.confirm_pledge(id_, request_options=request_options))

    def start_pledge(
        self,
        id_: str,
        body: BountiesPledgesRequest | BountiesPledgesRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> BountiesPledgesResponse:
        """Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Order created

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.start_pledge(id_, body, request_options=request_options))

    @property
    def with_raw_response(self) -> PledgesWithRawResponse:
        return self._with_raw_response


class AsyncPledges:
    def __init__(self, client: AsyncRawClient, server: Server, auth: AsyncAuthSchemes) -> None:
        self._with_raw_response = AsyncPledgesWithRawResponse(client, server, auth)

    async def confirm_pledge(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Pledge:
        """After PayPal approval, authorize the order (money held, not charged)

        Args:
            id_: Pledge id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Authorized

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.confirm_pledge(id_, request_options=request_options))

    async def start_pledge(
        self,
        id_: str,
        body: BountiesPledgesRequest | BountiesPledgesRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> BountiesPledgesResponse:
        """Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Order created

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.start_pledge(id_, body, request_options=request_options))

    @property
    def with_raw_response(self) -> AsyncPledgesWithRawResponse:
        return self._with_raw_response


class PledgesWithRawResponse(SecuredRawResponse[RawClient, Server, AuthSchemes]):
    def confirm_pledge(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Pledge, ConfirmPledgeErrorBody]:
        """After PayPal approval, authorize the order (money held, not charged)

        Args:
            id_: Pledge id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/pledges/{id}/confirm"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Pledge],
            error_mapper=confirm_pledge_error_mapper,
            request_options=request_options,
        )

    def start_pledge(
        self,
        id_: str,
        body: BountiesPledgesRequest | BountiesPledgesRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[BountiesPledgesResponse, StartPledgeErrorBody]:
        """Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/pledges"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesPledgesRequest | BountiesPledgesRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[BountiesPledgesResponse],
            error_mapper=start_pledge_error_mapper,
            request_options=request_options,
        )


class AsyncPledgesWithRawResponse(SecuredRawResponse[AsyncRawClient, Server, AsyncAuthSchemes]):
    async def confirm_pledge(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Pledge, ConfirmPledgeErrorBody]:
        """After PayPal approval, authorize the order (money held, not charged)

        Args:
            id_: Pledge id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/pledges/{id}/confirm"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Pledge],
            error_mapper=confirm_pledge_error_mapper,
            request_options=request_options,
        )

    async def start_pledge(
        self,
        id_: str,
        body: BountiesPledgesRequest | BountiesPledgesRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[BountiesPledgesResponse, StartPledgeErrorBody]:
        """Start a pledge; creates a PayPal order with intent AUTHORIZE for the buyer to approve

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/pledges"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesPledgesRequest | BountiesPledgesRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[BountiesPledgesResponse],
            error_mapper=start_pledge_error_mapper,
            request_options=request_options,
        )
