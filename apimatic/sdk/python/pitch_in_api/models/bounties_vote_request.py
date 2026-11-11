from __future__ import annotations

from typing_extensions import TypedDict

from ..core import SdkBaseModel
from .enums.choice import ChoiceOrStr


class BountiesVoteRequest(SdkBaseModel):
    """Request body"""

    choice: ChoiceOrStr
    """pay or refund"""


class BountiesVoteRequestDict(TypedDict):
    choice: ChoiceOrStr
