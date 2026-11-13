import { Select } from "@passui/react/select";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function SelectControlled() {
	const [size, setSize] = useState<string | null>("m");
	return (
		<div className="flex max-w-xs flex-col gap-3">
			<Select
				aria-label="Size"
				value={size}
				onValueChange={setSize}
				items={[
					{ value: "s", label: "Small" },
					{ value: "m", label: "Medium" },
					{ value: "l", label: "Large" },
				]}
			/>
			<Text size="footnote" tone="secondary">
				Size: {size ?? "none"}
			</Text>
		</div>
	);
}
