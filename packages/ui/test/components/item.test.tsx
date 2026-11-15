import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import {
	Item,
	ItemContent,
	ItemMedia,
	ItemTitle,
} from "../../src/components/item";

test("an item title is semibold, not bold", () => {
	const html = renderToStaticMarkup(
		<Item>
			<ItemContent>
				<ItemTitle>Name</ItemTitle>
			</ItemContent>
		</Item>,
	);
	expect(html).toContain("font-semibold");
	expect(html).not.toContain("font-bold");
});

test("default item media adds no size, colour or rounding", () => {
	const plain = renderToStaticMarkup(<ItemMedia variant="default" />);
	expect(plain).toContain('data-variant="default"');
	expect(plain).not.toMatch(/size-|text-accent|rounded/);
	expect(renderToStaticMarkup(<ItemMedia />)).toContain("text-accent-text");
});
