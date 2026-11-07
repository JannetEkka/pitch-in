import { useEffect, useRef, useState } from "react";
import { api, ApiError, usd } from "../api";
import { useApp } from "../App";

declare global {
  interface Window {
    paypal?: any;
  }
}

let sdkPromise: Promise<void> | null = null;
function loadSdk(clientId: string) {
  sdkPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    // intent=authorize: the pledge is held on the funder's PayPal account, not charged.
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&intent=authorize&currency=USD&components=buttons`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export function PayPalPledge({ bountyId, defaultCents, renewOf, onDone }: { bountyId: string; defaultCents: number; renewOf?: string; onDone: () => void }) {
  const { config } = useApp();
  const [cents, setCents] = useState(defaultCents);
  const [msg, setMsg] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const pledgeRef = useRef<string | null>(null);
  const centsRef = useRef(cents);
  centsRef.current = cents;

  useEffect(() => {
    if (config?.paypal_mode !== "sandbox" || !box.current) return;
    let buttons: any;
    loadSdk(config.paypal_client_id).then(() => {
      if (!box.current) return;
      box.current.innerHTML = "";
      buttons = window.paypal.Buttons({
        style: { layout: "horizontal", tagline: false, height: 40 },
        createOrder: async () => {
          const r = await api<{ pledge_id: string; order_id: string }>(`/bounties/${bountyId}/pledges`, { amount_cents: centsRef.current, renew_of: renewOf });
          pledgeRef.current = r.pledge_id;
          return r.order_id;
        },
        onApprove: async () => {
          await api(`/pledges/${pledgeRef.current}/confirm`, {});
          setMsg("Held on your PayPal account. You're charged only if the fix is verified.");
          onDone();
        },
        onError: (e: Error) => setMsg(e.message),
      });
      void buttons.render(box.current);
    });
    return () => buttons?.close?.();
  }, [config?.paypal_mode, config?.paypal_client_id, bountyId, renewOf, onDone]);

  const standIn = async () => {
    try {
      const r = await api<{ pledge_id: string }>(`/bounties/${bountyId}/pledges`, { amount_cents: cents, renew_of: renewOf });
      await api(`/pledges/${r.pledge_id}/confirm`, {});
      setMsg("Held (stand-in PayPal). You're charged only if the fix is verified.");
      onDone();
    } catch (e) {
      setMsg(e instanceof ApiError ? [e.message, ...e.reasons].join(" ") : String(e));
    }
  };

  return (
    <div className="pledge">
      <label>
        Pledge
        <span className="money-input">
          $<input type="number" min={1} max={500} step={1} value={cents / 100} onChange={(e) => setCents(Math.round(Number(e.target.value) * 100))} />
        </span>
      </label>
      {config?.paypal_mode === "sandbox" ? <div ref={box} className="pp-buttons" /> : <button className="primary" onClick={() => void standIn()}>Hold {usd(cents)} (stand-in PayPal)</button>}
      <p className="small">PayPal holds the money. It's charged only for your share of a verified fix; if nobody finishes, the hold is cancelled.</p>
      {msg && <p className="note">{msg}</p>}
    </div>
  );
}
