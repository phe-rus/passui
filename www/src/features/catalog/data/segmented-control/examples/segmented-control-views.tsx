import { SegmentedControl } from "@passui/react";
import { useState } from "react";

const counts = { day: 4, week: 23, month: 96 };

export function SegmentedControlViews() {
	const [range, setRange] = useState<keyof typeof counts>("week");

	return (
		<div className="bg-elevated ring-separator/60 flex w-full max-w-sm flex-col gap-4 rounded-4xl p-5 shadow-sm ring-1">
			<SegmentedControl
				label="Range"
				value={range}
				onChange={setRange}
				options={[
					{ value: "day", label: "Day" },
					{ value: "week", label: "Week" },
					{ value: "month", label: "Month" },
				]}
			/>
			<div className="flex flex-col items-center gap-1 py-2">
				<span className="text-large-title text-label font-bold tabular-nums">
					{counts[range]}
				</span>
				<span className="text-footnote text-label-secondary">
					sign-ins this {range}
				</span>
			</div>
		</div>
	);
}
