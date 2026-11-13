import { Progress } from "@passui/react/progress";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function ProgressSloshViscosity() {
	const [value, setValue] = useState(40);
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<Progress
				variant="slosh"
				label="Rigid"
				viscosity={0}
				value={value}
				onValueChange={setValue}
			/>
			<Progress
				variant="slosh"
				label="Loose"
				viscosity={70}
				defaultValue={40}
			/>
			<Text size="footnote" tone="secondary">
				Rigid reads {value}. Drag the loose one fast and let go.
			</Text>
		</div>
	);
}
