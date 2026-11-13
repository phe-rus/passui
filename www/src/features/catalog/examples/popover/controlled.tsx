import { Button } from "@passui/react/button";
import {
	Popover,
	PopoverContent,
	PopoverTitle,
	PopoverTrigger,
} from "@passui/react/popover";
import { useState } from "react";

export function PopoverControlled() {
	const [open, setOpen] = useState(false);
	return (
		<Popover open={open} onOpenChange={(details) => setOpen(details.open)}>
			<PopoverTrigger render={<Button variant="outline" />}>
				Archive
			</PopoverTrigger>
			<PopoverContent className="flex flex-col gap-3">
				<PopoverTitle>Archive this?</PopoverTitle>
				<Button size="sm" onClick={() => setOpen(false)}>
					Archive
				</Button>
			</PopoverContent>
		</Popover>
	);
}
