import type { ClientOptions } from "./client-options.js";
import type { AuthScheme } from "./core/api-request.js";
import { apiKeyHeaderAuth } from "./core/auth/schemes.js";

export type AuthSchemes = {
  readonly demoUser: AuthScheme;
};

export function buildAuthSchemes(options: ClientOptions): AuthSchemes {
  return {
    demoUser: apiKeyHeaderAuth({ name: "X-Pitch-In-User", token: options.demoUser }),
  };
}
