import { useState } from "react";
import { Accordion } from "@passui/react/accordion";

export function AccordionFaq() {
	const [value, setValue] = useState<string | null>(null);
	return (
		<Accordion
			className="max-w-lg"
			value={value}
			onValueChange={setValue}
			items={[
				{
					value: "returns",
					title: "Can I return an item?",
					content: (
						<p className="text-footnote text-label-secondary">
							Returns are accepted within 30 days.
						</p>
					),
				},
				{
					value: "shipping",
					title: "When will my order arrive?",
					content: (
						<p className="text-footnote text-label-secondary">
							Most orders arrive in three to five days.
						</p>
					),
				},
			]}
		/>
	);
}
