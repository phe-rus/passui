import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { resolve } from "node:path";

// Declarations for moved or deleted source must never survive a build.
rmSync(resolve("dist/types"), { recursive: true, force: true });
const result = spawnSync("tsc", ["-p", "tsconfig.build.json"], {
	stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
