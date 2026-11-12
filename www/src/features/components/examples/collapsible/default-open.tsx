import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@passui/react/collapsible";

export function CollapsibleDefaultOpen() {
	return (
		<Collapsible defaultOpen className="w-full max-w-sm">
			<CollapsibleTrigger className="font-semibold">
				Release notes
			</CollapsibleTrigger>
			<CollapsibleContent className="text-subheadline text-label-secondary pt-2">
				New components, smaller bundles.
			</CollapsibleContent>
		</Collapsible>
	);
}
