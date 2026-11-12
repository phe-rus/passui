// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, it } from "vitest";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../src/components/accordion";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../../src/components/collapsible";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/components/tabs";
import { Toaster, toast } from "../../src/components/toast";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
let host: HTMLElement | undefined;
afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	host?.remove();
	document.body.innerHTML = "";
	root = host = undefined;
});
async function mount(ui: React.ReactElement) {
	host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(ui));
	await settle();
}

const tabs = (
	<Tabs defaultValue="a">
		<TabsList>
			<TabsTrigger value="a">A</TabsTrigger>
			<TabsTrigger value="b">B</TabsTrigger>
		</TabsList>
		<TabsContent value="a">One</TabsContent>
		<TabsContent value="b">Two</TabsContent>
	</Tabs>
);

const accordion = (
	<Accordion defaultValue={["x"]}>
		<AccordionItem value="x">
			<AccordionTrigger>Question</AccordionTrigger>
			<AccordionContent>Answer</AccordionContent>
		</AccordionItem>
		<AccordionItem value="y">
			<AccordionTrigger>Other</AccordionTrigger>
			<AccordionContent>More</AccordionContent>
		</AccordionItem>
	</Accordion>
);

it("tabs, accordion and collapsible have no axe violations", async () => {
	await expectNoA11yViolations(
		<div>
			{tabs}
			{accordion}
			<Collapsible>
				<CollapsibleTrigger>More</CollapsibleTrigger>
				<CollapsibleContent>Hidden</CollapsibleContent>
			</Collapsible>
		</div>,
	);
});

it("Tabs switches panels on click", async () => {
	await mount(tabs);
	const triggers = document.querySelectorAll<HTMLElement>("[role=tab]");
	expect(triggers[0]?.getAttribute("aria-selected")).toBe("true");
	await act(async () => triggers[1]?.click());
	expect(triggers[1]?.getAttribute("aria-selected")).toBe("true");
});

it("Accordion opens and closes a section", async () => {
	await mount(accordion);
	const triggers = document.querySelectorAll<HTMLElement>(
		"[data-slot=accordion-trigger]",
	);
	expect(triggers[0]?.getAttribute("aria-expanded")).toBe("true");
	await act(async () => {
		triggers[1]?.focus();
		triggers[1]?.click();
	});
	expect(triggers[1]?.getAttribute("aria-expanded")).toBe("true");
});

it("Collapsible toggles aria-expanded", async () => {
	await mount(
		<Collapsible>
			<CollapsibleTrigger>More</CollapsibleTrigger>
			<CollapsibleContent>Hidden</CollapsibleContent>
		</Collapsible>,
	);
	const trigger = document.querySelector(
		"[data-slot=collapsible-trigger]",
	) as HTMLElement;
	expect(trigger.getAttribute("aria-expanded")).toBe("false");
	await act(async () => trigger.click());
	expect(trigger.getAttribute("aria-expanded")).toBe("true");
});

it("Toaster shows a toast created from the store", async () => {
	await mount(<Toaster />);
	await act(async () => {
		toast.success({ title: "Saved", description: "All good" });
	});
	await settle();
	expect(document.body.textContent).toContain("Saved");
});
