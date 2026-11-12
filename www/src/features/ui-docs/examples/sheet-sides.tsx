import { Button } from "@passui/react/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@passui/react/sheet";

const sides = ["top", "right", "bottom", "left"] as const;

export function SheetSides() {
	return (
		<div className="flex flex-wrap gap-3">
			{sides.map((side) => (
				<Sheet key={side} side={side}>
					<SheetTrigger render={<Button variant="outline" />}>
						{side}
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>From the {side}</SheetTitle>
						</SheetHeader>
						<SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
					</SheetContent>
				</Sheet>
			))}
		</div>
	);
}
