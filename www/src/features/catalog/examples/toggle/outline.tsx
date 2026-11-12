import { ItalicIcon } from "@passui/icons/italic";
import { Toggle } from "@passui/react/toggle";

export function ToggleOutline() {
	return (
		<Toggle variant="outline" defaultPressed aria-label="Italic">
			<ItalicIcon size={16} /> Italic
		</Toggle>
	);
}
