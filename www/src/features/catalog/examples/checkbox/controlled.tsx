import { Checkbox } from "@passui/react/checkbox";
import { useState } from "react";

export function CheckboxControlled() {
	const [items, setItems] = useState([true, false]);
	const all = items.every(Boolean);
	const some = items.some(Boolean);
	return (
		<div className="flex flex-col gap-3">
			<Checkbox
				checked={all ? true : some ? "indeterminate" : false}
				onCheckedChange={(next) => setItems([next === true, next === true])}
			>
				Everything
			</Checkbox>
			<div className="flex flex-col gap-2 ps-8">
				<Checkbox
					checked={items[0]}
					onCheckedChange={(v) => setItems([v === true, items[1] ?? false])}
				>
					Mail
				</Checkbox>
				<Checkbox
					checked={items[1]}
					onCheckedChange={(v) => setItems([items[0] ?? false, v === true])}
				>
					Calendar
				</Checkbox>
			</div>
		</div>
	);
}
