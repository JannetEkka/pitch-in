from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

GetAreaHealthErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _GetAreaHealthError:
    def map(self, status_code: int, content: bytes) -> GetAreaHealthErrorBody:
        match status_code:
            case 400:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


get_area_health_error_mapper: Final[ErrorMapper[GetAreaHealthErrorBody]] = _GetAreaHealthError()
