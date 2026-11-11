from enum import Enum
from typing import Annotated, TypeAlias

from ...core import open_enum_validator


class Status(str, Enum):
    """Where the bounty or pledge is in its lifecycle"""

    DRAFT = "draft"
    FUNDING = "funding"
    FUNDED = "funded"
    CLAIMED = "claimed"
    CHECKING = "checking"
    OBJECTION_WINDOW = "objection_window"
    NEEDS_NEIGHBOUR = "needs_neighbour"
    VOTE = "vote"
    PAID = "paid"
    RECHECK_VOTE = "recheck_vote"
    CLOSED = "closed"
    EXPIRED = "expired"
    REFERRED = "referred"

    __str__ = str.__str__


StatusOrStr: TypeAlias = Annotated[Status | str, open_enum_validator(Status)]
