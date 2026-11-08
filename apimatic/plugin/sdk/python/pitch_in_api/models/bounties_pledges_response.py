from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, SdkBaseModel


class BountiesPledgesResponse(SdkBaseModel):
    """Order created"""

    pledge_id: Optional[str] = UNSET
    """Pitch In pledge id"""

    order_id: Optional[str] = UNSET
    """PayPal order id"""


class BountiesPledgesResponseDict(TypedDict):
    pledge_id: NotRequired[str]
    order_id: NotRequired[str]
