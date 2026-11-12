import { Accordion } from "@passui/react/accordion";
import { Toggle } from "@passui/react/toggle";
import { useState } from "react";

export function AccordionSettings() {
	const [value, setValue] = useState<string | null>("notifications");
	const [enabled, setEnabled] = useState(true);
	return (
		<Accordion
			className="max-w-lg"
			value={value}
			onValueChange={setValue}
			items={[
				{
					value: "notifications",
					title: "Notifications",
					content: (
						<Toggle
							label="Product updates"
							checked={enabled}
							onChange={setEnabled}
						/>
					),
				},
				{
					value: "privacy",
					title: "Privacy",
					content: (
						<p className="text-footnote text-label-secondary">
							Review your data preferences.
						</p>
					),
				},
			]}
		/>
	);
}
