// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHandle,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../../src/components/drawer";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
let host: HTMLElement | undefined;

afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	host?.remove();
	document.body.innerHTML = "";
	root = host = undefined;
});

const example = (props: Parameters<typeof Drawer>[0] = {}) => (
	<Drawer {...props}>
		<DrawerTrigger>Open</DrawerTrigger>
		<DrawerContent>
			<DrawerHandle />
			<DrawerHeader>
				<DrawerTitle>Share</DrawerTitle>
				<DrawerDescription>Pick where it goes.</DrawerDescription>
			</DrawerHeader>
			<DrawerFooter>
				<DrawerClose>Done</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
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

it("opens from the trigger as a named bottom panel and closes with Escape", async () => {
	await mount(example());
	const trigger = document.querySelector<HTMLElement>(
		"[data-slot=drawer-trigger]",
	);
	expect(document.querySelector("[role=dialog]")).toBeNull();
	await act(async () => trigger?.click());
	await settle();
	const panel = document.querySelector<HTMLElement>("[role=dialog]");
	expect(panel).not.toBeNull();
	expect(panel?.getAttribute("data-swipe-direction")).toBe("down");
	expect(panel?.getAttribute("aria-labelledby")).toBe(
		document.querySelector("[data-slot=drawer-title]")?.id,
	);
	expect(panel?.contains(document.activeElement)).toBe(true);

	await act(async () => keydown("Escape"));
	await settle();
	expect(document.querySelector("[role=dialog]")).toBeNull();
	expect(document.activeElement).toBe(trigger);
});

it("renders a grab handle wired to the machine", async () => {
	await mount(example({ defaultOpen: true }));
	const handle = document.querySelector<HTMLElement>(
		"[data-slot=drawer-handle]",
	);
	expect(handle?.style.touchAction).toBe("none");
});

it("makes the panel as tall as the biggest numeric snap point", async () => {
	await mount(example({ defaultOpen: true, snapPoints: [0.4, 0.9] }));
	const panel = document.querySelector<HTMLElement>("[role=dialog]");
	expect(panel?.style.height).toBe("90%");
});

it("reports changes and follows a controlled open prop", async () => {
	const onOpenChange = vi.fn();
	await mount(example({ open: false, onOpenChange }));
	await act(async () =>
		document.querySelector<HTMLElement>("[data-slot=drawer-trigger]")?.click(),
	);
	expect(onOpenChange).toHaveBeenCalledWith({ open: true });
	expect(document.querySelector("[role=dialog]")).toBeNull();
	await act(async () => root?.render(example({ open: true, onOpenChange })));
	await settle();
	expect(document.querySelector("[role=dialog]")).not.toBeNull();
});

it("writes its openness to the page element, and only when one opts in", async () => {
	const page = document.createElement("div");
	page.setAttribute("data-passui-page", "");
	document.body.append(page);
	await mount(example({ defaultOpen: true }));
	expect(page.hasAttribute("data-passui-page-active")).toBe(true);
	expect(
		Number(page.style.getPropertyValue("--passui-page-scale")),
	).toBeLessThan(1);

	await act(async () => root?.render(example({ open: false })));
	await settle();
	expect(page.hasAttribute("data-passui-page-active")).toBe(false);
	expect(page.style.getPropertyValue("--passui-page-scale")).toBe("");
	page.remove();
});

it("does nothing to the page when no element opts in", async () => {
	await mount(example({ defaultOpen: true }));
	expect(document.querySelector("[data-passui-page-active]")).toBeNull();
});

it("server renders the trigger with no content", () => {
	const html = renderToString(example({ defaultOpen: true }));
	expect(html).toContain('data-slot="drawer-trigger"');
	expect(html).not.toContain("drawer-content");
});

it("has no accessibility violations while open", async () => {
	await expectNoA11yViolations(example({ defaultOpen: true }), {
		portal: true,
	});
});
