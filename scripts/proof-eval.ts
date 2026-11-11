import { readFileSync } from "node:fs";
import { verifyProof, verifyRecheck } from "../server/ai.ts";
const [b, a, mode] = process.argv.slice(2);
const checklist = [
  { id: "grass", text: "The overgrown grass along the edge of the field next to the footpath is cut short" },
  { id: "litter", text: "No litter or waste left on the grass edge or the footpath" },
];
const t = Date.now();
const v = mode === "recheck"
  ? await verifyRecheck({ checklist, after: readFileSync(b), recheck: readFileSync(a), days: 1 })
  : await verifyProof({ checklist, report: null, before: readFileSync(b), after: readFileSync(a) });
console.log(Date.now() - t, "ms", JSON.stringify(v, null, 1));
