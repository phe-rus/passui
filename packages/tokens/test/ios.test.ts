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

	it("paints html with the page colour, never the bar colour, by default", () => {
		const base = css("base.css");
		expect(base).toContain("background-color: var(--color-background);");
		expect(base).not.toMatch(
			/html \{[^}]*background-color: var\(--overscroll-color/,
		);
	});

	it("moves the colour behind the page from the bar colour to the page colour as it scrolls", () => {
		const base = css("base.css");
		const keyframes = base.slice(base.indexOf("@keyframes passui-backdrop"));
		expect(keyframes).toMatch(
			/from \{\s*background-color: var\(--overscroll-color, var\(--color-background\)\);/,
		);
		expect(keyframes).toMatch(
			/to \{\s*background-color: var\(--color-background\);/,
		);
		expect(keyframes).toContain("@supports (animation-timeline: scroll())");
		expect(keyframes).toContain("animation-timeline: scroll(root block);");
	});

	it("keeps iOS field text at 16px, outside the base layer", () => {
		const base = css("base.css");
		const layerEnd = base.indexOf("@media (prefers-reduced-motion");
		const rule = base.indexOf('input:not([type="checkbox"]');
		expect(rule).toBeGreaterThan(layerEnd);
		expect(base).toContain("font-size: max(16px, 1em);");
	});
});

describe("iOS overlays", () => {
	it("lifts every overlay off the bottom edge, outside the base layer", () => {
		const base = css("base.css");
		const rule = base.indexOf(':root[data-os="ios"] [data-slot$="-overlay"]');
		expect(rule).toBeGreaterThan(
			base.indexOf("@media (prefers-reduced-motion"),
		);
		expect(base).toContain("bottom: var(--ios-edge-gap, 4px);");
	});
});
