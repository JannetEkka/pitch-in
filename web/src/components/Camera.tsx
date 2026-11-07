import { useEffect, useRef, useState } from "react";

export interface Shot {
  image: string; // data URL
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  live_capture: boolean;
}

function locate(): Promise<{ lat: number | null; lng: number | null; accuracy: number | null }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({ lat: null, lng: null, accuracy: null });
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy }),
      () => resolve({ lat: null, lng: null, accuracy: null }),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  });
}

async function shrink(src: CanvasImageSource, w: number, h: number): Promise<string> {
  const scale = Math.min(1, 1600 / Math.max(w, h));
  const c = document.createElement("canvas");
  c.width = Math.round(w * scale);
  c.height = Math.round(h * scale);
  c.getContext("2d")!.drawImage(src, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.85);
}

// In-app camera: the photo is taken live, with the phone's location. A file upload is allowed for the
// demo only, and is flagged as "not a live capture" wherever the photo is checked.
export function Camera({ label, onShot, demo, fallbackLocation }: { label: string; onShot: (s: Shot) => void; demo: boolean; fallbackLocation?: { lat: number; lng: number } }) {
  const video = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [err, setErr] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => () => stream?.getTracks().forEach((t) => t.stop()), [stream]);

  const open = async () => {
    setErr("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      setStream(s);
      setTimeout(() => {
        if (video.current) {
          video.current.srcObject = s;
          void video.current.play();
        }
      }, 0);
    } catch {
      setErr("Camera not available here.");
    }
  };

  const snap = async () => {
    const v = video.current!;
    const image = await shrink(v, v.videoWidth, v.videoHeight);
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setPreview(image);
    onShot({ image, ...(await locate()), live_capture: true });
  };

  const upload = async (f: File) => {
    const bmp = await createImageBitmap(f);
    const image = await shrink(bmp, bmp.width, bmp.height);
    setPreview(image);
    const loc = await locate();
    onShot({ image, ...(loc.lat == null && fallbackLocation ? { ...fallbackLocation, accuracy: 15 } : loc), live_capture: false });
  };

  return (
    <div className="camera">
      {stream ? (
        <>
          <video ref={video} playsInline muted />
          <button className="primary" onClick={() => void snap()}>
            Take photo
          </button>
        </>
      ) : preview ? (
        <img src={preview} alt={label} />
      ) : (
        <div className="camera-empty">{label}</div>
      )}
      {!stream && (
        <div className="row">
          <button onClick={() => void open()}>{preview ? "Retake" : "Open camera"}</button>
          {demo && (
            <label className="file">
              Upload a file <span className="tag">demo only, flagged</span>
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && void upload(e.target.files[0])} />
            </label>
          )}
        </div>
      )}
      {err && <p className="error">{err}</p>}
    </div>
  );
}
