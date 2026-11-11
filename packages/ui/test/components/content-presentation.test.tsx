import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { CodeBlock } from "../../src/components/code-block/code-block";
import { ContentUnavailableView } from "../../src/components/content-unavailable-view/content-unavailable-view";
import { KeyboardShortcut } from "../../src/components/keyboard-shortcut/keyboard-shortcut";

test("plain code preserves line breaks and escapes markup without a highlighter", () => {
	const html = renderToStaticMarkup(
		<CodeBlock code={"<button>\n\nconst ready = true"} />,
	);
	expect(html).toContain('data-line-numbers="true"');
	expect(html).toContain(
		'&lt;button&gt;</span>\n<span class="line"> </span>\n',
	);
	expect(html).not.toContain("<button>");
	expect(
		renderToStaticMarkup(<CodeBlock code="bun install" lineNumbers={false} />),
	).not.toContain("data-line-numbers");
});

test("empty states render actions and hide decorative icons from assistive technology", () => {
	const html = renderToStaticMarkup(
		<ContentUnavailableView
			title="No items"
			description="Save your first item."
			icon={<svg />}
			actions={<button type="button">Add item</button>}
		/>,
	);
	expect(html).toContain('aria-hidden="true"');
	expect(html).toContain("Save your first item.");
	expect(html).toContain("Add item</button>");
	expect(
		renderToStaticMarkup(<KeyboardShortcut>⌘ K</KeyboardShortcut>),
	).toContain("<kbd");
});
