from __future__ import annotations

from typing_extensions import TypedDict

from ..core import SdkBaseModel


class ChecklistItem(SdkBaseModel):
    """One thing the after photo must show"""

    id: str
    """Unique id"""

    text: str
    """What the after photo must show"""


class ChecklistItemDict(TypedDict):
    id: str
    text: str
