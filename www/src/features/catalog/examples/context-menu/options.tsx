import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@passui/react/context-menu";
import { Text } from "@passui/react/text";
import { useState } from "react";

/** A canvas with a richer menu. Press near an edge to watch the glass drop flip to the side with room. */
export function ContextMenuOptions() {
	const [grid, setGrid] = useState(true);
	const [zoom, setZoom] = useState("100");
	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<ContextMenu>
				<ContextMenuTrigger className="bg-fill/60 flex h-48 w-full items-center justify-center rounded-2xl select-none">
					<Text size="footnote" tone="secondary">
						Right click or long press anywhere. Grid {grid ? "on" : "off"},{" "}
						{zoom}%
					</Text>
				</ContextMenuTrigger>
				<ContextMenuContent className="min-w-56">
					<ContextMenuLabel>Canvas</ContextMenuLabel>
					<ContextMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
						Show grid
					</ContextMenuCheckboxItem>
					<ContextMenuSeparator />
					<ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
						<ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
						<ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
						<ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
					<ContextMenuSeparator />
					<ContextMenuSub>
						<ContextMenuSubTrigger>Export</ContextMenuSubTrigger>
						<ContextMenuSubContent>
							<ContextMenuItem>PNG</ContextMenuItem>
							<ContextMenuItem>SVG</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	);
}
