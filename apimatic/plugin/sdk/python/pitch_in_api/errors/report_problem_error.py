from __future__ import annotations

from dataclasses import dataclass
from typing import Final, TypeAlias

from ..core import ErrorMapper, RawError, decode_json
from ..models.error import Error

ReportProblemErrorBody: TypeAlias = Error | RawError


@dataclass(frozen=True, slots=True)
class _ReportProblemError:
    def map(self, status_code: int, content: bytes) -> ReportProblemErrorBody:
        match status_code:
            case 400 | 409:
                return decode_json[Error](content)
            case _:
                return RawError(status_code, content)


report_problem_error_mapper: Final[ErrorMapper[ReportProblemErrorBody]] = _ReportProblemError()
