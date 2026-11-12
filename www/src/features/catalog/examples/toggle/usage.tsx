import { BoldIcon } from "@passui/icons/bold";
import { Toggle } from "@passui/react/toggle";

export function ToggleUsage() {
	return (
		<Toggle aria-label="Bold" size="sm">
			<BoldIcon size={16} />
		</Toggle>
	);
}
