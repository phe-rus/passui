import { useState } from "react";
import { Stepper } from "@passui/react/stepper";

export function StepperFractions() {
	const [weight, setWeight] = useState(1.5);
	return (
		<Stepper
			label="Weight"
			labels={{ decrement: "Less weight", increment: "More weight" }}
			value={weight}
			onChange={setWeight}
			min={0.5}
			max={5}
			step={0.25}
			formatValue={(value) => `${value} kg`}
		/>
	);
}
