import { SegmentedControl } from "@passui/react/segmented-control";

export function SegmentedControlTwo() {
	return (
		<SegmentedControl
			aria-label="Appearance"
			defaultValue="light"
			options={[
				{ value: "light", label: "Light" },
				{ value: "dark", label: "Dark" },
			]}
		/>
	);
}
