import { SegmentedControl } from "@passui/react/segmented-control";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function SegmentedControlControlled() {
	const [range, setRange] = useState("day");
	return (
		<div className="flex flex-col items-start gap-3">
			<SegmentedControl
				aria-aria-label="Range"
				value={range}
				onValueChange={setRange}
				options={[
					{ value: "day", label: "Day" },
					{ value: "week", label: "Week" },
				]}
			/>
			<Text size="footnote" tone="secondary">
				Showing {range}
			</Text>
		</div>
	);
}
