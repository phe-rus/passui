import { ToggleGroup, ToggleGroupItem } from "@passui/react/toggle-group";

export function ToggleGroupMultiple() {
	return (
		<ToggleGroup multiple defaultValue={["bold"]} aria-label="Formatting">
			<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
			<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
			<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
		</ToggleGroup>
	);
}
