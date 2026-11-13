import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@passui/react/accordion";

export function AccordionFaq() {
	return (
		<Accordion className="w-full max-w-md">
			<AccordionItem value="what">
				<AccordionTrigger>What is Passui?</AccordionTrigger>
				<AccordionContent>
					Native React controls with a design language of their own.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="free">
				<AccordionTrigger>Is it free?</AccordionTrigger>
				<AccordionContent>Yes, and open source.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="theme">
				<AccordionTrigger>Can I change the accent?</AccordionTrigger>
				<AccordionContent>
					Set data-accent on the root and every control follows it.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
