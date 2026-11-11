import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { LabeledContent } from "../../src/components/labeled-content/labeled-content";
import { Section } from "../../src/components/section/section";
import {
	StatusIndicator,
	type StatusIndicatorState,
} from "../../src/components/status-indicator/status-indicator";
import {
	StatTile,
	type StatTileProps,
} from "../../src/components/stat-tile/stat-tile";

const validStatus: StatusIndicatorState = "syncing";
// @ts-expect-error status states are closed, documented choices
const invalidStatus: StatusIndicatorState = "loading";
const validStat: StatTileProps = { label: "Devices", value: 2 };
void validStatus;
void invalidStatus;
void validStat;

test("sections accept standard semantic attributes and block footers", () => {
	const markup = renderToStaticMarkup(
		createElement(
			Section,
			{
				title: "Settings",
				id: "settings",
				footer: createElement("a", { href: "/help" }, "Help"),
			},
			createElement("div", null, "Row"),
		),
	);

	expect(markup).toContain('id="settings"');
	expect(markup).toMatch(/aria-labelledby="([^"]+)"/);
	expect(markup).toContain("<h2");
	expect(markup).toContain("Settings</h2>");
	expect(markup).toContain('<div class="px-4 text-caption');
	expect(markup).toContain('href="/help"');
});

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

test("status dot is decorative and the status remains readable", () => {
	const markup = renderToStaticMarkup(
		<StatusIndicator state="saved">Saved</StatusIndicator>,
	);
	expect(markup).toContain('aria-hidden="true"');
	expect(markup).toContain("Saved");
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
