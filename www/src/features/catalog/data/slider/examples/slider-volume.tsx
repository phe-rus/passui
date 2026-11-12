import { Slider } from "@passui/react/slider";
import { useState } from "react";

export function SliderVolume() {
	const [value, setValue] = useState(20);
	return (
		<Slider
			label="Playback volume"
			value={value}
			onChange={setValue}
			step={5}
			description="Use the arrow keys to adjust by 5."
		/>
	);
}
