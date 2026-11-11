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
from ..errors.add_photo_error import AddPhotoErrorBody, add_photo_error_mapper
from ..errors.neighbour_confirm_error import NeighbourConfirmErrorBody, neighbour_confirm_error_mapper
from ..errors.object_to_release_error import ObjectToReleaseErrorBody, object_to_release_error_mapper
from ..errors.submit_proof_error import SubmitProofErrorBody, submit_proof_error_mapper
from ..errors.submit_recheck_error import SubmitRecheckErrorBody, submit_recheck_error_mapper
from ..errors.vote_error import VoteErrorBody, vote_error_mapper
from ..models.bounties_object_request import BountiesObjectRequest, BountiesObjectRequestDict
from ..models.bounties_photos_request import BountiesPhotosRequest, BountiesPhotosRequestDict
from ..models.bounties_vote_request import BountiesVoteRequest, BountiesVoteRequestDict
from ..models.photo import Photo, PhotoDict
from ..server.server import Server


class Proof:
    def __init__(self, client: RawClient, server: Server, auth: AuthSchemes) -> None:
        self._with_raw_response = ProofWithRawResponse(client, server, auth)

    def add_photo(
        self,
        id_: str,
        body: BountiesPhotosRequest | BountiesPhotosRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """Doer adds the before or after photo

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Stored (EXIF stripped)

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.add_photo(id_, body, request_options=request_options))

    def neighbour_confirm(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """A neighbour confirms a large bounty on the spot

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Confirmed

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.neighbour_confirm(id_, body, request_options=request_options))

    def object_to_release(
        self,
        id_: str,
        body: BountiesObjectRequest | BountiesObjectRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """A funder objects during the 24-hour window

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Sent to vote

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.object_to_release(id_, body, request_options=request_options))

    def submit_proof(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection
        window, ask a neighbour, or send it to the funders' vote

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Decision applied

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.submit_proof(id_, request_options=request_options))

    def submit_recheck(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """The "still fixed?" recheck; pays the held-back share if the fix held

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Recheck applied

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.submit_recheck(id_, body, request_options=request_options))

    def vote(
        self,
        id_: str,
        body: BountiesVoteRequest | BountiesVoteRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """Funder votes; weighted by amount pledged, a tie pays the doer

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Vote recorded

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(self._with_raw_response.vote(id_, body, request_options=request_options))

    @property
    def with_raw_response(self) -> ProofWithRawResponse:
        return self._with_raw_response


class AsyncProof:
    def __init__(self, client: AsyncRawClient, server: Server, auth: AsyncAuthSchemes) -> None:
        self._with_raw_response = AsyncProofWithRawResponse(client, server, auth)

    async def add_photo(
        self,
        id_: str,
        body: BountiesPhotosRequest | BountiesPhotosRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """Doer adds the before or after photo

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Stored (EXIF stripped)

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.add_photo(id_, body, request_options=request_options))

    async def neighbour_confirm(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """A neighbour confirms a large bounty on the spot

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Confirmed

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.neighbour_confirm(id_, body, request_options=request_options))

    async def object_to_release(
        self,
        id_: str,
        body: BountiesObjectRequest | BountiesObjectRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """A funder objects during the 24-hour window

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Sent to vote

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.object_to_release(id_, body, request_options=request_options))

    async def submit_proof(self, id_: str, *, request_options: RequestOptionsOrDict | None = None) -> Any:
        """Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection
        window, ask a neighbour, or send it to the funders' vote

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Decision applied

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.submit_proof(id_, request_options=request_options))

    async def submit_recheck(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> Any:
        """The "still fixed?" recheck; pays the held-back share if the fix held

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Recheck applied

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.submit_recheck(id_, body, request_options=request_options))

    async def vote(
        self,
        id_: str,
        body: BountiesVoteRequest | BountiesVoteRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> Any:
        """Funder votes; weighted by amount pledged, a tie pays the doer

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            Vote recorded

        Raises:
            ApiError: Refused by a rule; reasons say which Invalid input ``error`` is ``Error | RawError``."""
        return unwrap(await self._with_raw_response.vote(id_, body, request_options=request_options))

    @property
    def with_raw_response(self) -> AsyncProofWithRawResponse:
        return self._with_raw_response


class ProofWithRawResponse(SecuredRawResponse[RawClient, Server, AuthSchemes]):
    def add_photo(
        self,
        id_: str,
        body: BountiesPhotosRequest | BountiesPhotosRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, AddPhotoErrorBody]:
        """Doer adds the before or after photo

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/photos"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesPhotosRequest | BountiesPhotosRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=add_photo_error_mapper,
            request_options=request_options,
        )

    def neighbour_confirm(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, NeighbourConfirmErrorBody]:
        """A neighbour confirms a large bounty on the spot

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/confirm"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[Photo | PhotoDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=neighbour_confirm_error_mapper,
            request_options=request_options,
        )

    def object_to_release(
        self,
        id_: str,
        body: BountiesObjectRequest | BountiesObjectRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, ObjectToReleaseErrorBody]:
        """A funder objects during the 24-hour window

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/object"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesObjectRequest | BountiesObjectRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=object_to_release_error_mapper,
            request_options=request_options,
        )

    def submit_proof(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, SubmitProofErrorBody]:
        """Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection
        window, ask a neighbour, or send it to the funders' vote

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/proof"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=submit_proof_error_mapper,
            request_options=request_options,
        )

    def submit_recheck(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, SubmitRecheckErrorBody]:
        """The "still fixed?" recheck; pays the held-back share if the fix held

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/recheck"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[Photo | PhotoDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=submit_recheck_error_mapper,
            request_options=request_options,
        )

    def vote(
        self,
        id_: str,
        body: BountiesVoteRequest | BountiesVoteRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, VoteErrorBody]:
        """Funder votes; weighted by amount pledged, a tie pays the doer

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/vote"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesVoteRequest | BountiesVoteRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=json_decoder[Any],
            error_mapper=vote_error_mapper,
            request_options=request_options,
        )


