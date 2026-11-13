import { SegmentedControl } from "@passui/react/segmented-control";

export function SegmentedControlMany() {
	return (
		<SegmentedControl
			aria-label="Range"
			defaultValue="week"
			options={[
				{ value: "day", label: "Day" },
				{ value: "week", label: "Week" },
				{ value: "month", label: "Month" },
				{ value: "year", label: "Year" },
			]}
		/>
	);
}
