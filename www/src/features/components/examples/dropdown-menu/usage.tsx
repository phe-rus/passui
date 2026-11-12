import { Button } from "@passui/react/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@passui/react/dropdown-menu";
import { useState } from "react";

export function DropdownMenuUsage() {
	const [last, setLast] = useState("Nothing chosen yet");
	return (
		<div className="flex flex-wrap items-center gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					Actions
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Note</DropdownMenuLabel>
					<DropdownMenuItem onSelect={() => setLast("Rename")}>
						Rename <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setLast("Duplicate")}>
						Duplicate
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem disabled>Share…</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<span className="text-footnote text-label-secondary">{last}</span>
		</div>
	);
}
