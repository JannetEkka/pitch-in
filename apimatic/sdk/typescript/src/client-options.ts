import type { TokenProvider } from "./core/auth/credentials.js";
import type { CoreClientOptions } from "./core/client-options.js";
import { ServerEnvironment } from "./servers.js";

export type ClientOptions = SdkClientOptions & CoreClientOptions;

type SdkClientOptions = ServerOptions & {
  /**
   * Demo sign-in: the id of a sample neighbour (u_asha, u_ben, u_chen, u_dev, u_esi). Production
   * would use Log in with PayPal.
   */
  readonly demoUser?: TokenProvider | undefined;
};

type ServerOptions =
  | {
      readonly serverEnvironment?: typeof ServerEnvironment.Production;
      /** Hosted demo (sandbox) */
      readonly serverOptions?: {
        baseUrl?: string;
      };
    }
  | {
      readonly serverEnvironment: typeof ServerEnvironment.Environment2;
      /** Hosted demo (sandbox) */
      readonly serverOptions?: {
        baseUrl?: string;
      };
    };
