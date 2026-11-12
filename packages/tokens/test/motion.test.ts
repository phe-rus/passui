import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
	duration,
	easing,
	pageScale,
	renderThemeCss,
	type Spring,
	springPosition,
	springs,
	springToLinear,
} from "../src/index";

describe("motion data", () => {
	it("keeps the sheet curve and travel time from Vaul", () => {
		expect(easing.sheet).toBe("cubic-bezier(0.32, 0.72, 0, 1)");
		expect(duration.sheet).toBe(500);
	});

	it("keeps the page scale values read from Vaul", () => {
		expect(pageScale).toEqual({ topOffset: 26, radius: 8 });
	});

	it("starts every spring at rest and ends on target", () => {
		for (const spring of Object.values(springs)) {
			expect(springPosition(spring, 0)).toBeCloseTo(0, 6);
			expect(springPosition(spring, 10)).toBeCloseTo(1, 4);
		}
	});

	it("overshoots only for underdamped springs", () => {
		const peak = (spring: Spring) =>
			Math.max(
				...Array.from({ length: 200 }, (_, i) =>
					springPosition(spring, i / 50),
				),
			);
		expect(peak(springs.bouncy)).toBeGreaterThan(1.02);
		expect(peak({ damping: 80, stiffness: 100, mass: 1 })).toBeLessThanOrEqual(
			1,
		);
	});

	it("samples a spring into a linear() easing that ends at 1", () => {
		for (const spring of Object.values(springs)) {
			const { easing: curve, durationMs } = springToLinear(spring);
			expect(curve).toMatch(/^linear\(0, .*, 1\)$/);
			expect(durationMs).toBeGreaterThan(100);
			expect(durationMs).toBeLessThanOrEqual(4000);
		}
	});

	it("publishes springs and the sheet curve as CSS variables", () => {
		const css = renderThemeCss();
		for (const name of Object.keys(springs)) {
			expect(css).toContain(`--spring-${name}: linear(`);
			expect(css).toContain(`--spring-${name}-duration:`);
		}
		expect(css).toContain("--ease-sheet: cubic-bezier(0.32, 0.72, 0, 1);");
		expect(css).toContain("--duration-sheet: 500ms;");
	});

	it("lets Tailwind see compiled Passui classes", () => {
		const styles = readFileSync(
			new URL("../styles/styles.css", import.meta.url),
			"utf8",
		);
		expect(styles).toContain('@source "../../react/dist";');
	});
});
