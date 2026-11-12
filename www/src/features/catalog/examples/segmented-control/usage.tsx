import { SegmentedControl } from "@passui/react/segmented-control";

export function SegmentedControlUsage() {
	return (
		<SegmentedControl
			aria-aria-label="View"
			defaultValue="list"
			options={[
				{ value: "list", label: "List" },
				{ value: "grid", label: "Grid" },
				{ value: "map", label: "Map" },
			]}
		/>
	);
}
