// Times one proof check against Gemini with two local photos: npx tsx scripts/ai-proof-smoke.ts before.jpg after.jpg
import { readFileSync } from "node:fs";
import { verifyProof } from "../server/ai.ts";
const [before, after] = process.argv.slice(2);
const t = Date.now();
const v = await verifyProof({ checklist: [{ id: "path", text: "No loose litter on the footpath" }], report: null, before: readFileSync(before), after: readFileSync(after) });
console.log(Date.now() - t, "ms", JSON.stringify(v, null, 1));
