from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

ReconcileWithPayPalErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _ReconcileWithPayPalError:
    def map(self, status_code: int, content: bytes) -> ReconcileWithPayPalErrorBody:
        match status_code:
            case 400 | 409:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


reconcile_with_pay_pal_error_mapper: Final[ErrorMapper[ReconcileWithPayPalErrorBody]] = _ReconcileWithPayPalError()
