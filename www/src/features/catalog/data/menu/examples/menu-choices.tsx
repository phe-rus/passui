import { Menu } from "@passui/react/menu";
import { useState } from "react";

export function MenuChoices() {
	const [order, setOrder] = useState("Newest");
	return (
		<Menu
			label={`Sort: ${order}`}
			edge="trailing"
			items={["Newest", "Oldest", "Alphabetical"].map((item) => ({
				label: item,
				checked: item === order,
				onSelect: () => setOrder(item),
			}))}
		>
			Sort: {order}
		</Menu>
	);
}
