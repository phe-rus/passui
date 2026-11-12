import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

// Measures each budgeted entry of the built package. Run `bun run build` first.
// With --check, any entry over its budget in size-budgets.json fails.
const root = resolve(import.meta.dirname, "..");
const { package: directory, budgets } = JSON.parse(
	readFileSync(join(root, "size-budgets.json"), "utf8"),
);
const check = process.argv.includes("--check");
const failures = [];

for (const [entry, budget] of Object.entries(budgets)) {
	const file = join(root, directory, "dist", `${entry}.js`);
	if (!existsSync(file)) {
		failures.push(`${entry}: ${file} is missing, run bun run build`);
		continue;
	}
	const result = await Bun.build({
		entrypoints: [file],
		target: "browser",
		minify: true,
		external: ["react", "react-dom", "react/jsx-runtime", "@passui/*"],
	});
	if (!result.success)
		throw new AggregateError(result.logs, `Could not bundle ${entry}`);
	const bytes = new Uint8Array(await result.outputs[0].arrayBuffer());
	const gzip = Bun.gzipSync(bytes).length;
	console.log(`${entry}: ${gzip} gzip bytes (budget ${budget})`);
	if (gzip > budget)
		failures.push(`${entry}: ${gzip} is over its budget ${budget}`);
}

if (check && failures.length > 0) {
	console.error(failures.join("\n"));
	process.exit(1);
}
