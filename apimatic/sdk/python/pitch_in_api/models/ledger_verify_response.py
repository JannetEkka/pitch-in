from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, OptionalNullable, SdkBaseModel


class LedgerVerifyResponse(SdkBaseModel):
    """Result"""

    ok: Optional[bool] = UNSET
    """True if the chain is intact"""

    count: Optional[int] = UNSET
    """Receipts checked"""

    broken_at: OptionalNullable[int] = UNSET
    """First receipt that fails, if any"""

    head: Optional[str] = UNSET
    """Hash of the latest receipt"""


class LedgerVerifyResponseDict(TypedDict):
    ok: NotRequired[bool]
    count: NotRequired[int]
    broken_at: NotRequired[int | None]
    head: NotRequired[str]
