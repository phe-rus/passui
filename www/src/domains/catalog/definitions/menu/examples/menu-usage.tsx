import { Menu } from "@passui/react/menu";
import { toast } from "@passui/react/toast";

export function MenuUsage() {
	return (
		<Menu
			label="More actions"
			items={[{ label: "Refresh", onSelect: () => toast("Refreshed") }]}
		>
			More
		</Menu>
	);
}
