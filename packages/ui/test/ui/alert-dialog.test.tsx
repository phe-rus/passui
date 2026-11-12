// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../src/ui/alert-dialog";
import { act, expectNoA11yViolations, settle } from "../helpers/axe";

// jsdom has no layout, so every element looks hidden to focus handling.
const layout = Object.getOwnPropertyDescriptors(HTMLElement.prototype);
beforeAll(() => {
	Object.defineProperty(HTMLElement.prototype, "getClientRects", {
		configurable: true,
		value: () => [{ width: 1, height: 1 }],
	});
	for (const key of ["offsetWidth", "offsetHeight"])
		Object.defineProperty(HTMLElement.prototype, key, {
			configurable: true,
			get: () => 1,
		});
});
afterAll(() => {
	for (const key of ["getClientRects", "offsetWidth", "offsetHeight"]) {
		const original = layout[key];
		if (original) Object.defineProperty(HTMLElement.prototype, key, original);
		else
			delete (HTMLElement.prototype as unknown as Record<string, unknown>)[key];
	}
});

let root: Root | undefined;
let host: HTMLElement | undefined;

afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	host?.remove();
	document.body.innerHTML = "";
	root = host = undefined;
});

const example = (onCancel?: () => void) => (
	<AlertDialog>
		<AlertDialogTrigger>Delete</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete note?</AlertDialogTitle>
				<AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogAction>Delete</AlertDialogAction>
				<AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

async function open(ui: React.ReactElement) {
	host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(ui));
	await settle();
	await act(async () =>
		document
			.querySelector<HTMLElement>("[data-slot=alert-dialog-trigger]")
			?.click(),
	);
	await settle();
}

it("has the alertdialog role and focuses Cancel first", async () => {
	await open(example());
	expect(document.querySelector("[role=alertdialog]")).not.toBeNull();
	expect(document.activeElement?.getAttribute("data-slot")).toBe(
		"alert-dialog-cancel",
	);
});

it("ignores an outside press", async () => {
	await open(example());
	await act(async () => {
		document.body.dispatchEvent(
			new MouseEvent("pointerdown", { bubbles: true }),
		);
		document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	await settle();
	expect(document.querySelector("[role=alertdialog]")).not.toBeNull();
});

it("treats Escape as pressing Cancel", async () => {
	const onCancel = vi.fn();
	await open(example(onCancel));
	await act(async () =>
		document.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
		),
	);
	await settle();
	expect(onCancel).toHaveBeenCalledTimes(1);
	expect(document.querySelector("[role=alertdialog]")).toBeNull();
});

it("closes when the action is pressed", async () => {
	await open(example());
	await act(async () =>
		document
			.querySelector<HTMLElement>("[data-slot=alert-dialog-action]")
			?.click(),
	);
	await settle();
	expect(document.querySelector("[role=alertdialog]")).toBeNull();
});

it("has no accessibility violations while open", async () => {
	await expectNoA11yViolations(
		<AlertDialog defaultOpen>
			<AlertDialogContent>
				<AlertDialogTitle>Delete note?</AlertDialogTitle>
				<AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
				<AlertDialogAction>Delete</AlertDialogAction>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
			</AlertDialogContent>
		</AlertDialog>,
		{ portal: true },
	);
});
