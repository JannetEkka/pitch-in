import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Kind of job */
export const JobType = {
  Litter: "litter",
  Drain: "drain",
  Paint: "paint",
  Repair: "repair",
  Greenery: "greenery",
  Other: "other",
} as const;
export type JobType = (typeof JobType)[keyof typeof JobType] | (string & {});

export const jobTypeSchema: EnumSchema<JobType> = s.enumOf<JobType>(JobType);
