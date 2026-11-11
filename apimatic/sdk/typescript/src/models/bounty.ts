import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { checklistItemSchema, type ChecklistItem } from "./checklist-item.js";
import { jobTypeSchema, type JobType } from "./job-type.js";
import { skillSchema, type Skill } from "./skill.js";
import { statusSchema, type Status } from "./status.js";

/** A local job neighbours pay for */
export type Bounty = {
  /** Unique id */
  id?: string;
  /** Short title of the job */
  title?: string;
  /** The reporter's own words */
  reportText?: string;
  /** Neighbourhood name */
  area?: string;
  /** Latitude of the spot */
  lat?: number;
  /** Longitude of the spot */
  lng?: number;
  /** Kind of job */
  jobType?: JobType;
  /** Skill the job needs */
  skill?: Skill;
  /** Estimated hours for one person */
  estHours?: number;
  /** Materials, in US cents */
  materialsCents?: number;
  /** Why the job is unsafe for a neighbour, if it is */
  hazard?: string | null;
  /** What the after photo must show */
  checklist?: ChecklistItem[];
  /** Bottom of the fair price range, in cents */
  priceLowCents?: number;
  /** Top of the fair price range, in cents */
  priceHighCents?: number;
  /** Funding goal, in cents */
  goalCents?: number;
  /** Share of the payment held until the recheck */
  holdbackPct?: number;
  /** Where the bounty or pledge is in its lifecycle */
  status?: Status;
  /** Neighbour who reported the problem */
  reporterId?: string;
  /** Neighbour who claimed the job */
  doerId?: string | null;
  /** When unfinished holds are voided */
  deadline?: Date;
  /** When the "still fixed" recheck opens */
  recheckDueAt?: Date | null;
};

export const bountySchema: Schema<Bounty> = s.object<Bounty>({
  id: s.optional(s.string()),
  title: s.optional(s.string()),
  reportText: s.optional(s.string()),
  area: s.optional(s.string()),
  lat: s.optional(s.float64()),
  lng: s.optional(s.float64()),
  jobType: s.optional(s.lazy(() => jobTypeSchema)),
  skill: s.optional(s.lazy(() => skillSchema)),
  estHours: s.optional(s.float64()),
  materialsCents: s.optional(s.int()),
  hazard: s.optionalNullable(s.string()),
  checklist: s.optional(s.array(s.lazy(() => checklistItemSchema))),
  priceLowCents: s.optional(s.int()),
  priceHighCents: s.optional(s.int()),
  goalCents: s.optional(s.int()),
  holdbackPct: s.optional(s.int()),
  status: s.optional(s.lazy(() => statusSchema)),
  reporterId: s.optional(s.string()),
  doerId: s.optionalNullable(s.string()),
  deadline: s.optional(s.dateTime()),
  recheckDueAt: s.optionalNullable(s.dateTime()),
  _keysMap: {
    reportText: "report_text",
    jobType: "job_type",
    estHours: "est_hours",
    materialsCents: "materials_cents",
    priceLowCents: "price_low_cents",
    priceHighCents: "price_high_cents",
    goalCents: "goal_cents",
    holdbackPct: "holdback_pct",
    reporterId: "reporter_id",
    doerId: "doer_id",
    recheckDueAt: "recheck_due_at",
  },
});
