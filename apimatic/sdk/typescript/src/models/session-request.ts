import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Request body */
export type SessionRequest = {
  /** Id of a sample neighbour */
  userId: string;
};

export const sessionRequestSchema: Schema<SessionRequest> = s.object<SessionRequest>({
  userId: s.string(),
  _keysMap: {
    userId: "user_id",
  },
});
