import { useState } from "react";
import { Slider } from "@passui/react/slider";

export function SliderUsage() {
	const [volume, setVolume] = useState(35);
	return (
		<Slider
			label="Volume"
			value={volume}
			onChange={setVolume}
			formatValue={(value) => `${value}%`}
		/>
	);
}
