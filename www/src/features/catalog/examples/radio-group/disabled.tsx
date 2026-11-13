import { RadioGroup, RadioGroupItem } from "@passui/react/radio-group";

export function RadioGroupDisabled() {
	return (
		<RadioGroup defaultValue="monthly" aria-label="Billing">
			<RadioGroupItem value="monthly">Monthly</RadioGroupItem>
			<RadioGroupItem value="yearly">Yearly</RadioGroupItem>
			<RadioGroupItem value="lifetime" disabled>
				Lifetime (sold out)
			</RadioGroupItem>
		</RadioGroup>
	);
}
