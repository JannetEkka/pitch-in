from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

SignInErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _SignInError:
    def map(self, status_code: int, content: bytes) -> SignInErrorBody:
        match status_code:
            case 400 | 409:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


sign_in_error_mapper: Final[ErrorMapper[SignInErrorBody]] = _SignInError()
