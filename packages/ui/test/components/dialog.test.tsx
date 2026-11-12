// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../src/components/dialog";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
let host: HTMLElement | undefined;

afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	host?.remove();
	document.body.innerHTML = "";
	root = host = undefined;
});

const example = (props: Parameters<typeof Dialog>[0] = {}) => (
	<Dialog {...props}>
		<DialogTrigger>Open</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Rename</DialogTitle>
				<DialogDescription>Pick a new name.</DialogDescription>
			</DialogHeader>
			<input aria-label="Name" />
			<DialogFooter>
				<DialogClose>Done</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
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

it("renders only the trigger while closed", async () => {
	await mount(example());
	const trigger = document.querySelector("[data-slot=dialog-trigger]");
	expect(trigger?.getAttribute("aria-haspopup")).toBe("dialog");
	expect(trigger?.getAttribute("aria-expanded")).toBe("false");
	expect(document.querySelector("[role=dialog]")).toBeNull();
});

it("opens from the trigger, names itself from its title, and closes with Escape", async () => {
	await mount(example());
	const trigger = document.querySelector<HTMLElement>(
		"[data-slot=dialog-trigger]",
	);
	await act(async () => trigger?.click());
	await settle();
	const panel = document.querySelector<HTMLElement>("[role=dialog]");
	expect(panel).not.toBeNull();
	const title = document.querySelector("[data-slot=dialog-title]");
	expect(panel?.getAttribute("aria-labelledby")).toBe(title?.id);
	expect(panel?.hasAttribute("data-open")).toBe(true);
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
		document.querySelector<HTMLElement>("[data-slot=dialog-trigger]")?.click(),
	);
	expect(onOpenChange).toHaveBeenCalledWith({ open: true });
	// Still controlled closed, so nothing mounts until the parent says so.
	expect(document.querySelector("[role=dialog]")).toBeNull();

	await act(async () => root?.render(example({ open: true, onOpenChange })));
	await settle();
	expect(document.querySelector("[role=dialog]")).not.toBeNull();
});

it("lets a trigger and a close part become the consumer's element", async () => {
	await mount(
		<Dialog defaultOpen>
			<DialogTrigger render={<a href="#top">Open</a>} />
			<DialogContent>
				<DialogTitle>Title</DialogTitle>
				<DialogClose render={<span data-own>Done</span>} />
			</DialogContent>
		</Dialog>,
	);
	const trigger = document.querySelector("[data-slot=dialog-trigger]");
	expect(trigger?.tagName).toBe("A");
	expect(trigger?.getAttribute("aria-haspopup")).toBe("dialog");
	const close = document.querySelector("[data-own]");
	expect(close?.getAttribute("data-slot")).toBe("dialog-close");
});

it("keeps the panel until its exit transition ends, and reverses without remounting", async () => {
	let finish: () => void = () => {};
	const finished = new Promise<void>((resolve) => {
		finish = resolve;
	});
	const original = HTMLElement.prototype.getAnimations;
	HTMLElement.prototype.getAnimations = () =>
		[{ finished }] as unknown as Animation[];
	try {
		await mount(example({ defaultOpen: true }));
		const panel = document.querySelector("[role=dialog]");
		expect(panel).not.toBeNull();

		await act(async () => root?.render(example({ open: false })));
		expect(document.querySelector("[role=dialog]")).toBe(panel);
		expect(panel?.hasAttribute("data-ending-style")).toBe(true);

		// Reversing while leaving continues on the same element.
		await act(async () => root?.render(example({ open: true })));
		expect(document.querySelector("[role=dialog]")).toBe(panel);
		expect(panel?.hasAttribute("data-ending-style")).toBe(false);

		await act(async () => root?.render(example({ open: false })));
		await act(async () => {
			finish();
			await finished;
		});
		expect(document.querySelector("[role=dialog]")).toBeNull();
	} finally {
		HTMLElement.prototype.getAnimations = original;
	}
});

it("server renders the trigger with no content and no portal", () => {
	const html = renderToString(example());
	expect(html).toContain('data-slot="dialog-trigger"');
	expect(html).not.toContain("dialog-content");
	expect(renderToString(example({ defaultOpen: true }))).not.toContain(
		"dialog-content",
	);
});

it("has no accessibility violations while open", async () => {
	await expectNoA11yViolations(example({ defaultOpen: true }), {
		portal: true,
	});
});

it("keeps ids unique when there are several close parts", async () => {
	await expectNoA11yViolations(
		<Dialog defaultOpen>
			<DialogContent>
				<DialogTitle>Title</DialogTitle>
				<DialogClose>One</DialogClose>
				<DialogClose>Two</DialogClose>
			</DialogContent>
		</Dialog>,
		{ portal: true },
	);
});
