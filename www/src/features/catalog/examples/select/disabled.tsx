import { Select } from "@passui/react/select";

export function SelectDisabled() {
	return (
		<Select
			aria-label="Region"
			defaultValue="eu"
			items={[
				{ value: "eu", label: "Europe" },
				{ value: "us", label: "United States" },
				{ value: "ap", label: "Asia Pacific", disabled: true },
			]}
		/>
	);
}
