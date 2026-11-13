import { Progress } from "@passui/react/progress";
import { useState } from "react";

export function ProgressWake() {
	const [value, setValue] = useState(50);
	return (
		<div className="w-full max-w-sm">
			<Progress
				variant="wake"
				label="Playback position"
				value={value}
				onValueChange={setValue}
				formatValue={(next) => `${next}%`}
			/>
		</div>
	);
}
