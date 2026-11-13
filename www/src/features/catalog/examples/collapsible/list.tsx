import { Button } from "@passui/react/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@passui/react/collapsible";
import { Text } from "@passui/react/text";

export function CollapsibleList() {
	return (
		<Collapsible className="flex w-full max-w-sm flex-col gap-2">
			<Text>Mira, Kenji and Aiko</Text>
			<CollapsibleContent className="flex flex-col gap-2">
				<Text tone="secondary">Ben</Text>
				<Text tone="secondary">Sofia</Text>
			</CollapsibleContent>
			<CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
				Show everyone
			</CollapsibleTrigger>
		</Collapsible>
	);
}
