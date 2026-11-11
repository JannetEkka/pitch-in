from enum import Enum
from typing import Annotated, TypeAlias

from ...core import open_enum_validator


class Choice(str, Enum):
    """pay or refund"""

    PAY = "pay"
    REFUND = "refund"

    __str__ = str.__str__


ChoiceOrStr: TypeAlias = Annotated[Choice | str, open_enum_validator(Choice)]
