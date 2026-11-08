from enum import Enum
from typing import Annotated, TypeAlias

from ...core import open_enum_validator


class JobType(str, Enum):
    """Kind of job"""

    LITTER = "litter"
    DRAIN = "drain"
    PAINT = "paint"
    REPAIR = "repair"
    GREENERY = "greenery"
    OTHER = "other"

    __str__ = str.__str__


JobTypeOrStr: TypeAlias = Annotated[JobType | str, open_enum_validator(JobType)]
