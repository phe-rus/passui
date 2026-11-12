import { Button } from "@passui/react/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@passui/react/dialog";

export function DialogUsage() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Rename note
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rename note</DialogTitle>
					<DialogDescription>Pick a new name for this note.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
					<DialogClose render={<Button />}>Save</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
