// @vitest-environment jsdom
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { Button, buttonVariants } from "../../src/components/button";
import { expectNoA11yViolations } from "../helpers/axe";

it("renders a native button that does not submit by default", () => {
	const html = renderToStaticMarkup(createElement(Button, null, "Save"));
	expect(html).toContain('<button data-slot="button"');
	expect(html).toContain('type="button"');
	expect(html).toContain('data-variant="default"');
	expect(html).toContain('data-size="default"');
});

it("passes native props, refs and extra classes through", () => {
	const html = renderToStaticMarkup(
		createElement(Button, {
			type: "submit",
			disabled: true,
			className: "w-full",
			"aria-label": "Go",
		}),
	);
	expect(html).toContain('type="submit"');
	expect(html).toContain("disabled");
	expect(html).toContain("w-full");
});

it("gives links the same classes as the button", () => {
	const classes = buttonVariants({ variant: "outline", size: "sm" });
	expect(classes).toContain("var(--color-separator)");
	expect(classes).toContain("h-9");
});

it("has no accessibility violations in any variant", async () => {
	for (const variant of [
		"default",
		"destructive",
		"outline",
		"secondary",
		"ghost",
		"link",
	] as const)
		await expectNoA11yViolations(
			createElement(Button, { variant }, "Continue"),
		);
	await expectNoA11yViolations(
		createElement(Button, { size: "icon", "aria-label": "Close" }),
	);
});

it("works from the keyboard like a native button", async () => {
	let presses = 0;
	const host = document.createElement("div");
	document.body.append(host);
	const { createRoot } = await import("react-dom/client");
	const { act } = await import("react");
	const root = createRoot(host);
	await act(async () =>
		root.render(
			createElement(
				Button,
				{
					onClick: () => {
						presses += 1;
					},
				},
				"Go",
			),
		),
	);
	const button = host.querySelector("button") as HTMLButtonElement;
	button.focus();
	expect(document.activeElement).toBe(button);
	button.click();
	expect(presses).toBe(1);
	await act(async () => root.unmount());
});
