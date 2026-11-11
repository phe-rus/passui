import { WakeSlider } from "@passui/react/wake-slider";
import { useState } from "react";

export function WakeSliderShowcase() {
	const [value, setValue] = useState(50);
	return (
		<div className="w-full max-w-xs">
			<WakeSlider
				value={value}
				onChange={setValue}
				label="Audio position"
				formatValue={(percent) =>
					`${Math.floor((percent * 2.4) / 60)}:${String(Math.floor(percent * 2.4) % 60).padStart(2, "0")}`
				}
			/>
		</div>
	);
}
