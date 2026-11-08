import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** A photo with the place and time it was taken */
export type Photo = {
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
};

export const photoSchema: Schema<Photo> = s.object<Photo>({
  image: s.string(),
  lat: s.nullable(s.float64()),
  lng: s.nullable(s.float64()),
  accuracy: s.nullable(s.float64()),
  liveCapture: s.boolean(),
  _keysMap: {
    liveCapture: "live_capture",
  },
});
