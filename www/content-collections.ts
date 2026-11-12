import { defineCollection, defineConfig } from "@content-collections/core";
import { docsMarkdownExtensions } from "@tanstack/markdown/extensions/docs";
import { renderHtml } from "@tanstack/markdown/html";
import { parseMarkdown } from "@tanstack/markdown/parser";
import { z } from "zod";
import { highlight } from "./src/features/docs/lib/highlighter";

const languageNames: Record<string, string> = {
	bash: "Shell",
	sh: "Shell",
	shell: "Shell",
	tsx: "TypeScript JSX",
	ts: "TypeScript",
	css: "CSS",
	html: "HTML",
};

/**
 * Splits a guide at its fenced code blocks: prose is rendered to HTML and each
 * block is kept apart, so the page can show it in the library's CodeBlock with
 * colours, line numbers and a copy button instead of a bare `pre`.
 */
function toBlocks(content: string) {
	const blocks: Array<
		| { type: "html"; html: string }
		| { type: "code"; code: string; language: string; html: string }
	> = [];
	const fence = /```(\w*)[^\n]*\n([\s\S]*?)```/g;
	let last = 0;
	const prose = (text: string) => {
		if (!text.trim()) return;
		blocks.push({
			type: "html",
			html: renderHtml(text, {
				extensions: docsMarkdownExtensions(),
				headingAnchors: true,
			}),
		});
	};
	for (const match of content.matchAll(fence)) {
		prose(content.slice(last, match.index));
		const lang = match[1] || "text";
		const code = (match[2] ?? "").trimEnd();
		blocks.push({
			type: "code",
			code,
			language: languageNames[lang] ?? lang,
			html: highlight(code, lang === "text" ? "tsx" : lang),
		});
		last = (match.index ?? 0) + match[0].length;
	}
	prose(content.slice(last));
	return blocks;
}

const guides = defineCollection({
	name: "guides",
	directory: "src/features/docs/content",
	include: "*.md",
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		section: z.enum(["sections", "libraries", "hooks", "namespace"]),
		order: z.number(),
		content: z.string(),
	}),
	transform: (guide) => ({
		...guide,
		// Rendered once, here, so the page ships HTML and no Markdown or Shiki code.
		html: renderHtml(guide.content, {
			extensions: docsMarkdownExtensions(),
			headingAnchors: true,
			highlighter: highlight,
		}),
		blocks: toBlocks(guide.content),
		slug: guide._meta.path,
		path: `/docs/${guide._meta.path}`,
		// The outline on the right: each second level heading of the guide.
		headings: (
			parseMarkdown(guide.content, { extensions: docsMarkdownExtensions() })
				.headings ?? []
		)
			.filter((heading) => heading.level === 2)
			.map(({ id, text }) => ({ id, title: text })),
	}),
});

export default defineConfig({ collections: [guides] });
