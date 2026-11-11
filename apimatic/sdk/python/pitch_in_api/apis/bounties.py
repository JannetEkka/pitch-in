from __future__ import annotations

from typing import Any
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
from ..errors.claim_bounty_error import ClaimBountyErrorBody, claim_bounty_error_mapper
from ..errors.get_area_health_error import GetAreaHealthErrorBody, get_area_health_error_mapper
from ..errors.get_bounty_error import GetBountyErrorBody, get_bounty_error_mapper
from ..errors.list_bounties_error import ListBountiesErrorBody, list_bounties_error_mapper
from ..errors.publish_bounty_error import PublishBountyErrorBody, publish_bounty_error_mapper
from ..errors.report_problem_error import ReportProblemErrorBody, report_problem_error_mapper
from ..models.bounties_publish_request import BountiesPublishRequest, BountiesPublishRequestDict
from ..models.bounty import Bounty
from ..models.reports_request import ReportsRequest, ReportsRequestDict
from ..server.server import Server


class Bounties:
    def __init__(self, client: RawClient, server: Server, auth: AuthSchemes) -> None:
        self._with_raw_response = BountiesWithRawResponse(client, server, auth)

    def claim_bounty(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Claimed

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.claim_bounty(id_, request_options=request_options))

    def get_area_health(self, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Area health (measured, plus labelled sample trends)

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Areas

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.get_area_health(request_options=request_options))

    def get_bounty(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """A bounty with its pledges, payouts, photos, AI checks and receipts

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Bounty detail

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.get_bounty(id_, request_options=request_options))

    def list_bounties(self, *, request_options: RequestOptionsOrDict | None = None) -> list[Bounty]:
        """List bounties with money totals

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Bounties

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.list_bounties(request_options=request_options))

    def publish_bounty(
        self,
        id_: str,
        *,
        body: BountiesPublishRequest | BountiesPublishRequestDict | None = None,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """Publish a draft; the goal can't go below the fair-price floor

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Published

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.publish_bounty(id_, body=body, request_options=request_options))

    def report_problem(
        self, body: ReportsRequest | ReportsRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Bounty:
        """Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Draft bounty

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.report_problem(body, request_options=request_options))

    @property
    def with_raw_response(self) -> BountiesWithRawResponse:
        return self._with_raw_response


class AsyncBounties:
    def __init__(self, client: AsyncRawClient, server: Server, auth: AsyncAuthSchemes) -> None:
        self._with_raw_response = AsyncBountiesWithRawResponse(client, server, auth)

    async def claim_bounty(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Claimed

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.claim_bounty(id_, request_options=request_options))

    async def get_area_health(self, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Area health (measured, plus labelled sample trends)

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Areas

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.get_area_health(request_options=request_options))

    async def get_bounty(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """A bounty with its pledges, payouts, photos, AI checks and receipts

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Bounty detail

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.get_bounty(id_, request_options=request_options))

    async def list_bounties(self, *, request_options: RequestOptionsOrDict | None = None) -> list[Bounty]:
        """List bounties with money totals

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Bounties

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.list_bounties(request_options=request_options))

    async def publish_bounty(
        self,
        id_: str,
        *,
        body: BountiesPublishRequest | BountiesPublishRequestDict | None = None,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """Publish a draft; the goal can't go below the fair-price floor

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Published

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.publish_bounty(id_, body=body, request_options=request_options))

    async def report_problem(
        self, body: ReportsRequest | ReportsRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Bounty:
        """Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Draft bounty

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.report_problem(body, request_options=request_options))

    @property
    def with_raw_response(self) -> AsyncBountiesWithRawResponse:
        return self._with_raw_response


class BountiesWithRawResponse(SecuredRawResponse[RawClient, Server, AuthSchemes]):
    def claim_bounty(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, ClaimBountyErrorBody]:
        """Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/claim"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=claim_bounty_error_mapper,
            request_options=request_options,
        )

    def get_area_health(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, GetAreaHealthErrorBody]:
        """Area health (measured, plus labelled sample trends)

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="GET",
            url_template=self._server.default("/health/areas"),
            decoder=json_decoder[Any],
            error_mapper=get_area_health_error_mapper,
            request_options=request_options,
        )

    def get_bounty(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, GetBountyErrorBody]:
        """A bounty with its pledges, payouts, photos, AI checks and receipts

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="GET",
            url_template=self._server.default("/bounties/{id}"),
            path_params=[param[str]("id", id_)],
            decoder=json_decoder[Any],
            error_mapper=get_bounty_error_mapper,
            request_options=request_options,
        )

    def list_bounties(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[list[Bounty], ListBountiesErrorBody]:
        """List bounties with money totals

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="GET",
            url_template=self._server.default("/bounties"),
            decoder=json_decoder[list[Bounty]],
            error_mapper=list_bounties_error_mapper,
            request_options=request_options,
        )

    def publish_bounty(
        self,
        id_: str,
        *,
        body: BountiesPublishRequest | BountiesPublishRequestDict | None = None,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, PublishBountyErrorBody]:
        """Publish a draft; the goal can't go below the fair-price floor

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/publish"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesPublishRequest | BountiesPublishRequestDict | None](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=publish_bounty_error_mapper,
            request_options=request_options,
        )

    def report_problem(
        self, body: ReportsRequest | ReportsRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Bounty, ReportProblemErrorBody]:
        """Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/reports"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[ReportsRequest | ReportsRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Bounty],
            error_mapper=report_problem_error_mapper,
            request_options=request_options,
        )


class AsyncBountiesWithRawResponse(SecuredRawResponse[AsyncRawClient, Server, AsyncAuthSchemes]):
    async def claim_bounty(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, ClaimBountyErrorBody]:
        """Claim a funded bounty (not the reporter or a funder; holds must have 10+ days left)

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/claim"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=claim_bounty_error_mapper,
            request_options=request_options,
        )

    async def get_area_health(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, GetAreaHealthErrorBody]:
        """Area health (measured, plus labelled sample trends)

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="GET",
            url_template=self._server.default("/health/areas"),
            decoder=async_json_decoder[Any],
            error_mapper=get_area_health_error_mapper,
            request_options=request_options,
        )

    async def get_bounty(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, GetBountyErrorBody]:
        """A bounty with its pledges, payouts, photos, AI checks and receipts

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="GET",
            url_template=self._server.default("/bounties/{id}"),
            path_params=[param[str]("id", id_)],
            decoder=async_json_decoder[Any],
            error_mapper=get_bounty_error_mapper,
            request_options=request_options,
        )

    async def list_bounties(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[list[Bounty], ListBountiesErrorBody]:
        """List bounties with money totals

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="GET",
            url_template=self._server.default("/bounties"),
            decoder=async_json_decoder[list[Bounty]],
            error_mapper=list_bounties_error_mapper,
            request_options=request_options,
        )

    async def publish_bounty(
        self,
        id_: str,
        *,
        body: BountiesPublishRequest | BountiesPublishRequestDict | None = None,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, PublishBountyErrorBody]:
        """Publish a draft; the goal can't go below the fair-price floor

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/publish"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesPublishRequest | BountiesPublishRequestDict | None](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=publish_bounty_error_mapper,
            request_options=request_options,
        )

    async def report_problem(
        self, body: ReportsRequest | ReportsRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Bounty, ReportProblemErrorBody]:
        """Report a problem; the AI writes the bounty (checklist, estimate, hazard) and the rules price it

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/reports"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[ReportsRequest | ReportsRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Bounty],
            error_mapper=report_problem_error_mapper,
            request_options=request_options,
        )
