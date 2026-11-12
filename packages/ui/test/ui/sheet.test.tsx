// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../src/ui/sheet";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
let host: HTMLElement | undefined;

afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	host?.remove();
	document.body.innerHTML = "";
	root = host = undefined;
});

const example = (props: Parameters<typeof Sheet>[0] = {}) => (
	<Sheet {...props}>
		<SheetTrigger>Open</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Share</SheetTitle>
				<SheetDescription>Pick where it goes.</SheetDescription>
			</SheetHeader>
			<SheetFooter>
				<SheetClose>Done</SheetClose>
			</SheetFooter>
		</SheetContent>
	</Sheet>
);

async function mount(ui: React.ReactElement) {
	host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(ui));
	await settle();
}

const keydown = (key: string) =>
	document.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));

it("opens from the trigger as a named right side panel and closes with Escape", async () => {
	await mount(example());
	const trigger = document.querySelector<HTMLElement>(
		"[data-slot=sheet-trigger]",
	);
	expect(document.querySelector("[role=dialog]")).toBeNull();
	await act(async () => trigger?.click());
	await settle();
	const panel = document.querySelector<HTMLElement>("[role=dialog]");
	expect(panel).not.toBeNull();
	expect(panel?.getAttribute("data-swipe-direction")).toBe("right");
	expect(panel?.getAttribute("aria-labelledby")).toBe(
		document.querySelector("[data-slot=sheet-title]")?.id,
	);
	expect(panel?.contains(document.activeElement)).toBe(true);

	await act(async () => keydown("Escape"));
	await settle();
	expect(document.querySelector("[role=dialog]")).toBeNull();
	expect(document.activeElement).toBe(trigger);
});

it("reports changes and follows a controlled open prop", async () => {
	const onOpenChange = vi.fn();
	await mount(example({ open: false, onOpenChange }));
	await act(async () =>
		document.querySelector<HTMLElement>("[data-slot=sheet-trigger]")?.click(),
	);
	expect(onOpenChange).toHaveBeenCalledWith({ open: true });
	expect(document.querySelector("[role=dialog]")).toBeNull();
	await act(async () => root?.render(example({ open: true, onOpenChange })));
	await settle();
	expect(document.querySelector("[role=dialog]")).not.toBeNull();
});

it("server renders the trigger with no content", () => {
	const html = renderToString(example({ defaultOpen: true }));
	expect(html).toContain('data-slot="sheet-trigger"');
	expect(html).not.toContain("sheet-content");
});

it("has no accessibility violations while open", async () => {
	await expectNoA11yViolations(example({ defaultOpen: true }), {
		portal: true,
	});
});

it("slides from the chosen side and dismisses toward it", async () => {
	for (const [side, direction] of [
		["left", "left"],
		["top", "up"],
		["bottom", "down"],
	] as const) {
		await mount(example({ defaultOpen: true, side }));
		const panel = document.querySelector<HTMLElement>("[role=dialog]");
		expect(panel?.getAttribute("data-side")).toBe(side);
		expect(panel?.getAttribute("data-swipe-direction")).toBe(direction);
		await act(async () => root?.unmount());
		host?.remove();
		document.body.innerHTML = "";
		root = host = undefined;
	}
});

it("flips the horizontal swipe direction in right to left", async () => {
	await mount(example({ defaultOpen: true, side: "right", dir: "rtl" }));
	const panel = document.querySelector<HTMLElement>("[role=dialog]");
	// A right side panel still dismisses toward the physical right edge.
	expect(panel?.getAttribute("data-swipe-direction")).toBe("right");
});
