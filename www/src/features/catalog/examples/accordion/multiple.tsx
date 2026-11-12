import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@passui/react/accordion";

export function AccordionMultiple() {
	return (
		<Accordion multiple defaultValue={["a", "b"]} className="w-full max-w-md">
			<AccordionItem value="a">
				<AccordionTrigger>First</AccordionTrigger>
				<AccordionContent>Stays open.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="b">
				<AccordionTrigger>Second</AccordionTrigger>
				<AccordionContent>So does this one.</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
