import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { photoSchema, type Photo } from "./photo.js";

/** Request body */
export type ReportsRequest = {
  /** Plain-language text */
  text: string;
  /** Neighbourhood name */
  area: string;
  /** Latitude of the spot */
  lat: number;
  /** Longitude of the spot */
  lng: number;
  /** A photo with the place and time it was taken */
  photo?: Photo;
};

export const reportsRequestSchema: Schema<ReportsRequest> = s.object<ReportsRequest>({
  text: s.string(),
  area: s.string(),
  lat: s.float64(),
  lng: s.float64(),
  photo: s.optional(s.lazy(() => photoSchema)),
});
