from __future__ import annotations

from ..core import (
    ApiResult,
    AsyncRawClient,
    BaseRawResponse,
    RawClient,
    RequestOptionsOrDict,
    async_json_decoder,
    json_decoder,
    unwrap,
)
from ..errors.list_receipts_error import ListReceiptsErrorBody, list_receipts_error_mapper
from ..errors.verify_receipts_error import VerifyReceiptsErrorBody, verify_receipts_error_mapper
from ..models.ledger_entry import LedgerEntry
from ..models.ledger_verify_response import LedgerVerifyResponse
from ..server.server import Server


class Receipts:
    def __init__(self, client: RawClient, server: Server) -> None:
        self._with_raw_response = ReceiptsWithRawResponse(client, server)

    def list_receipts(self, *, request_options: RequestOptionsOrDict | None = None) -> list[LedgerEntry]:
        """Every receipt, hash-chained

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Receipts

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.list_receipts(request_options=request_options))

    def verify_receipts(self, *, request_options: RequestOptionsOrDict | None = None) -> LedgerVerifyResponse:
        """Re-check the whole hash chain

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Result

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.verify_receipts(request_options=request_options))

    @property
    def with_raw_response(self) -> ReceiptsWithRawResponse:
        return self._with_raw_response


class AsyncReceipts:
    def __init__(self, client: AsyncRawClient, server: Server) -> None:
        self._with_raw_response = AsyncReceiptsWithRawResponse(client, server)

    async def list_receipts(self, *, request_options: RequestOptionsOrDict | None = None) -> list[LedgerEntry]:
        """Every receipt, hash-chained

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Receipts

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.list_receipts(request_options=request_options))

    async def verify_receipts(self, *, request_options: RequestOptionsOrDict | None = None) -> LedgerVerifyResponse:
        """Re-check the whole hash chain

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Result

        Raises:
            ApiError: Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.verify_receipts(request_options=request_options))

    @property
    def with_raw_response(self) -> AsyncReceiptsWithRawResponse:
        return self._with_raw_response


class ReceiptsWithRawResponse(BaseRawResponse[RawClient, Server]):
    def list_receipts(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[list[LedgerEntry], ListReceiptsErrorBody]:
        """Every receipt, hash-chained

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="GET",
            url_template=self._server.default("/ledger"),
            decoder=json_decoder[list[LedgerEntry]],
            error_mapper=list_receipts_error_mapper,
            request_options=request_options,
        )

    def verify_receipts(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[LedgerVerifyResponse, VerifyReceiptsErrorBody]:
        """Re-check the whole hash chain

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="GET",
            url_template=self._server.default("/ledger/verify"),
            decoder=json_decoder[LedgerVerifyResponse],
            error_mapper=verify_receipts_error_mapper,
            request_options=request_options,
        )


class AsyncReceiptsWithRawResponse(BaseRawResponse[AsyncRawClient, Server]):
    async def list_receipts(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[list[LedgerEntry], ListReceiptsErrorBody]:
        """Every receipt, hash-chained

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="GET",
            url_template=self._server.default("/ledger"),
            decoder=async_json_decoder[list[LedgerEntry]],
            error_mapper=list_receipts_error_mapper,
            request_options=request_options,
        )

    async def verify_receipts(
        self, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[LedgerVerifyResponse, VerifyReceiptsErrorBody]:
        """Re-check the whole hash chain

        Args:
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="GET",
            url_template=self._server.default("/ledger/verify"),
            decoder=async_json_decoder[LedgerVerifyResponse],
            error_mapper=verify_receipts_error_mapper,
            request_options=request_options,
        )
