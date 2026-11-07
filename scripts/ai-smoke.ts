import { draftBounty } from "../server/ai.ts";
const t = Date.now();
const d = await draftBounty("The drain grate outside the primary school gate is choked with leaves and silt. After rain, water stands there for days and mosquitoes breed.", null);
console.log(Date.now() - t, "ms", JSON.stringify(d, null, 1));
