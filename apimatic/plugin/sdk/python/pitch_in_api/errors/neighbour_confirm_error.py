from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

NeighbourConfirmErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _NeighbourConfirmError:
    def map(self, status_code: int, content: bytes) -> NeighbourConfirmErrorBody:
        match status_code:
            case 400 | 409:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


neighbour_confirm_error_mapper: Final[ErrorMapper[NeighbourConfirmErrorBody]] = _NeighbourConfirmError()
