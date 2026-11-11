import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** pay or refund */
export const Choice = {
  Pay: "pay",
  Refund: "refund",
} as const;
export type Choice = (typeof Choice)[keyof typeof Choice] | (string & {});

export const choiceSchema: EnumSchema<Choice> = s.enumOf<Choice>(Choice);
