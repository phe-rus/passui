import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@passui/react/context-menu";

export function ContextMenuUsage() {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="text-footnote text-label-secondary bg-fill/60 flex h-32 w-full max-w-sm items-center justify-center rounded-2xl select-none">
				Right click or long press here
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>
					Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem className="text-danger">Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
