import { Button } from "@passui/react/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHandle,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@passui/react/drawer";

/** Numeric snap points are fractions of the panel's height. */
export function DrawerSnapPoints() {
	return (
		<Drawer snapPoints={[0.4, 1]} defaultSnapPoint={0.4}>
			<DrawerTrigger render={<Button variant="outline" />}>
				Open with snap points
			</DrawerTrigger>
			<DrawerContent className="h-96">
				<DrawerHandle />
				<DrawerHeader>
					<DrawerTitle>Details</DrawerTitle>
					<DrawerDescription>
						Drag up for the full view, or down to dismiss.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerClose render={<Button variant="ghost" />}>Close</DrawerClose>
			</DrawerContent>
		</Drawer>
	);
}
