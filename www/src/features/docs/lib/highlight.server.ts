import type { PartApi } from "@/features/catalog/types";

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
 * Server only. The highlighted code is prepared by `scripts/generate-code.ts`
 * at build time, because Shiki is too heavy to run inside a Worker request.
 */
const pages = import.meta.glob<DocCode>("../../catalog/code/*.json", {
	import: "default",
});

/** Highlighted HTML for a page's import line and every example file. */
export async function highlightDoc(
	slug: string,
	_entry: string,
): Promise<DocCode> {
	const load = pages[`../../catalog/code/${slug}.json`];
	if (!load)
		throw new Error(`No generated code for "${slug}". Run bun run docs:code.`);
	return load();
}
