import { Button } from "@passui/react/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@passui/react/collapsible";

export function CollapsibleUsage() {
	return (
		<Collapsible className="w-full max-w-sm">
			<CollapsibleTrigger render={<Button variant="outline" />}>
				Show details
			</CollapsibleTrigger>
			<CollapsibleContent className="text-subheadline text-label-secondary pt-3">
				Built on the Zag collapsible machine.
			</CollapsibleContent>
		</Collapsible>
	);
}
