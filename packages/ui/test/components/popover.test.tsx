// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it } from "vitest";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverTitle,
	PopoverTrigger,
} from "../../src/components/popover";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	document.body.innerHTML = "";
	root = undefined;
});

const example = (
	<Popover>
		<PopoverTrigger>Info</PopoverTrigger>
		<PopoverContent>
			<PopoverTitle>Storage</PopoverTitle>
			<PopoverDescription>Almost full.</PopoverDescription>
		</PopoverContent>
	</Popover>
);

it("opens from the trigger, names itself, and closes with Escape", async () => {
	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(example));
	await settle();
	const trigger = document.querySelector<HTMLElement>(
		"[data-slot=popover-trigger]",
	);
	expect(trigger?.getAttribute("aria-expanded")).toBe("false");
	expect(document.querySelector("[data-slot=popover-content]")).toBeNull();
	await act(async () => trigger?.click());
	await settle();
	const panel = document.querySelector("[data-slot=popover-content]");
	expect(panel?.getAttribute("role")).toBe("dialog");
	expect(panel?.getAttribute("aria-labelledby")).toBe(
		document.querySelector("[data-slot=popover-title]")?.id,
	);
	expect(trigger?.getAttribute("aria-expanded")).toBe("true");
	await act(async () =>
		document.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
		),
	);
	await settle();
	expect(document.querySelector("[data-slot=popover-content]")).toBeNull();
});

it("renders on the server with only the trigger", () => {
	const html = renderToString(example);
	expect(html).toContain("popover-trigger");
	expect(html).not.toContain("popover-content");
});

it("has no accessibility violations when open", async () => {
	await expectNoA11yViolations(
		<Popover defaultOpen>
			<PopoverTrigger>Info</PopoverTrigger>
			<PopoverContent>
				<PopoverTitle>Storage</PopoverTitle>
			</PopoverContent>
		</Popover>,
		{ portal: true },
	);
});
