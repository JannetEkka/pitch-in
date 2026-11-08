from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

SubmitRecheckErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _SubmitRecheckError:
    def map(self, status_code: int, content: bytes) -> SubmitRecheckErrorBody:
        match status_code:
            case 400 | 409:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


submit_recheck_error_mapper: Final[ErrorMapper[SubmitRecheckErrorBody]] = _SubmitRecheckError()
