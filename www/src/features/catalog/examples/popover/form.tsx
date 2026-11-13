import { Button } from "@passui/react/button";
import { Input } from "@passui/react/input";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverTitle,
	PopoverTrigger,
} from "@passui/react/popover";

export function PopoverForm() {
	return (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Rename
			</PopoverTrigger>
			<PopoverContent className="flex w-64 flex-col gap-3">
				<PopoverTitle>Rename note</PopoverTitle>
				<PopoverDescription>Give it a clearer name.</PopoverDescription>
				<Input aria-label="Name" defaultValue="Untitled" />
				<Button size="sm">Save</Button>
			</PopoverContent>
		</Popover>
	);
}
