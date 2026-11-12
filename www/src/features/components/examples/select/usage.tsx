import { Select } from "@passui/react/select";

export function SelectUsage() {
	return (
		<Select
			aria-label="Fruit"
			className="max-w-xs"
			placeholder="Pick a fruit"
			items={[
				{ value: "apple", label: "Apple" },
				{ value: "banana", label: "Banana" },
				{ value: "cherry", label: "Cherry", disabled: true },
			]}
		/>
	);
}
