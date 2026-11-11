from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

ClaimBountyErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _ClaimBountyError:
    def map(self, status_code: int, content: bytes) -> ClaimBountyErrorBody:
        match status_code:
            case 400 | 409:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


claim_bounty_error_mapper: Final[ErrorMapper[ClaimBountyErrorBody]] = _ClaimBountyError()
