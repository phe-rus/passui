import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { LabeledContent } from "../../src/legacy/labeled-content/labeled-content";
import {
	StatTile,
	type StatTileProps,
} from "../../src/legacy/stat-tile/stat-tile";

const validStat: StatTileProps = { label: "Devices", value: 2 };
void validStat;

test("labeled content accepts attributes without losing its content", () => {
	const markup = renderToStaticMarkup(
		<LabeledContent
			label="Name"
			description="Public name"
			id="name-row"
			className="custom-row"
		>
			<span>Niina</span>
		</LabeledContent>,
	);

	expect(markup).toContain('id="name-row"');
	expect(markup).toContain("custom-row");
	expect(markup).toContain("Public name");
	expect(markup).toContain("Niina");
});

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
