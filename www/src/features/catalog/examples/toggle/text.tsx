import { BoldIcon } from "@passui/icons/bold";
import { Toggle } from "@passui/react/toggle";

export function ToggleText() {
	return (
		<Toggle aria-label="Bold">
			<BoldIcon size={16} />
			Bold
		</Toggle>
	);
}
