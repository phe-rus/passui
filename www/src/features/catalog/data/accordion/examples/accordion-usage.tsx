import { Accordion } from "@passui/react/accordion";
import { useState } from "react";

export function AccordionUsage() {
	const [value, setValue] = useState<string | null>(null);
	return (
		<Accordion
			className="max-w-lg"
			value={value}
			onValueChange={setValue}
			items={[
				{
					value: "details",
					title: "Order details",
					content: (
						<p className="text-footnote text-label-secondary">
							Ships in two business days.
						</p>
					),
				},
				{
					value: "delivery",
					title: "Delivery options",
					content: (
						<p className="text-footnote text-label-secondary">
							Choose standard or express delivery.
						</p>
					),
				},
			]}
		/>
	);
}
