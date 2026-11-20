import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = (name: string) =>
	readFileSync(new URL(`../styles/${name}`, import.meta.url), "utf8");

describe("iOS styles", () => {
	it("declares the ios variant on data-os", () => {
		expect(css("utilities.css")).toContain(
			'@custom-variant ios (&:where([data-os="ios"], [data-os="ios"] *));',
		);
	});

	it("makes glass bars and panes solid on iOS", () => {
		const utilities = css("utilities.css");
		expect(utilities).toMatch(
			/:root\[data-os="ios"\] :is\(\.glass-bar, \.glass-pane\) \{\s*backdrop-filter: none;/,
		);
		expect(utilities).toContain(':root[data-os="ios"] .glass-bar {');
		expect(utilities).toContain(':root[data-os="ios"] .glass-pane {');
	});

	it("paints the html element with the overscroll colour", () => {
		expect(css("base.css")).toContain(
			"background-color: var(--overscroll-color, var(--color-background));",
		);
	});

	it("keeps iOS field text at 16px, outside the base layer", () => {
		const base = css("base.css");
		const layerEnd = base.indexOf("@media (prefers-reduced-motion");
		const rule = base.indexOf('input:not([type="checkbox"]');
		expect(rule).toBeGreaterThan(layerEnd);
		expect(base).toContain("font-size: max(16px, 1em);");
	});
});
