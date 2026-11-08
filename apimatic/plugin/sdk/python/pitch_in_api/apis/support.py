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
from ..errors.investigate_case_error import InvestigateCaseErrorBody, investigate_case_error_mapper
from ..errors.list_cases_error import ListCasesErrorBody, list_cases_error_mapper
from ..errors.open_case_error import OpenCaseErrorBody, open_case_error_mapper
from ..errors.reconcile_with_pay_pal_error import ReconcileWithPayPalErrorBody, reconcile_with_pay_pal_error_mapper
from ..models.cases_request import CasesRequest, CasesRequestDict
from ..server.server import Server


class Support:
    def __init__(self, client: RawClient, server: Server, auth: AuthSchemes) -> None:
        self._with_raw_response = SupportWithRawResponse(client, server, auth)

    def investigate_case(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step

        Args:
            id_: Case id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Finding

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.investigate_case(id_, request_options=request_options))

    def list_cases(self, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Support cases

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Cases

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.list_cases(request_options=request_options))

    def open_case(
        self, body: CasesRequest | CasesRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """Open a support case

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Opened

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.open_case(body, request_options=request_options))

    def reconcile_with_pay_pal(self, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Compare our records with PayPal's; open a case per mismatch

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Mismatches

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.reconcile_with_pay_pal(request_options=request_options))

    @property
    def with_raw_response(self) -> SupportWithRawResponse:
        return self._with_raw_response


class AsyncSupport:
    def __init__(self, client: AsyncRawClient, server: Server, auth: AsyncAuthSchemes) -> None:
        self._with_raw_response = AsyncSupportWithRawResponse(client, server, auth)

    async def investigate_case(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step

        Args:
            id_: Case id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Finding

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.investigate_case(id_, request_options=request_options))

    async def list_cases(self, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Support cases

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Cases

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.list_cases(request_options=request_options))

    async def open_case(
        self, body: CasesRequest | CasesRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """Open a support case

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Opened

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.open_case(body, request_options=request_options))

    async def reconcile_with_pay_pal(self, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Compare our records with PayPal's; open a case per mismatch

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Mismatches

        Raises:
            ApiError: Invalid input Refused by a rule; reasons say which ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.reconcile_with_pay_pal(request_options=request_options))

    @property
    def with_raw_response(self) -> AsyncSupportWithRawResponse:
        return self._with_raw_response


class SupportWithRawResponse(SecuredRawResponse[RawClient, Server, AuthSchemes]):
    def investigate_case(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, InvestigateCaseErrorBody]:
        """AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step

        Args:
            id_: Case id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/cases/{id}/investigate"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=investigate_case_error_mapper,
            request_options=request_options,
        )

    def list_cases(self, *, request_options: RequestOptionsOrDict | None = None) -> ApiResult[Any, ListCasesErrorBody]:
        """Support cases

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="GET",
            url_template=self._server.default("/cases"),
            decoder=json_decoder[Any],
            error_mapper=list_cases_error_mapper,
            request_options=request_options,
        )

    def open_case(
        self, body: CasesRequest | CasesRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, OpenCaseErrorBody]:
        """Open a support case

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/cases"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[CasesRequest | CasesRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=open_case_error_mapper,
            request_options=request_options,
        )

    def reconcile_with_pay_pal(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, ReconcileWithPayPalErrorBody]:
        """Compare our records with PayPal's; open a case per mismatch

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/reconcile"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=reconcile_with_pay_pal_error_mapper,
            request_options=request_options,
        )


class AsyncSupportWithRawResponse(SecuredRawResponse[AsyncRawClient, Server, AsyncAuthSchemes]):
    async def investigate_case(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, InvestigateCaseErrorBody]:
        """AI investigates with the PayPal Agent Toolkit (read-only) and proposes a next step

        Args:
            id_: Case id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/cases/{id}/investigate"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=investigate_case_error_mapper,
            request_options=request_options,
        )

    async def list_cases(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, ListCasesErrorBody]:
        """Support cases

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="GET",
            url_template=self._server.default("/cases"),
            decoder=async_json_decoder[Any],
            error_mapper=list_cases_error_mapper,
            request_options=request_options,
        )

    async def open_case(
        self, body: CasesRequest | CasesRequestDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, OpenCaseErrorBody]:
        """Open a support case

        Args:
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/cases"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[CasesRequest | CasesRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=open_case_error_mapper,
            request_options=request_options,
        )

    async def reconcile_with_pay_pal(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, ReconcileWithPayPalErrorBody]:
        """Compare our records with PayPal's; open a case per mismatch

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/reconcile"),
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=reconcile_with_pay_pal_error_mapper,
            request_options=request_options,
        )
