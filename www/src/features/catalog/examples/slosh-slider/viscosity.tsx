import { SloshSlider } from "@passui/react/slosh-slider";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function SloshSliderViscosity() {
	const [value, setValue] = useState(40);
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<SloshSlider
				label="Rigid"
				viscosity={0}
				value={value}
				onChange={setValue}
			/>
			<SloshSlider label="Loose" viscosity={70} defaultValue={40} />
			<Text size="footnote" tone="secondary">
				Rigid reads {value}. Drag the loose one fast and let go.
			</Text>
		</div>
	);
}
