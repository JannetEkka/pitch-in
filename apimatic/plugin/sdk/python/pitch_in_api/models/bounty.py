from __future__ import annotations

from typing_extensions import NotRequired, TypedDict

from ..core import UNSET, Optional, OptionalNullable, RFC3339DateTime, SdkBaseModel
from .checklist_item import ChecklistItem, ChecklistItemDict
from .enums.job_type import JobTypeOrStr
from .enums.skill import SkillOrStr
from .enums.status import StatusOrStr


class Bounty(SdkBaseModel):
    """A local job neighbours pay for"""

    id: Optional[str] = UNSET
    """Unique id"""

    title: Optional[str] = UNSET
    """Short title of the job"""

    report_text: Optional[str] = UNSET
    """The reporter's own words"""

    area: Optional[str] = UNSET
    """Neighbourhood name"""

    lat: Optional[float] = UNSET
    """Latitude of the spot"""

    lng: Optional[float] = UNSET
    """Longitude of the spot"""

    job_type: Optional[JobTypeOrStr] = UNSET
    """Kind of job"""

    skill: Optional[SkillOrStr] = UNSET
    """Skill the job needs"""

    est_hours: Optional[float] = UNSET
    """Estimated hours for one person"""

    materials_cents: Optional[int] = UNSET
    """Materials, in US cents"""

    hazard: OptionalNullable[str] = UNSET
    """Why the job is unsafe for a neighbour, if it is"""

    checklist: Optional[list[ChecklistItem]] = UNSET
    """What the after photo must show"""

    price_low_cents: Optional[int] = UNSET
    """Bottom of the fair price range, in cents"""

    price_high_cents: Optional[int] = UNSET
    """Top of the fair price range, in cents"""

    goal_cents: Optional[int] = UNSET
    """Funding goal, in cents"""

    holdback_pct: Optional[int] = UNSET
    """Share of the payment held until the recheck"""

    status: Optional[StatusOrStr] = UNSET
    """Where the bounty or pledge is in its lifecycle"""

    reporter_id: Optional[str] = UNSET
    """Neighbour who reported the problem"""

    doer_id: OptionalNullable[str] = UNSET
    """Neighbour who claimed the job"""

    deadline: Optional[RFC3339DateTime] = UNSET
    """When unfinished holds are voided"""

    recheck_due_at: OptionalNullable[RFC3339DateTime] = UNSET
    """When the "still fixed" recheck opens"""


class BountyDict(TypedDict):
    id: NotRequired[str]
    title: NotRequired[str]
    report_text: NotRequired[str]
    area: NotRequired[str]
    lat: NotRequired[float]
    lng: NotRequired[float]
    job_type: NotRequired[JobTypeOrStr]
    skill: NotRequired[SkillOrStr]
    est_hours: NotRequired[float]
    materials_cents: NotRequired[int]
    hazard: NotRequired[str | None]
    checklist: NotRequired[list[ChecklistItemDict]]
    price_low_cents: NotRequired[int]
    price_high_cents: NotRequired[int]
    goal_cents: NotRequired[int]
    holdback_pct: NotRequired[int]
    status: NotRequired[StatusOrStr]
    reporter_id: NotRequired[str]
    doer_id: NotRequired[str | None]
    deadline: NotRequired[RFC3339DateTime]
    recheck_due_at: NotRequired[RFC3339DateTime | None]
