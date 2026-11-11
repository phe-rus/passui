import { SloshSlider } from "@passui/react/slosh-slider";
import { useState } from "react";

export function SloshSliderDisabled() {
	const [value, setValue] = useState(62);
	return (
		<div className="w-full max-w-xs">
			<SloshSlider
				value={value}
				onChange={setValue}
				label="Unavailable flow"
				disabled
			/>
		</div>
	);
}
