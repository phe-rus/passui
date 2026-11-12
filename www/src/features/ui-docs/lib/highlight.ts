import type { HighlighterCore } from "shiki/core";
import type { DocCode } from "../types";

/**
 * Server only: reached through a dynamic import inside the server function,
 * so Shiki and the example sources never enter the browser bundle.
 */
const sources = import.meta.glob<string>("../examples/*.tsx", {
	query: "?raw",
	import: "default",
});
const docs = import.meta.glob<{
	doc: { entry: string; parts: { name: string }[] };
}>("../docs/[!_]*.tsx");

let highlighter: Promise<HighlighterCore> | undefined;

function load() {
	highlighter ??= Promise.all([
		import("shiki/core"),
		import("shiki/engine/javascript"),
	]).then(([core, engine]) =>
		core.createHighlighterCore({
			langs: [import("shiki/langs/tsx.mjs")],
			themes: [
				import("shiki/themes/github-light-default.mjs"),
				import("shiki/themes/github-dark-default.mjs"),
			],
			engine: engine.createJavaScriptRegexEngine(),
		}),
	);
	return highlighter;
}

/** Highlighted HTML for a page's import line and every example file. */
export async function highlightDoc(slug: string): Promise<DocCode> {
	const [shiki, loadDoc] = await Promise.all([
		load(),
		docs[`../docs/${slug}.tsx`]?.(),
	]);
	if (!loadDoc) throw new Error(`No docs for ${slug}`);
	const render = (code: string) =>
		shiki.codeToHtml(code.trimEnd(), {
			lang: "tsx",
			themes: { light: "github-light-default", dark: "github-dark-default" },
			defaultColor: false,
		});
	const { entry, parts } = loadDoc.doc;
	const names = parts
		.map((part) => part.name)
		.filter((name) => /^[A-Z]/.test(name) || name === "buttonVariants");
	const examples: Record<string, string> = {};
	for (const [path, read] of Object.entries(sources)) {
		const file = path.split("/").pop() ?? "";
		if (file.startsWith(`${slug}-`))
			examples[file.slice(slug.length + 1, -4)] = render(await read());
	}
	return {
		install: render(`import { ${names.join(", ")} } from "${entry}";`),
		examples,
	};
}
