import { pageScale } from "@passui/tokens/motion";
import { expect, it } from "vitest";
import {
	clamp01,
	frontOpenness,
	pageTransformAt,
	tallestSnapPoint,
} from "../../src/lib/drawer.math";

it("leaves the page alone when the drawer is closed", () => {
	expect(pageTransformAt(0, 400)).toEqual({
		scale: 1,
		radius: 0,
		translateY: 0,
	});
});

it("scales the page to end topOffset below the top when fully open", () => {
	const t = pageTransformAt(1, 400);
	expect(t.scale).toBeCloseTo((400 - pageScale.topOffset) / 400);
	expect(t.radius).toBe(pageScale.radius);
});

it("follows the swipe: halfway open is halfway scaled", () => {
	const full = pageTransformAt(1, 400).scale;
	expect(pageTransformAt(0.5, 400).scale).toBeCloseTo(1 - (1 - full) / 2);
});

it("clamps openness and survives odd input", () => {
	expect(clamp01(2)).toBe(1);
	expect(clamp01(-1)).toBe(0);
	expect(clamp01(Number.NaN)).toBe(0);
	expect(pageTransformAt(5, 400)).toEqual(pageTransformAt(1, 400));
	expect(pageTransformAt(1, 0).scale).toBeGreaterThanOrEqual(0);
});

it("keeps the page as scaled as the most open layer", () => {
	expect(frontOpenness([0.2, 1, 0.5])).toBe(1);
	expect(frontOpenness([])).toBe(0);
});

it("finds the tallest numeric snap point", () => {
	expect(tallestSnapPoint([0.4, "300px", 0.9])).toBe(0.9);
	expect(tallestSnapPoint(["300px"])).toBeNull();
	expect(tallestSnapPoint(undefined)).toBeNull();
});
