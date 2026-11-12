import { StepperFractions } from "../examples/stepper/fractions";
import { StepperQuantity } from "../examples/stepper/quantity";
import { StepperShowcase } from "../examples/stepper/showcase";
import { StepperUsage } from "../examples/stepper/usage";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "fractions",
			title: "Fractional increments",
			description: "Quarter-unit adjustments without decimal drift.",
			Demo: StepperFractions,
		},
		{
			id: "quantity",
			title: "Item quantity",
			description: "A whole-number selection within limits.",
			Demo: StepperQuantity,
		},
		{
			id: "showcase",
			title: "Showcase",
			description: "",
			Demo: StepperShowcase,
		},
		{ id: "usage", title: "Usage", description: "", Demo: StepperUsage },
	],
	accessibility: ["Provide localized decrement and increment labels."],
};
