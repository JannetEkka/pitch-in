from __future__ import annotations

from typing import Any

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, OptionalNullable, RFC3339DateTime, SdkBaseModel


class LedgerEntry(SdkBaseModel):
    """One receipt in the hash-chained log"""

    seq: Optional[int] = UNSET
    """Position in the receipt chain"""

    at: Optional[RFC3339DateTime] = UNSET
    """When it happened"""

    bounty_id: OptionalNullable[str] = UNSET
    """Bounty this belongs to"""

    event: Optional[str] = UNSET
    """What happened"""

    data: Optional[Any] = UNSET
    """Details of the event"""

    prev_hash: Optional[str] = UNSET
    """Hash of the previous receipt"""

    hash: Optional[str] = UNSET
    """SHA-256 over this receipt and the previous hash"""


class LedgerEntryDict(TypedDict):
    seq: NotRequired[int]
    at: NotRequired[RFC3339DateTime]
    bounty_id: NotRequired[str | None]
    event: NotRequired[str]
    data: NotRequired[Any]
    prev_hash: NotRequired[str]
    hash: NotRequired[str]
