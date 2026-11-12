import { Stepper } from "@passui/react/stepper";
import { useState } from "react";
import { defineDocs } from "../types";
import { StepperFractions } from "./examples/stepper-fractions";
import { StepperQuantity } from "./examples/stepper-quantity";
import { StepperShowcase } from "./examples/stepper-showcase";
import { StepperUsage } from "./examples/stepper-usage";

function StepperDemo({
	label,
	disabled,
}: {
	label: string;
	disabled: boolean;
}) {
	const [value, setValue] = useState(2);
	return (
		<Stepper
			label={label}
			labels={{ decrement: "Decrease", increment: "Increase" }}
			value={value}
			onChange={setValue}
			min={0}
			max={10}
			disabled={disabled}
		/>
	);
}

export const stepperDocs = defineDocs<{ label: string; disabled?: boolean }>()({
	slug: "stepper",
	name: "Stepper",
	importPath: "@passui/react/stepper",
	controls: {
		label: { kind: "text", default: "Quantity", required: true },
		disabled: { kind: "boolean", default: false },
	},
	render: (values) => <StepperDemo {...values} />,
	childrenSnippet: () => ({
		imports: ['import { useState } from "react"'],
		setup: ["const [value, setValue] = useState(2)"],
		children: "",
		expressionProps: {
			min: "0",
			max: "10",
			value: "value",
			onChange: "setValue",
			labels: '{ decrement: "Decrease", increment: "Increase" }',
		},
	}),
	usage: StepperUsage,
	showcase: StepperShowcase,
	examples: [
		{ id: "quantity", component: StepperQuantity },
		{ id: "fractions", component: StepperFractions },
	],
});
