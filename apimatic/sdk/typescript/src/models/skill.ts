import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Skill the job needs */
export const Skill = {
  Basic: "basic",
  Semi: "semi",
  Skilled: "skilled",
} as const;
export type Skill = (typeof Skill)[keyof typeof Skill] | (string & {});

export const skillSchema: EnumSchema<Skill> = s.enumOf<Skill>(Skill);
