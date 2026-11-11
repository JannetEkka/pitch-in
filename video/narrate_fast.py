# Same as hackathons/tools/demo-video/narrate.py, with a speaking-rate option: python narrate_fast.py script.txt out_dir +10%
import asyncio, os, ssl, subprocess, sys
from pathlib import Path
import edge_tts.communicate as communicate
if os.path.exists("/root/.ccr/ca-bundle.crt"):
    communicate._SSL_CTX = ssl.create_default_context(cafile="/root/.ccr/ca-bundle.crt")
async def main(script, out, rate):
    out.mkdir(parents=True, exist_ok=True)
    for i, text in enumerate([s.strip() for s in script.read_text().split("\n\n") if s.strip()], 1):
        p = out / f"scene{i:02d}.mp3"
        await communicate.Communicate(text, "en-IN-NeerjaNeural", rate=rate, proxy=os.environ.get("HTTPS_PROXY")).save(str(p))
        d = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",str(p)],capture_output=True,text=True).stdout.strip()
        print(f"{p.name}\t{float(d):.1f}")
asyncio.run(main(Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]))
