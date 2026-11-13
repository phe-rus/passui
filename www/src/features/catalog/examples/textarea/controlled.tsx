import { Text } from "@passui/react/text";
import { Textarea } from "@passui/react/textarea";
import { useState } from "react";

export function TextareaControlled() {
	const [value, setValue] = useState("");
	return (
		<div className="flex w-full max-w-sm flex-col gap-1.5">
			<Textarea
				aria-label="Note"
				maxLength={140}
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<Text size="footnote" tone="secondary" className="text-end">
				{value.length} / 140
			</Text>
		</div>
	);
}
