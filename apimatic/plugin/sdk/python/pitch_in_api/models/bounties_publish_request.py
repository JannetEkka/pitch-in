from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, SdkBaseModel


class BountiesPublishRequest(SdkBaseModel):
    """Request body"""

    goal_cents: Optional[int] = UNSET
    """Funding goal, in cents"""


class BountiesPublishRequestDict(TypedDict):
    goal_cents: NotRequired[int]
