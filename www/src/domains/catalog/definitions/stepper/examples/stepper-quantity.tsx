import { useState } from "react";
import { Stepper } from "@passui/react/stepper";

export function StepperQuantity() {
	const [quantity, setQuantity] = useState(3);
	return (
		<Stepper
			label="Items"
			labels={{ decrement: "Remove one", increment: "Add one" }}
			value={quantity}
			onChange={setQuantity}
			min={0}
			max={10}
		/>
	);
}
