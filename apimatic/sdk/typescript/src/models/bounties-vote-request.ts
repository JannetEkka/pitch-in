import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { choiceSchema, type Choice } from "./choice.js";

/** Request body */
export type BountiesVoteRequest = {
  /** pay or refund */
  choice: Choice;
};

export const bountiesVoteRequestSchema: Schema<BountiesVoteRequest> = s.object<BountiesVoteRequest>({
  choice: choiceSchema,
});
