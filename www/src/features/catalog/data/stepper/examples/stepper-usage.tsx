import { Stepper } from "@passui/react/stepper";
import { useState } from "react";

export function StepperUsage() {
	const [copies, setCopies] = useState(1);
	return (
		<Stepper
			label="Copies"
			labels={{ decrement: "Fewer copies", increment: "More copies" }}
			value={copies}
			onChange={setCopies}
			min={1}
			max={20}
		/>
	);
}
