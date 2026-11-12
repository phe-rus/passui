// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it } from "vitest";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../src/components/tooltip";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	document.body.innerHTML = "";
	root = undefined;
});

const example = (
	<Tooltip openDelay={0}>
		<TooltipTrigger>Save</TooltipTrigger>
		<TooltipContent>Save changes</TooltipContent>
	</Tooltip>
);

it("opens on keyboard focus and describes its trigger", async () => {
	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(example));
	const trigger = document.querySelector<HTMLElement>(
		"[data-slot=tooltip-trigger]",
	);
	expect(document.querySelector("[role=tooltip]")).toBeNull();
	await act(async () => {
		trigger?.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
		);
		trigger?.focus();
	});
	await settle();
	const tip = document.querySelector("[role=tooltip]");
	expect(tip?.textContent).toBe("Save changes");
	expect(trigger?.getAttribute("aria-describedby")).toBe(tip?.id);
});

it("does not open on touch pointer movement", async () => {
	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(example));
	const trigger = document.querySelector<HTMLElement>(
		"[data-slot=tooltip-trigger]",
	);
	await act(async () => {
		const event = new Event("pointermove", { bubbles: true });
		Object.assign(event, { pointerType: "touch" });
		trigger?.dispatchEvent(event);
	});
	await settle();
	expect(document.querySelector("[role=tooltip]")).toBeNull();
});

it("renders on the server with only the trigger", () => {
	expect(renderToString(example)).not.toContain("tooltip-content");
});

it("has no accessibility violations when open", async () => {
	await expectNoA11yViolations(
		<Tooltip defaultOpen>
			<TooltipTrigger>Save</TooltipTrigger>
			<TooltipContent>Save changes</TooltipContent>
		</Tooltip>,
		{ portal: true },
	);
});
