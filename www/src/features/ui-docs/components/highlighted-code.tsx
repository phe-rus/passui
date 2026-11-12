import { CodeBlock } from "@passui/react/code-block";

/** Server highlighted HTML inside the shared code display styles. */
export function HighlightedCode({ html }: { html: string }) {
	return (
		<CodeBlock
			code=""
			lineNumbers={false}
			className="bg-fill/50 rounded-2xl text-left"
		>
			<div
				className="overflow-x-auto"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</CodeBlock>
	);
}
