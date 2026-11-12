import { Skeleton } from "@passui/react/skeleton";
import { defineDocs } from "../types";
import { SkeletonUsage } from "./examples/skeleton-usage";
import { SkeletonShowcase } from "./examples/skeleton-showcase";
import { SkeletonText } from "./examples/skeleton-text";
import { SkeletonProfile } from "./examples/skeleton-profile";

export const skeletonDocs = defineDocs<{ label: string }>()({
	slug: "skeleton",
	name: "Skeleton",
	importPath: "@passui/react/skeleton",
	controls: {
		label: { kind: "text", default: "Loading content", required: true },
	},
	render: (props) => <Skeleton {...props} className="h-16 w-64" />,

	usage: SkeletonUsage,
	showcase: SkeletonShowcase,
	examples: [
		{ id: "text", component: SkeletonText },
		{ id: "profile", component: SkeletonProfile },
	],
});
