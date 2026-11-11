from __future__ import annotations

from typing_extensions import TypedDict

from ..core import SdkBaseModel


class SessionRequest(SdkBaseModel):
    """Request body"""

    user_id: str
    """Id of a sample neighbour"""


class SessionRequestDict(TypedDict):
    user_id: str
