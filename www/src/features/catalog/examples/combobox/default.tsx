import { Combobox } from "@passui/react/combobox";

export function ComboboxDefault() {
	return (
		<Combobox
			aria-label="Language"
			defaultValue="fr"
			items={[
				{ value: "en", label: "English" },
				{ value: "fr", label: "Français" },
				{ value: "ja", label: "日本語" },
			]}
		/>
	);
}
