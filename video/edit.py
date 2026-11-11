"""Cut the waits out of the recording and lay each narration scene at its (shifted) start.
Usage: python video/edit.py video/rec/<file>.webm video/audio video/marks.json out.mp4"""
import json
import subprocess
import sys

video, audio_dir, marks_file, out = sys.argv[1:5]
data = json.load(open(marks_file))
cuts = sorted(data["cuts"])


def shifted(t: float) -> float:
    return t - sum(max(0.0, min(b, t) - a) for a, b in cuts if a < t)


starts = [shifted(m["at"]) for m in data["marks"]]
durs = {}
for i in range(1, len(starts) + 1):
    p = f"{audio_dir}/scene{i:02d}.mp3"
    durs[i] = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True).stdout)

# Never let one scene's voice run into the next: push a start later if needed.
placed, end = [], 0.0
for i, s in enumerate(starts, 1):
    s = max(s, end + 0.2)
    placed.append(s)
    end = s + durs[i]

keep = " + ".join(f"between(t,{a:.2f},{b:.2f})" for a, b in cuts) or "0"
vf = f"select='not({keep})',setpts=N/FRAME_RATE/TB"
inputs, filters = [], []
for i, s in enumerate(placed, 1):
    inputs += ["-i", f"{audio_dir}/scene{i:02d}.mp3"]
    ms = int(s * 1000)
    filters.append(f"[{i}:a]adelay={ms}|{ms}[a{i}]")
mix = "".join(f"[a{i}]" for i in range(1, len(placed) + 1)) + f"amix=inputs={len(placed)}:normalize=0[aout]"
fc = f"[0:v]{vf}[vout];" + ";".join(filters) + ";" + mix
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", video, *inputs, "-filter_complex", fc, "-map", "[vout]", "-map", "[aout]",
                "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "veryfast", "-crf", "22", "-r", "25", "-c:a", "aac", "-b:a", "128k", "-t", f"{end + 1.5:.2f}", out], check=True)
print("scene starts:", [round(s, 1) for s in placed], "length:", round(end + 1.5, 1))
