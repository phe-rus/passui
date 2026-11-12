import { Button } from "@passui/react/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@passui/react/sheet";
import { Switch } from "@passui/react/switch";
import { useState } from "react";

/** A sheet that holds a small form. Hold `open` yourself so Apply can close it. */
export function SheetFilters() {
	const [open, setOpen] = useState(false);
	const [pinned, setPinned] = useState(true);
	const [attachments, setAttachments] = useState(false);
	const count = Number(pinned) + Number(attachments);
	return (
		<Sheet open={open} onOpenChange={(details) => setOpen(details.open)}>
			<SheetTrigger render={<Button variant="outline" />}>
				Filters{count > 0 ? ` · ${count}` : ""}
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Filter notes</SheetTitle>
					<SheetDescription>Choose what the list shows.</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-4 py-6">
					<Switch checked={pinned} onCheckedChange={setPinned}>
						Pinned only
					</Switch>
					<Switch checked={attachments} onCheckedChange={setAttachments}>
						With attachments
					</Switch>
				</div>
				<SheetFooter>
					<SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
					<Button onClick={() => setOpen(false)}>Apply</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
