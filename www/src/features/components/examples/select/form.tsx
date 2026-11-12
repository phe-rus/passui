import { Select } from "@passui/react/select";

export function SelectForm() {
	return (
		<Select
			name="country"
			aria-label="Country"
			className="max-w-xs"
			items={[
				{ value: "ke", label: "Kenya" },
				{ value: "tz", label: "Tanzania" },
			]}
		/>
	);
}
