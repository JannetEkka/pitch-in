from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, OptionalNullable, SdkBaseModel


class CasesRequest(SdkBaseModel):
    """Request body"""

    bounty_id: OptionalNullable[str] = UNSET
    """Bounty this belongs to"""

    kind: str
    """Kind of case or photo"""

    body: str
    """What happened, in your words"""


class CasesRequestDict(TypedDict):
    bounty_id: NotRequired[str | None]
    kind: str
    body: str
