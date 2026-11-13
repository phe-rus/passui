import { Button } from "@passui/react/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@passui/react/dialog";
import { useState } from "react";

export function DialogControlled() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open
			</Button>
			<Dialog open={open} onOpenChange={(details) => setOpen(details.open)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Saved</DialogTitle>
						<DialogDescription>Close it from your own code.</DialogDescription>
					</DialogHeader>
					<Button onClick={() => setOpen(false)}>Done</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}
