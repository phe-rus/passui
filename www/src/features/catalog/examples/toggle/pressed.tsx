import { BoldIcon } from "@passui/icons/bold";
import { Toggle } from "@passui/react/toggle";

export function TogglePressed() {
	return (
		<Toggle aria-label="Bold" defaultPressed>
			<BoldIcon size={16} />
		</Toggle>
	);
}
