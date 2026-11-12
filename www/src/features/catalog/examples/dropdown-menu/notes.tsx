import { ChecklistIcon } from "@passui/icons/checklist";
import { FolderIcon } from "@passui/icons/folder";
import { MoreIcon } from "@passui/icons/more";
import { PinIcon } from "@passui/icons/pin";
import { TrashIcon } from "@passui/icons/trash";
import { Button } from "@passui/react/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@passui/react/dropdown-menu";
import { useState } from "react";

/** The three dots menu in iOS Notes: the round button swells into the menu and drops back on close. */
export function DropdownMenuNotes() {
	const [view, setView] = useState("list");
	const [last, setLast] = useState("Nothing chosen yet");
	return (
		<div className="flex flex-wrap items-center gap-4">
			<DropdownMenu placement="bottom-end">
				<DropdownMenuTrigger
					render={
						<Button
							variant="secondary"
							size="icon"
							className="rounded-full"
							aria-label="More"
						/>
					}
				>
					<MoreIcon size={20} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-60">
					<DropdownMenuRadioGroup value={view} onValueChange={setView}>
						<DropdownMenuRadioItem value="list">
							View as List
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="gallery">
							View as Gallery
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={() => setLast("Select Notes")}>
						<ChecklistIcon size={16} />
						Select Notes
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setLast("Pin")}>
						<PinIcon size={16} />
						Pin
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setLast("View Attachments")}>
						<FolderIcon size={16} />
						View Attachments
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="text-danger"
						onSelect={() => setLast("Delete")}
					>
						<TrashIcon size={16} />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<p className="text-footnote text-label-secondary">
				{last} · View: {view}
			</p>
		</div>
	);
}
