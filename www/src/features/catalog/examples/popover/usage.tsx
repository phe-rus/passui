import { Button } from "@passui/react/button";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverTitle,
	PopoverTrigger,
} from "@passui/react/popover";

export function PopoverUsage() {
	return (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Storage
			</PopoverTrigger>
			<PopoverContent>
				<PopoverTitle>Almost full</PopoverTitle>
				<PopoverDescription>
					You have used 94% of your space.
				</PopoverDescription>
			</PopoverContent>
		</Popover>
	);
}
