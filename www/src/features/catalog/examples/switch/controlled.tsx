import { Switch } from "@passui/react/switch";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function SwitchControlled() {
	const [on, setOn] = useState(true);
	return (
		<div className="flex flex-col gap-3">
			<Switch checked={on} onCheckedChange={setOn}>
				Wi-Fi
			</Switch>
			<Text size="footnote" tone="secondary">
				{on ? "On" : "Off"}
			</Text>
		</div>
	);
}
