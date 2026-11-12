import { CodeBlockHighlight } from "../examples/code-block/highlight";
import { CodeBlockMultiline } from "../examples/code-block/multiline";
import { CodeBlockPlain } from "../examples/code-block/plain";
import { CodeBlockShowcase } from "../examples/code-block/showcase";
import { CodeBlockUsage } from "../examples/code-block/usage";
import { CodeBlockWrap } from "../examples/code-block/wrap";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "highlight",
			title: "Highlighted lines",
			description:
				"`highlightLines` marks the lines a paragraph is about with a soft accent band. A title, language and copy button make the header.",
			Demo: CodeBlockHighlight,
		},
		{
			id: "wrap",
			title: "Wrapping",
			description:
				"`wrap` breaks long lines instead of scrolling sideways, which suits commands.",
			Demo: CodeBlockWrap,
		},
		{
			id: "multiline",
			title: "Multiple lines",
			description:
				"The gutter follows every source line, including empty lines.",
			Demo: CodeBlockMultiline,
		},
		{
			id: "plain",
			title: "Plain source",
			description: "Keep short snippets simple.",
			Demo: CodeBlockPlain,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: CodeBlockShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: CodeBlockUsage },
	],
	accessibility: [
		"Use concise, localized labels that describe the current context.",
	],
};
