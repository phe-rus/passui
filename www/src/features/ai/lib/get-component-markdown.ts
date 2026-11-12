import type {
	ComponentDoc,
	ComponentMeta,
	PartApi,
} from "@/features/catalog/types";
import type { DocCode } from "@/features/docs/lib/highlight.server";

const fence = (code: string) => `\`\`\`tsx\n${code.trimEnd()}\n\`\`\``;

/**
 * One component's page as Markdown, for pasting into an AI chat: what it is, its
 * import, every example with its source, and its accessibility notes. Built from
 * the same data as the page, so an assistant reads what the page says.
 */
export function getComponentMarkdown(
	meta: ComponentMeta,
	doc: ComponentDoc,
	code: DocCode,
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
