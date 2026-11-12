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

export function SheetUsage() {
	return (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>
				Open settings
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription>Swipe right to dismiss.</SheetDescription>
				</SheetHeader>
				<SheetFooter>
					<SheetClose render={<Button />}>Done</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
