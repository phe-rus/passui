import { Stepper } from "@passui/react/stepper";
import { useState } from "react";

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
