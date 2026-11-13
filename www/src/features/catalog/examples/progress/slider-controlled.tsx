import { Slider } from "@passui/react/slider";
import { Text } from "@passui/react/text";
import { useState } from "react";

export function ProgressSliderControlled() {
	const [value, setValue] = useState([6]);
	return (
		<div className="flex max-w-xs flex-col gap-3">
			<Slider
				value={value}
				onValueChange={setValue}
				min={0}
				max={10}
				step={1}
				aria-label={["Rating"]}
			/>
			<Text size="footnote" tone="secondary">
				Rating {value[0]} of 10
			</Text>
		</div>
	);
}
