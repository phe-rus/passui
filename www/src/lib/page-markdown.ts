import type {
	ComponentDoc,
	ComponentMeta,
	PartApi,
} from "@/features/components/types";

interface Sources {
	examples: Record<string, { source: string }>;
}

const fence = (code: string) => `\`\`\`tsx\n${code.trimEnd()}\n\`\`\``;

/**
 * A component page as Markdown, for pasting into an editor or a chat: the
 * import, every example with its source, and the accessibility notes.
 */
export function pageMarkdown(
	meta: ComponentMeta,
	doc: ComponentDoc,
	code: Sources,
	api: PartApi[],
): string {
	const names = api.map((part) => part.name);
	const statement = names.length
		? `import { ${names.join(", ")} } from "@passui/react/${meta.entry}";`
		: `import "@passui/react/${meta.entry}";`;
	const examples = doc.examples.flatMap((example) => {
		const source = code.examples[example.id]?.source;
		return [
			`### ${example.title}`,
			example.description,
			...(source ? [fence(source)] : []),
		];
	});
	return [
		`# ${meta.name}`,
		meta.summary,
		"## Usage",
		fence(statement),
		"## Examples",
		...examples,
		"## Accessibility",
		doc.accessibility.map((note) => `- ${note}`).join("\n"),
	].join("\n\n");
}
