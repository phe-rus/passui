import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { Accordion } from "../../src/components/accordion/accordion";

test("accordion exposes a single expanded item and a labelled content region", () => {
	const markup = renderToStaticMarkup(
		<Accordion
			value="first"
			onValueChange={() => {}}
			items={[
				{ value: "first", title: "First", content: <p>First details</p> },
				{ value: "second", title: "Second", content: <p>Second details</p> },
			]}
		/>,
	);

	expect(markup).toContain('aria-expanded="true"');
	expect(markup).toContain('aria-expanded="false"');
	expect(markup).toContain('aria-labelledby="');
	expect(markup).toContain("First details");
});

test("accordion with a null value starts collapsed", () => {
	const markup = renderToStaticMarkup(
		<Accordion
			value={null}
			onValueChange={() => {}}
			items={[{ value: "one", title: "One", content: <p>Details</p> }]}
		/>,
	);

	expect(markup).toContain('aria-expanded="false"');
});

test("accordion uses full-width shared disclosure rows that accommodate descriptions", () => {
	const markup = renderToStaticMarkup(
		<Accordion
			value="details"
			onValueChange={() => {}}
			items={[
				{
					value: "details",
					title: "A long heading",
					description: "Supporting text on its own line",
					content: <p>Expanded content</p>,
				},
			]}
		/>,
	);
	expect(markup).toContain("flex w-full min-w-0 flex-col");
	expect(markup).toContain("<h3");
	expect(markup).toContain("h-auto min-h-11");
	expect(markup).toContain("w-full min-w-0 justify-between");
	expect(markup).toContain("Supporting text on its own line");
	expect(markup).toContain('aria-hidden="false"');
	expect(markup).not.toContain("contentClassName=");
});

test("grouped row hover shapes belong to the shared accordion surface", () => {
	const markup = renderToStaticMarkup(
		<Accordion
			value={null}
			onValueChange={() => {}}
			items={[
				{ value: "one", title: "One", content: "Details" },
				{ value: "two", title: "Two", content: "More" },
			]}
		/>,
	);
	expect(markup).toContain("overflow-hidden rounded-2xl");
	const buttons = [...markup.matchAll(/<button[^>]*class="([^"]*)"/g)].map(
		(match) => match[1],
	);
	expect(buttons).toHaveLength(2);
	for (const classes of buttons) {
		expect(classes).toContain("rounded-none");
		expect(classes).not.toContain("rounded-xl");
	}
});
