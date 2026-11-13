import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@passui/react/accordion";

export function AccordionDisabled() {
	return (
		<Accordion className="w-full max-w-md">
			<AccordionItem value="open">
				<AccordionTrigger>Available</AccordionTrigger>
				<AccordionContent>This one opens as usual.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="locked" disabled>
				<AccordionTrigger>Locked on this plan</AccordionTrigger>
				<AccordionContent>You cannot see this.</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
