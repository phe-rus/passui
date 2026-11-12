import { registry } from "../components/registry";
import { guides } from "../guides/guides";
import { siteOrigin } from "../seo/site";

/** The `/llms.txt` index, generated from the same registry as the docs. */
export function getLlmsTxt() {
	return [
		"# Passui",
		"",
		"> Native React controls on Zag.js state machines, with an Apple 2026 look. Import one component and pay only for it.",
		"",
		"## Guides",
		...guides.map(
			(g) => `- [${g.title}](${siteOrigin}${g.path}): ${g.summary}`,
		),
		"",
		"## Components",
		...registry.map(
			(c) =>
				`- [${c.name}](${siteOrigin}/docs/components/${c.slug}): ${c.summary} Import from \`@passui/react/${c.entry}\`.`,
		),
		"",
	].join("\n");
}

/** The skill file agents read before writing Passui code. */
export function getSkill() {
	return [
		"---",
		"name: passui",
		"description: Build interfaces with Passui, native React controls on Zag.js. Use when a project imports @passui/react.",
		"---",
		"",
		"# Passui",
		"",
		'- Import one component from its subpath: `import { Dialog } from "@passui/react/dialog"`.',
		"- Names follow shadcn. Triggers take a `render` prop to become your own element.",
		"- Style with data attributes and token utilities (`bg-elevated`, `text-label`). Never raw hex or `text-sm`.",
		'- Icons come from `@passui/icons/<name>`, with `tone="mono" | "duo"`.',
		"",
		"## Components",
		...registry.map(
			(c) => `- ${c.name}: \`@passui/react/${c.entry}\`. ${c.summary}`,
		),
		"",
	].join("\n");
}
