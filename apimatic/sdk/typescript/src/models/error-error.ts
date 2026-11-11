import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Error returned when a request is refused or invalid */
export type ErrorError = {
  /** What went wrong */
  error?: string;
  /** Each rule that refused the request */
  reasons?: string[];
};

export const errorErrorSchema: Schema<ErrorError> = s.object<ErrorError>({
  error: s.optional(s.string()),
  reasons: s.optional(s.array(s.string())),
});
