import { useState } from "react";
import { Stepper } from "@passui/react/stepper";

export function StepperShowcase() {
	const [adults, setAdults] = useState(2);
	const [children, setChildren] = useState(0);
	return (
		<section className="bg-surface flex w-full max-w-md flex-col gap-4 rounded-3xl p-5">
			<Stepper
				label="Adults"
				labels={{ decrement: "Fewer adults", increment: "More adults" }}
				value={adults}
				onChange={setAdults}
				min={1}
				max={8}
			/>
			<Stepper
				label="Children"
				labels={{ decrement: "Fewer children", increment: "More children" }}
				value={children}
				onChange={setChildren}
				min={0}
				max={8}
			/>
		</section>
	);
}
