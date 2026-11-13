import { Button } from "@passui/react/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHandle,
	DrawerHeader,
	DrawerTitle,
} from "@passui/react/drawer";
import { useState } from "react";

export function DrawerControlled() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open
			</Button>
			<Drawer open={open} onOpenChange={(details) => setOpen(details.open)}>
				<DrawerContent>
					<DrawerHandle />
					<DrawerHeader>
						<DrawerTitle>Saved</DrawerTitle>
						<DrawerDescription>Close it from your own code.</DrawerDescription>
					</DrawerHeader>
					<Button variant="ghost" onClick={() => setOpen(false)}>
						Close
					</Button>
				</DrawerContent>
			</Drawer>
		</>
	);
}
