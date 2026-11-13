import { Button } from "@passui/react/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@passui/react/sheet";
import { useState } from "react";

export function SheetControlled() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open
			</Button>
			<Sheet open={open} onOpenChange={(details) => setOpen(details.open)}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Saved</SheetTitle>
						<SheetDescription>Close it from your own code.</SheetDescription>
					</SheetHeader>
					<Button onClick={() => setOpen(false)}>Done</Button>
				</SheetContent>
			</Sheet>
		</>
	);
}
