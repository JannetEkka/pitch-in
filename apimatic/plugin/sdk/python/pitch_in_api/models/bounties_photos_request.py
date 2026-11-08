from __future__ import annotations

from typing_extensions import TypedDict

from ..core import SdkBaseModel
from .enums.kind import KindOrStr


class BountiesPhotosRequest(SdkBaseModel):
    """Request body"""

    image: str
    """data:image/jpeg;base64,..."""

    lat: float | None
    """Latitude of the spot"""

    lng: float | None
    """Longitude of the spot"""

    accuracy: float | None
    """Location accuracy in metres"""

    live_capture: bool
    """Taken with the in-app camera"""

    kind: KindOrStr
    """Kind of case or photo"""


class BountiesPhotosRequestDict(TypedDict):
    image: str
    lat: float | None
    lng: float | None
    accuracy: float | None
    live_capture: bool
    kind: KindOrStr
