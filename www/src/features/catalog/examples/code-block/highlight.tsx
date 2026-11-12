import { CodeBlock } from "@passui/react/code-block";

const source = `import { Button } from "@passui/react/button";

export function Save() {
	return <Button>Save changes</Button>;
}`;

export function CodeBlockHighlight() {
	return (
		<div className="w-full max-w-md">
			<CodeBlock
				code={source}
				title="save.tsx"
				language="TypeScript JSX"
				highlightLines={[4]}
				copyable
			/>
		</div>
	);
}
