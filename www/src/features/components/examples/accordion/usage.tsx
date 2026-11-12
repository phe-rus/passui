import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@passui/react/accordion";

export function AccordionUsage() {
	return (
		<Accordion defaultValue={["shipping"]} className="w-full max-w-md">
			<AccordionItem value="shipping">
				<AccordionTrigger>Shipping</AccordionTrigger>
				<AccordionContent>
					Orders leave within two working days.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="returns">
				<AccordionTrigger>Returns</AccordionTrigger>
				<AccordionContent>
					Send anything back within thirty days.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
