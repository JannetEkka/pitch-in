from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, OptionalNullable, RFC3339DateTime, SdkBaseModel
from .enums.status1 import Status1OrStr


class Pledge(SdkBaseModel):
    """A funder's PayPal hold toward a bounty"""

    id: Optional[str] = UNSET
    """Unique id"""

    bounty_id: Optional[str] = UNSET
    """Bounty this belongs to"""

    funder_id: Optional[str] = UNSET
    """Neighbour who pledged"""

    amount_cents: Optional[int] = UNSET
    """Amount in US cents"""

    order_id: Optional[str] = UNSET
    """PayPal order id (intent AUTHORIZE)"""

    authorization_id: OptionalNullable[str] = UNSET
    """PayPal authorization id"""

    auth_expires_at: OptionalNullable[RFC3339DateTime] = UNSET
    """When the PayPal hold expires"""

    status: Optional[Status1OrStr] = UNSET
    """Where the bounty or pledge is in its lifecycle"""

    captured_cents: Optional[int] = UNSET
    """Amount PayPal captured, in cents"""

    capture_id: OptionalNullable[str] = UNSET
    """PayPal capture id"""


class PledgeDict(TypedDict):
    id: NotRequired[str]
    bounty_id: NotRequired[str]
    funder_id: NotRequired[str]
    amount_cents: NotRequired[int]
    order_id: NotRequired[str]
    authorization_id: NotRequired[str | None]
    auth_expires_at: NotRequired[RFC3339DateTime | None]
    status: NotRequired[Status1OrStr]
    captured_cents: NotRequired[int]
    capture_id: NotRequired[str | None]
