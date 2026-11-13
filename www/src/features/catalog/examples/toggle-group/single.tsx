import { ToggleGroup, ToggleGroupItem } from "@passui/react/toggle-group";

export function ToggleGroupSingle() {
	return (
		<ToggleGroup defaultValue={["day"]} multiple={false} aria-label="Range">
			<ToggleGroupItem value="day">Day</ToggleGroupItem>
			<ToggleGroupItem value="week">Week</ToggleGroupItem>
			<ToggleGroupItem value="month">Month</ToggleGroupItem>
		</ToggleGroup>
	);
}
