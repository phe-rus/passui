import { SegmentedControl } from "@passui/react/segmented-control";
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
			<p className="text-footnote text-label-secondary">Showing {range}</p>
		</div>
	);
}
