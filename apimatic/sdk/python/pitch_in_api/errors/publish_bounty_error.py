from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

PublishBountyErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _PublishBountyError:
    def map(self, status_code: int, content: bytes) -> PublishBountyErrorBody:
        match status_code:
            case 400 | 409:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


publish_bounty_error_mapper: Final[ErrorMapper[PublishBountyErrorBody]] = _PublishBountyError()
