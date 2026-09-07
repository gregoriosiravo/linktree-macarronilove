import { cp, mkdir } from "node:fs/promises";

await mkdir(".output/public/admin", { recursive: true });
await cp("admin", ".output/public/admin", { recursive: true });
