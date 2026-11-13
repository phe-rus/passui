/**
 * Highlights every component page's code once, at build time.
 * Shiki's TSX grammar is far too heavy for a Worker request (Cloudflare error
 * 1102, "exceeded resource limits"), so the Worker only reads this JSON.
 * Runs before `vite build`; the result is not committed.
 */
import {
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import budgets from "../../size-budgets.json";
import apiJson from "../src/features/catalog/api.generated.json";
import {
	installCommand,
	packageManagers,
} from "../src/features/catalog/install";
import { registry } from "../src/features/catalog/registry";
import type { PartApi } from "../src/features/catalog/types";
import type { DocCode } from "../src/features/docs/lib/highlight.server";
import { highlight } from "../src/features/docs/lib/highlighter";

const examplesDir = resolve(
	import.meta.dirname,
	"../src/features/catalog/examples",
);

/** An import as Biome formats it: sorted, one per line once there is more than one. */
function formatImport(names: string[], from: string): string {
	if (!names.length) return `import "${from}";`;
	const sorted = [...names].sort((a, b) => a.localeCompare(b));
	if (sorted.length === 1) return `import { ${sorted[0]} } from "${from}";`;
	return `import {\n${sorted.map((name) => `\t${name},`).join("\n")}\n} from "${from}";`;
}

const outDir = resolve(import.meta.dirname, "../src/features/catalog/code");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
for (const { slug, entry } of registry) {
	const parts = (apiJson as Record<string, PartApi[]>)[slug] ?? [];
	const importLine = formatImport(
		parts.map((part) => part.name),
		`@passui/react/${entry}`,
	);
	const examples: DocCode["examples"] = {};
	const folder = `${examplesDir}/${slug}`;
	for (const file of readdirSync(folder).filter((name) =>
		name.endsWith(".tsx"),
	)) {
		const source = readFileSync(`${folder}/${file}`, "utf8");
		examples[file.replace(/\.tsx$/, "")] = { html: highlight(source), source };
	}
	const budget = (budgets.budgets as Record<string, number>)[slug];
	const page: DocCode = {
		api: parts,
		sizeKb: budget ? Math.ceil(budget / 1100) : undefined,
		installs: Object.fromEntries(
			packageManagers.map(({ id, add }) => [
				id,
				{
					html: highlight(installCommand(add), "bash"),
					source: installCommand(add),
				},
			]),
		),
		importLine,
		install: highlight(importLine),
		examples,
	};
	writeFileSync(`${outDir}/${slug}.json`, JSON.stringify(page));
}
console.log(`Highlighted ${registry.length} component pages.`);
