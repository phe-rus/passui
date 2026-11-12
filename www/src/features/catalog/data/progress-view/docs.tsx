import {
	ProgressView,
	type ProgressViewProps,
} from "@passui/react/progress-view";
import { defineDocs } from "../types";
import { ProgressViewIndeterminate } from "./examples/progress-view-indeterminate";
import { ProgressViewShowcase } from "./examples/progress-view-showcase";
import { ProgressViewUploading } from "./examples/progress-view-uploading";
import { ProgressViewUsage } from "./examples/progress-view-usage";

export const progressViewDocs = defineDocs<ProgressViewProps>()({
	slug: "progress-view",
	name: "ProgressView",
	importPath: "@passui/react/progress-view",
	controls: {
		label: { kind: "text", default: "Uploading files", required: true },
		size: {
			kind: "select",
			options: { sm: true, md: true, lg: true },
			default: "md",
		},
		detail: { kind: "text", default: "42%" },
	},
	render: (values) => <ProgressView {...values} value={42} />,
	childrenSnippet: () => ({
		imports: [],
		children: "",
		expressionProps: { value: "42" },
	}),
	usage: ProgressViewUsage,
	showcase: ProgressViewShowcase,
	examples: [
		{ id: "uploading", component: ProgressViewUploading },
		{ id: "indeterminate", component: ProgressViewIndeterminate },
	],
});
