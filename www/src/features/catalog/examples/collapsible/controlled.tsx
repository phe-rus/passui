import { Button } from "@passui/react/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@passui/react/collapsible";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function CollapsibleControlled() {
	const [open, setOpen] = useState(false);
	return (
		<Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm">
			<CollapsibleTrigger render={<Button variant="outline" />}>
				{open ? "Hide" : "Show"} advanced options
			</CollapsibleTrigger>
			<CollapsibleContent className="pt-3">
				<Text tone="secondary">Cache, retries and timeouts live here.</Text>
			</CollapsibleContent>
		</Collapsible>
	);
}
