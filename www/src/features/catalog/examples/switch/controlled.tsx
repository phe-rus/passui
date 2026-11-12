import { Switch } from "@passui/react/switch";
import { useState } from "react";

export function SwitchControlled() {
	const [on, setOn] = useState(true);
	return (
		<div className="flex flex-col gap-3">
			<Switch checked={on} onCheckedChange={setOn}>
				Wi-Fi
			</Switch>
			<p className="text-footnote text-label-secondary">{on ? "On" : "Off"}</p>
		</div>
	);
}
