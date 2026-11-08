from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, SdkBaseModel


class ErrorError(SdkBaseModel):
    """Error returned when a request is refused or invalid"""

    error: Optional[str] = UNSET
    """What went wrong"""

    reasons: Optional[list[str]] = UNSET
    """Each rule that refused the request"""


class ErrorErrorDict(TypedDict):
    error: NotRequired[str]
    reasons: NotRequired[list[str]]
