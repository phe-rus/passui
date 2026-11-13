import apiJson from "@/features/catalog/api.generated.json";
import { installCommand, packageManagers } from "@/features/catalog/install";
import type { PartApi } from "@/features/catalog/types";
import budgets from "../../../../../size-budgets.json";
import { highlight } from "./highlighter";

/**
 * Server only: reached through a dynamic import inside the server function,
 * so Shiki and the example sources never enter the browser bundle.
 */
const sources = import.meta.glob<string>("../../catalog/examples/*/*.tsx", {
	query: "?raw",
	import: "default",
});

export interface CodeSample {
	html: string;
	source: string;
}

/** Everything the server prepares for one component page: its code, its props and its size. */
export interface DocCode {
	/** The props of each exported part, read from the built declarations. */
	api: PartApi[];
	/** Rough gzip size in KB, from the bundle budget. */
	sizeKb?: number;
	/** The import statement, highlighted, and as plain text for copying. */
	install: string;
	importLine: string;
	/** The install command for each package manager, by its id. */
	installs: Record<string, CodeSample>;
	examples: Record<string, CodeSample>;
}

/**
 * An import as Biome formats it: specifiers sorted, and one per line as soon
 * as there is more than one, so a long part list never runs off the block.
 */
function formatImport(names: string[], from: string): string {
	if (!names.length) return `import "${from}";`;
	const sorted = [...names].sort((a, b) => a.localeCompare(b));
	if (sorted.length === 1) return `import { ${sorted[0]} } from "${from}";`;
	return `import {\n${sorted.map((name) => `\t${name},`).join("\n")}\n} from "${from}";`;
}

/** Highlighted HTML for a page's import line and every example file. */
export async function highlightDoc(
	slug: string,
	entry: string,
): Promise<DocCode> {
	const parts = (apiJson as Record<string, PartApi[]>)[slug] ?? [];
	const names = parts.map((p) => p.name);
	const importLine = formatImport(names, `@passui/react/${entry}`);
	const examples: DocCode["examples"] = {};
	for (const [path, read] of Object.entries(sources)) {
		const [, folder, file] =
			path.match(/examples\/([^/]+)\/([^/]+)\.tsx$/) ?? [];
		if (folder !== slug || !file) continue;
		const source = await read();
		examples[file] = { html: highlight(source), source };
	}
	const budget = (budgets.budgets as Record<string, number>)[slug];
	return {
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
}
