import { WakeSlider } from "@passui/react/wake-slider";
import { useState } from "react";

export function WakeSliderQuiet() {
	const [value, setValue] = useState(50);
	return (
		<div className="w-full max-w-xs">
			<WakeSlider
				value={value}
				onChange={setValue}
				label="Quiet seeker"
				bars={48}
				wake={0}
			/>
		</div>
	);
}
