import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** One thing the after photo must show */
export type ChecklistItem = {
  /** Unique id */
  id: string;
  /** What the after photo must show */
  text: string;
};

export const checklistItemSchema: Schema<ChecklistItem> = s.object<ChecklistItem>({
  id: s.string(),
  text: s.string(),
});
