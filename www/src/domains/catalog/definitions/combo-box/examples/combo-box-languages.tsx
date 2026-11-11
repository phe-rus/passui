import { useState } from "react";
import { ComboBox } from "@passui/react/combo-box";
export function ComboBoxLanguages() {
	const options = [
		{ value: "en", label: "English" },
		{ value: "sw", label: "Kiswahili" },
		{ value: "ja", label: "日本語" },
	];
	const [value, setValue] = useState("en");
	return (
		<ComboBox
			label="Language"
			value={value}
			onChange={setValue}
			options={options}
			emptyLabel="No languages found"
		/>
	);
}
