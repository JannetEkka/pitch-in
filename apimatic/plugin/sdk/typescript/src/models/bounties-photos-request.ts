import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { kindSchema, type Kind } from "./kind.js";

/** Request body */
export type BountiesPhotosRequest = {
  /** data:image/jpeg;base64,... */
  image: string;
  /** Latitude of the spot */
  lat: number | null;
  /** Longitude of the spot */
  lng: number | null;
  /** Location accuracy in metres */
  accuracy: number | null;
  /** Taken with the in-app camera */
  liveCapture: boolean;
  /** Kind of case or photo */
  kind: Kind;
};

export const bountiesPhotosRequestSchema: Schema<BountiesPhotosRequest> = s.object<BountiesPhotosRequest>({
  image: s.string(),
  lat: s.nullable(s.float64()),
  lng: s.nullable(s.float64()),
  accuracy: s.nullable(s.float64()),
  liveCapture: s.boolean(),
  kind: kindSchema,
  _keysMap: {
    liveCapture: "live_capture",
  },
});
