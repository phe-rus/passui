// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../../src/ui/dropdown-menu";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

let root: Root | undefined;
afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	document.body.innerHTML = "";
	root = undefined;
});

const example = (onSelect = () => {}, props = {}) => (
	<DropdownMenu {...props}>
		<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuGroup>
				<DropdownMenuLabel>File</DropdownMenuLabel>
				<DropdownMenuItem onSelect={onSelect}>
					Rename <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuCheckboxItem checked onCheckedChange={() => {}}>
					Pinned
				</DropdownMenuCheckboxItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuRadioGroup value="a" onValueChange={() => {}}>
				<DropdownMenuRadioItem value="a">Alpha</DropdownMenuRadioItem>
				<DropdownMenuRadioItem value="b">Beta</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
				<DropdownMenuSubContent>
					<DropdownMenuItem>Archive</DropdownMenuItem>
				</DropdownMenuSubContent>
			</DropdownMenuSub>
		</DropdownMenuContent>
	</DropdownMenu>
);

async function mount(ui: React.ReactElement) {
	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(ui));
	await settle();
}

it("opens with items, checkbox and radio roles", async () => {
	await mount(example(undefined, { defaultOpen: true }));
	expect(document.querySelector("[role=menu]")).not.toBeNull();
	expect(document.querySelectorAll("[role=menuitem]").length).toBeGreaterThan(
		0,
	);
	expect(
		document
			.querySelector("[role=menuitemcheckbox]")
			?.getAttribute("aria-checked"),
	).toBe("true");
	const radios = document.querySelectorAll("[role=menuitemradio]");
	expect(radios[0]?.getAttribute("aria-checked")).toBe("true");
	expect(radios[1]?.getAttribute("aria-checked")).toBe("false");
});

it("runs onSelect and closes when an item is chosen", async () => {
	const onSelect = vi.fn();
	await mount(example(onSelect));
	const trigger = document.querySelector<HTMLElement>(
		"[data-slot=dropdown-menu-trigger]",
	);
	await act(async () => trigger?.click());
	await settle();
	const item = document.querySelector<HTMLElement>(
		"[data-slot=dropdown-menu-item]",
	);
	await act(async () => item?.click());
	await settle();
	expect(onSelect).toHaveBeenCalledTimes(1);
	expect(document.querySelector("[role=menu]")).toBeNull();
});

it("closes with Escape", async () => {
	await mount(example(undefined, { defaultOpen: true }));
	const menu = document.querySelector<HTMLElement>("[role=menu]");
	await act(async () =>
		menu?.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
		),
	);
	await settle();
	expect(document.querySelector("[role=menu]")).toBeNull();
});

it("renders on the server with only the trigger", () => {
	const html = renderToString(example());
	expect(html).toContain("dropdown-menu-trigger");
	expect(html).not.toContain('role="menu"');
});

it("has no accessibility violations when open", async () => {
	await expectNoA11yViolations(example(undefined, { defaultOpen: true }), {
		portal: true,
	});
});
