import { Slider } from "@passui/react/slider";
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
			<p className="text-footnote text-label-secondary">
				Rating {value[0]} of 10
			</p>
		</div>
	);
}
