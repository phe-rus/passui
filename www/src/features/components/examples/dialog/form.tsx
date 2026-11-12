import { Button } from "@passui/react/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@passui/react/dialog";
import { Input } from "@passui/react/input";
import { useState } from "react";

/** Controlled with `open` and `onOpenChange`, so the form can close it itself. */
export function DialogForm() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("Untitled");
	return (
		<Dialog open={open} onOpenChange={(details) => setOpen(details.open)}>
			<DialogTrigger render={<Button variant="outline" />}>
				Name: {name}
			</DialogTrigger>
			<DialogContent>
				<form
					className="grid gap-4"
					onSubmit={(event) => {
						event.preventDefault();
						setName(new FormData(event.currentTarget).get("name") as string);
						setOpen(false);
					}}
				>
					<DialogHeader>
						<DialogTitle>Edit name</DialogTitle>
						<DialogDescription>Shown in your library.</DialogDescription>
					</DialogHeader>
					<Input aria-label="Name" name="name" defaultValue={name} />
					<DialogFooter>
						<Button type="submit">Save</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
