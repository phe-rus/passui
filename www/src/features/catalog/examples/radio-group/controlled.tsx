import { RadioGroup, RadioGroupItem } from "@passui/react/radio-group";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function RadioGroupControlled() {
	const [value, setValue] = useState<string | null>("free");
	return (
		<div className="flex flex-col gap-3">
			<RadioGroup value={value} onValueChange={setValue} aria-label="Plan">
				<RadioGroupItem value="free">Free</RadioGroupItem>
				<RadioGroupItem value="pro">Pro</RadioGroupItem>
			</RadioGroup>
			<Text size="footnote" tone="secondary">
				Plan: {value}
			</Text>
		</div>
	);
}
