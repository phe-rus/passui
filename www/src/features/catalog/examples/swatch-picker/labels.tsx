import { Badge } from "@passui/react/badge";
import { SwatchPicker } from "@passui/react/swatch-picker";
import { useState } from "react";

const colors = [
	{
		value: "family",
		label: "Green",
		color: "#e3f3eb",
		ink: "#24704f",
	},
	{
		value: "public",
		label: "Blue",
		color: "#e8efff",
		ink: "#2c55b8",
	},
	{
		value: "friends",
		label: "Purple",
		color: "#ede8ff",
		ink: "#5a3fc0",
	},
] as const;

export function SwatchPickerLabels() {
	const [tone, setTone] = useState<(typeof colors)[number]["value"]>("family");

	return (
		<div className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col gap-4 rounded-4xl p-6 shadow-sm ring-1">
			<div className="flex items-center justify-between">
				<span className="text-subheadline text-label font-medium">
					Tag color
				</span>
				<Badge variant="secondary">Weekend trip</Badge>
			</div>
			<SwatchPicker
				label="Tag color"
				options={[...colors]}
				value={tone}
				onChange={setTone}
			/>
		</div>
	);
}
