import {
	ContentUnavailableView,
	type ContentUnavailableViewProps,
} from "@passui/react/content-unavailable-view";
import { defineDocs } from "../types";
import { ContentUnavailableViewEmpty } from "./examples/content-unavailable-view-empty";
import { ContentUnavailableViewSearch } from "./examples/content-unavailable-view-search";
import { ContentUnavailableViewShowcase } from "./examples/content-unavailable-view-showcase";
import { ContentUnavailableViewUsage } from "./examples/content-unavailable-view-usage";
export const contentUnavailableViewDocs =
	defineDocs<ContentUnavailableViewProps>()({
		slug: "content-unavailable-view",
		name: "ContentUnavailableView",
		importPath: "@passui/react/content-unavailable-view",
		controls: {
			title: { kind: "text", default: "No results", required: true },
			description: { kind: "text", default: "Try another search." },
		},
		render: (props) => <ContentUnavailableView {...props} />,
		usage: ContentUnavailableViewUsage,
		showcase: ContentUnavailableViewShowcase,
		examples: [
			{ id: "empty", component: ContentUnavailableViewEmpty },
			{ id: "search", component: ContentUnavailableViewSearch },
		],
	});
