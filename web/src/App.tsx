import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { Board } from "./pages/Board";
import { BountyPage } from "./pages/Bounty";
import { Report } from "./pages/Report";
import { Plan } from "./pages/Plan";
import { Ledger } from "./pages/Ledger";
import { Support } from "./pages/Support";
import { Health } from "./pages/Health";
import { About } from "./pages/About";

export interface AppConfig {
  paypal_mode: "sandbox" | "mock";
  paypal_client_id: string;
  ai_mode: "gemini" | "mock";
  ai_model: string;
  demo: boolean;
  clock_offset_days: number;
  now: string;
  limits: Record<string, number>;
}
export interface Me {
  user: { id: string; name: string; paypal_email: string; completed_rechecks: number };
  notifications: { id: string; text: string; at: string; bounty_id: string | null }[];
}

interface Ctx {
  config: AppConfig | null;
  me: Me | null;
  refresh: () => Promise<void>;
  tick: number; // bumps after any change, so pages reload
  bump: () => void;
}
const AppCtx = createContext<Ctx>({ config: null, me: null, refresh: async () => {}, tick: 0, bump: () => {} });
export const useApp = () => useContext(AppCtx);

function useRoute() {
  const [hash, setHash] = useState(location.hash || "#/");
  useEffect(() => {
    const on = () => setHash(location.hash || "#/");
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return hash.slice(1);
}

const NAV = [
  ["/", "Bounties"],
  ["/report", "Report a problem"],
  ["/plan", "Project plan"],
  ["/ledger", "Receipts"],
  ["/support", "Support"],
  ["/health", "Area health"],
  ["/about", "How it works"],
];

export function App() {
  const route = useRoute();
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [users, setUsers] = useState<Me["user"][]>([]);
  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((t) => t + 1), []);

  const refresh = useCallback(async () => {
    setConfig(await api("/config"));
    setUsers(await api("/users"));
    try {
      setMe(await api("/me"));
    } catch {
      setMe(null);
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh, tick]);

  const switchUser = async (id: string) => {
    await api("/session", { user_id: id });
    await refresh();
    bump();
  };
  const advance = async (days: number) => {
    await api("/demo/advance", { days });
    bump();
  };

  let page = <Board />;
  if (route.startsWith("/b/")) page = <BountyPage id={route.slice(3)} />;
  else if (route === "/report") page = <Report />;
  else if (route === "/plan") page = <Plan />;
  else if (route === "/ledger") page = <Ledger />;
  else if (route === "/support") page = <Support />;
  else if (route === "/health") page = <Health />;
  else if (route === "/about") page = <About />;

  return (
    <AppCtx.Provider value={{ config, me, refresh, tick, bump }}>
      <header className="top">
        <a href="#/" className="brand">
          <span className="logo" aria-hidden>
            ✓
          </span>
          Pitch In
        </a>
        <nav>
          {NAV.map(([href, label]) => (
            <a key={href} href={`#${href}`} className={route === href || (href !== "/" && route.startsWith(href)) ? "on" : ""}>
              {label}
            </a>
          ))}
          <a href="/docs/">API &amp; SDKs</a>
        </nav>
        <div className="who">
          <label>
            <span className="tag">Demo sign-in</span>
            <select value={me?.user.id ?? ""} onChange={(e) => void switchUser(e.target.value)} aria-label="Choose who you are">
              <option value="" disabled>
                Choose a neighbour…
              </option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>
      {config && (
        <div className="modebar">
          <span className={`badge ${config.paypal_mode === "sandbox" ? "ok" : "warn"}`}>
            PayPal: {config.paypal_mode === "sandbox" ? "sandbox (test money)" : "stand-in (no keys)"}
          </span>
          <span className={`badge ${config.ai_mode === "gemini" ? "ok" : "warn"}`}>AI: {config.ai_mode === "gemini" ? config.ai_model : "stand-in (no key)"}</span>
          {config.demo && (
            <span className="democlock">
              Demo clock: {new Date(config.now).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
              {config.clock_offset_days ? ` (+${config.clock_offset_days} days)` : ""}
              <button className="link" onClick={() => void advance(1)}>
                +1 day
              </button>
              <button className="link" onClick={() => void advance(7)}>
                +7 days
              </button>
            </span>
          )}
        </div>
      )}
      <main>{page}</main>
      {me && me.notifications.length > 0 && (
        <aside className="inbox" aria-label="Your notifications">
          <h3>For {me.user.name.split(" ")[0]}</h3>
          {me.notifications.slice(0, 4).map((n) => (
            <a key={n.id} href={n.bounty_id ? `#/b/${n.bounty_id}` : "#/"}>
              {n.text}
            </a>
          ))}
        </aside>
      )}
    </AppCtx.Provider>
  );
}
