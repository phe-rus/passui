import { ToggleGroup, ToggleGroupItem } from "@passui/react/toggle-group";

export function ToggleGroupUsage() {
	return (
		<ToggleGroup defaultValue={["left"]} aria-label="Align">
			<ToggleGroupItem value="left">Left</ToggleGroupItem>
			<ToggleGroupItem value="center">Center</ToggleGroupItem>
			<ToggleGroupItem value="right">Right</ToggleGroupItem>
		</ToggleGroup>
	);
}
