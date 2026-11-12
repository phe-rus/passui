import { MenuIcon } from "@passui/icons/menu";
import { Button } from "@passui/react/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@passui/react/sheet";
import { useState } from "react";
import { DocsSidebar } from "../docs/docs-sidebar";

/** The docs navigation on phones, in a Sheet from the left. */
export function MobileNav() {
	const [open, setOpen] = useState(false);
	return (
		<Sheet
			side="left"
			open={open}
			onOpenChange={({ open: next }) => setOpen(next)}
		>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon-sm"
						aria-label="Open navigation"
						className="md:hidden"
					/>
				}
			>
				<MenuIcon size={20} />
			</SheetTrigger>
			<SheetContent className="w-72 overflow-y-auto p-4">
				<SheetTitle className="sr-only">Documentation</SheetTitle>
				<DocsSidebar onNavigate={() => setOpen(false)} />
			</SheetContent>
		</Sheet>
	);
}
