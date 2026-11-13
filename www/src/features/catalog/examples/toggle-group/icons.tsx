import { BoldIcon } from "@passui/icons/bold";
import { ItalicIcon } from "@passui/icons/italic";
import { ToggleGroup, ToggleGroupItem } from "@passui/react/toggle-group";

export function ToggleGroupIcons() {
	return (
		<ToggleGroup aria-label="Formatting" multiple>
			<ToggleGroupItem value="bold" aria-label="Bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
