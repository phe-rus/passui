import { Slider } from "@passui/react/slider";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function SliderRange() {
	const [range, setRange] = useState([20, 70]);
	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Slider value={range} onValueChange={setRange} />
			<Text size="footnote" tone="secondary">
				{range[0]} to {range[1]}
			</Text>
		</div>
	);
}
