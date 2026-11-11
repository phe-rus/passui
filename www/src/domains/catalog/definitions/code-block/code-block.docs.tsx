import { CodeBlock, type CodeBlockProps } from "@passui/react/code-block";
import { defineDocs } from "../types";
import { CodeBlockUsage } from "./examples/code-block-usage";
import { CodeBlockShowcase } from "./examples/code-block-showcase";
import { CodeBlockPlain } from "./examples/code-block-plain";
import { CodeBlockMultiline } from "./examples/code-block-multiline";
export const codeBlockDocs = defineDocs<CodeBlockProps>()({
	slug: "code-block",
	name: "CodeBlock",
	importPath: "@passui/react/code-block",
	controls: {
		code: {
			kind: "text",
			default: 'const greeting = "Hello, Passui"',
			required: true,
		},
		lineNumbers: { kind: "boolean", default: true },
	},
	render: (props) => <CodeBlock {...props} />,
	usage: CodeBlockUsage,
	showcase: CodeBlockShowcase,
	examples: [
		{ id: "plain", component: CodeBlockPlain },
		{ id: "multiline", component: CodeBlockMultiline },
	],
});
