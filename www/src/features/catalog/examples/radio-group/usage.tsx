import { RadioGroup, RadioGroupItem } from "@passui/react/radio-group";

export function RadioGroupUsage() {
	return (
		<RadioGroup defaultValue="comfortable" aria-label="Density">
			<RadioGroupItem value="compact">Compact</RadioGroupItem>
			<RadioGroupItem value="comfortable">Comfortable</RadioGroupItem>
			<RadioGroupItem value="spacious">Spacious</RadioGroupItem>
		</RadioGroup>
	);
}
