import { CodeBlockMultiline } from "../examples/code-block/multiline";
import { CodeBlockPlain } from "../examples/code-block/plain";
import { CodeBlockShowcase } from "../examples/code-block/showcase";
import { CodeBlockUsage } from "../examples/code-block/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
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
