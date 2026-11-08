from enum import Enum
from typing import Annotated, TypeAlias

from ...core import open_enum_validator


class Skill(str, Enum):
    """Skill the job needs"""

    BASIC = "basic"
    SEMI = "semi"
    SKILLED = "skilled"

    __str__ = str.__str__


SkillOrStr: TypeAlias = Annotated[Skill | str, open_enum_validator(Skill)]
