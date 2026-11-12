import { CodeBlock } from "@passui/react/code-block";

const command =
	"bunx @passui/cli@latest create my-app --template tanstack --pm bun --no-install --dry-run";

export function CodeBlockWrap() {
	return (
		<div className="w-full max-w-md">
			<CodeBlock
				code={command}
				language="Shell"
				lineNumbers={false}
				wrap
				copyable
			/>
		</div>
	);
}
