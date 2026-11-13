import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { StatTile, type StatTileProps } from "../../src/components/stat-tile";

const validStat: StatTileProps = { label: "Devices", value: 2 };
void validStat;

test("a selectable stat tile exposes its pressed state", () => {
	const markup = renderToStaticMarkup(
		createElement(StatTile, {
			label: "Active devices",
			value: 3,
			active: true,
			onClick: () => {},
		}),
	);
	expect(markup).toContain('aria-pressed="true"');
	expect(markup).toContain("Active devices");
});

test("aspect ratio sets its frame and falls back on a bad ratio", async () => {
	const { AspectRatio } = await import("../../src/components/aspect-ratio");
	const wide = renderToStaticMarkup(<AspectRatio ratio={16 / 9} />);
	expect(wide).toContain("aspect-ratio:1.77");
	expect(renderToStaticMarkup(<AspectRatio ratio={-1} />)).toContain(
		"aspect-ratio:1.33",
	);
});

test("ambient glows only when it has an image, and layout carries a heading", async () => {
	const { Ambient } = await import("../../src/components/ambient");
	const { Layout } = await import("../../src/components/layout");
	expect(renderToStaticMarkup(<Ambient>Hi</Ambient>)).not.toContain("<img");
	expect(renderToStaticMarkup(<Ambient src="/a.jpg">Hi</Ambient>)).toContain(
		'aria-hidden="true"',
	);
	const page = renderToStaticMarkup(
		<Layout heading={<Layout.Heading title="Settings" description="Tune" />}>
			Body
		</Layout>,
	);
	expect(page).toContain("<h1");
	expect(page).toContain("Tune");
});
