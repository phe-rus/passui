import { Combobox } from "@passui/react/combobox";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function ComboboxControlled() {
	const [value, setValue] = useState<string | null>(null);
	return (
		<div className="flex flex-col gap-3">
			<Combobox
				aria-label="Country"
				value={value}
				onValueChange={setValue}
				items={[
					{ value: "ke", label: "Kenya" },
					{ value: "tz", label: "Tanzania" },
					{ value: "ug", label: "Uganda" },
				]}
			/>
			<Text size="footnote" tone="secondary">
				Chosen: {value ?? "nothing"}
			</Text>
		</div>
	);
}
