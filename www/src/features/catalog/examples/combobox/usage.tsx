import { Combobox } from "@passui/react/combobox";

export function ComboboxUsage() {
	return (
		<Combobox
			aria-label="Framework"
			placeholder="Search frameworks"
			items={[
				{ value: "react", label: "React" },
				{ value: "solid", label: "Solid" },
				{ value: "svelte", label: "Svelte" },
				{ value: "vue", label: "Vue" },
			]}
		/>
	);
}
