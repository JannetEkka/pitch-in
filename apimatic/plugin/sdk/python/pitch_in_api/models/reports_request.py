from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, SdkBaseModel
from .photo import Photo, PhotoDict


class ReportsRequest(SdkBaseModel):
    """Request body"""

    text: str
    """Plain-language text"""

    area: str
    """Neighbourhood name"""

    lat: float
    """Latitude of the spot"""

    lng: float
    """Longitude of the spot"""

    photo: Optional[Photo] = UNSET
    """A photo with the place and time it was taken"""


class ReportsRequestDict(TypedDict):
    text: str
    area: str
    lat: float
    lng: float
    photo: NotRequired[PhotoDict]
