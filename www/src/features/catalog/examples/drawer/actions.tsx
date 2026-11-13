import { Button } from "@passui/react/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHandle,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@passui/react/drawer";

export function DrawerActions() {
	return (
		<Drawer>
			<DrawerTrigger render={<Button variant="outline" />}>Share</DrawerTrigger>
			<DrawerContent>
				<DrawerHandle />
				<DrawerHeader>
					<DrawerTitle>Share this note</DrawerTitle>
					<DrawerDescription>Choose how to send it.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button>Copy link</Button>
					<DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