class AsyncProofWithRawResponse(SecuredRawResponse[AsyncRawClient, Server, AsyncAuthSchemes]):
    async def add_photo(
        self,
        id_: str,
        body: BountiesPhotosRequest | BountiesPhotosRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, AddPhotoErrorBody]:
        """Doer adds the before or after photo

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/photos"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesPhotosRequest | BountiesPhotosRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=add_photo_error_mapper,
            request_options=request_options,
        )

    async def neighbour_confirm(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, NeighbourConfirmErrorBody]:
        """A neighbour confirms a large bounty on the spot

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/confirm"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[Photo | PhotoDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=neighbour_confirm_error_mapper,
            request_options=request_options,
        )

    async def object_to_release(
        self,
        id_: str,
        body: BountiesObjectRequest | BountiesObjectRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, ObjectToReleaseErrorBody]:
        """A funder objects during the 24-hour window

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/object"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesObjectRequest | BountiesObjectRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=object_to_release_error_mapper,
            request_options=request_options,
        )

    async def submit_proof(
        self, id_: str, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, SubmitProofErrorBody]:
        """Submit proof; AI check plus fraud checks, then the rules capture pledges and pay out, open an objection
        window, ask a neighbour, or send it to the funders' vote

        Args:
            id_: Bounty id
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/proof"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=submit_proof_error_mapper,
            request_options=request_options,
        )

    async def submit_recheck(
        self, id_: str, body: Photo | PhotoDict, *, request_options: RequestOptionsOrDict | None = None
    ) -> ApiResult[Any, SubmitRecheckErrorBody]:
        """The "still fixed?" recheck; pays the held-back share if the fix held

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/recheck"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[Photo | PhotoDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=submit_recheck_error_mapper,
            request_options=request_options,
        )

    async def vote(
        self,
        id_: str,
        body: BountiesVoteRequest | BountiesVoteRequestDict,
        *,
        request_options: RequestOptionsOrDict | None = None,
    ) -> ApiResult[Any, VoteErrorBody]:
        """Funder votes; weighted by amount pledged, a tie pays the doer

        Args:
            id_: Bounty id
            body: The request body.
            request_options: Per-call overrides for this one request, such as a timeout, extra headers, or its retry
                count and statuses.

        Returns:
            An ``ApiResult`` holding the deserialized response or the error body."""
        return await self._client.execute(
            http_method="POST",
            url_template=self._server.default("/bounties/{id}/vote"),
            path_params=[param[str]("id", id_)],
            headers=[param[UUID]("Idempotency-Key", uuid4())],
            body=json_body[BountiesVoteRequest | BountiesVoteRequestDict](body),
            auth_scheme=self._auth.demo_user,
            decoder=async_json_decoder[Any],
            error_mapper=vote_error_mapper,
            request_options=request_options,
        )
