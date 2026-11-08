from __future__ import annotations

from typing_extensions import TypedDict

from ..core import SdkBaseModel


class BountiesObjectRequest(SdkBaseModel):
    """Request body"""

    reason: str
    """Why"""


class BountiesObjectRequestDict(TypedDict):
    reason: str
