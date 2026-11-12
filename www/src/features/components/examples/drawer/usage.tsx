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

export function DrawerUsage() {
	return (
		<Drawer>
			<DrawerTrigger render={<Button variant="outline" />}>
				Open drawer
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHandle />
				<DrawerHeader>
					<DrawerTitle>Move to folder</DrawerTitle>
					<DrawerDescription>Drag down to dismiss.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<DrawerClose render={<Button />}>Done</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
