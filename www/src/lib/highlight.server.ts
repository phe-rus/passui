import type { HighlighterCore } from "shiki/core";
import apiJson from "@/features/components/api.generated.json";
import type { PartApi } from "@/features/components/types";

/**
 * Server only: reached through a dynamic import inside the server function,
 * so Shiki and the example sources never enter the browser bundle.
 */
const sources = import.meta.glob<string>(
	"../features/components/examples/*/*.tsx",
	{
		query: "?raw",
		import: "default",
	},
);

let highlighter: Promise<HighlighterCore> | undefined;

function load() {
	highlighter ??= Promise.all([
		import("shiki/core"),
		import("shiki/engine/javascript"),
	]).then(([core, engine]) =>
		core.createHighlighterCore({
			langs: [
				import("shiki/langs/tsx.mjs"),
				import("shiki/langs/shellscript.mjs"),
				import("shiki/langs/css.mjs"),
			],
			themes: [
				import("shiki/themes/light-plus.mjs"),
				import("shiki/themes/dark-plus.mjs"),
			],
			engine: engine.createJavaScriptRegexEngine(),
		}),
	);
	return highlighter;
}

export async function highlight(code: string, lang = "tsx") {
	const shiki = await load();
	return shiki.codeToHtml(code.trimEnd(), {
		lang,
		themes: { light: "light-plus", dark: "dark-plus" },
		defaultColor: false,
	});
}

export interface DocCode {
	install: string;
	examples: Record<string, { html: string; source: string }>;
}

/** Highlighted HTML for a page's import line and every example file. */
export async function highlightDoc(
	slug: string,
	entry: string,
): Promise<DocCode> {
	const parts = (apiJson as Record<string, PartApi[]>)[slug] ?? [];
	const names = parts.map((p) => p.name);
	const examples: DocCode["examples"] = {};
	for (const [path, read] of Object.entries(sources)) {
		const [, folder, file] =
			path.match(/examples\/([^/]+)\/([^/]+)\.tsx$/) ?? [];
		if (folder !== slug || !file) continue;
		const source = await read();
		examples[file] = { html: await highlight(source), source };
	}
	return {
		install: await highlight(
			names.length
				? `import { ${names.join(", ")} } from "@passui/react/${entry}";`
				: `import "@passui/react/${entry}";`,
		),
		examples,
	};
}
