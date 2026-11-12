import { CodeBlock } from "@passui/react/code-block";

export function CodeBlockMultiline() {
	return (
		<CodeBlock
			code={
				'import { Button } from "@passui/react/legacy/button"\n\nexport const Action = () => <Button>Continue</Button>'
			}
		/>
	);
}
