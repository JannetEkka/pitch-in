from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, SdkBaseModel


class BountiesPledgesRequest(SdkBaseModel):
    """Request body"""

    amount_cents: int
    """Amount in US cents"""

    renew_of: Optional[str] = UNSET
    """Pledge this one replaces"""


class BountiesPledgesRequestDict(TypedDict):
    amount_cents: int
    renew_of: NotRequired[str]
