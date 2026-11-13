import { expect, test } from "vitest";
import { advanceDigit, digitAt } from "../../src/lib/rolling-digit";

test("carries roll forward and reverse across zero without reversing through eight digits", () => {
	expect(advanceDigit(9, 0, 10, 1).position).toBeGreaterThan(9);
	expect(advanceDigit(10, 0, 9, 1).position).toBeLessThan(10);
	expect([digitAt(9), digitAt(10), digitAt(11)]).toEqual([9, 0, 1]);
	expect([digitAt(-1), digitAt(0)]).toEqual([9, 0]);
});

test("digit springs settle at their whole-place target with finite dropped-frame steps", () => {
	let state = { position: 98, velocity: 0 };
	for (let frame = 0; frame < 200; frame++)
		state = advanceDigit(state.position, state.velocity, 102, 2);
	expect(state.position).toBeCloseTo(102, 3);
	expect(state.velocity).toBeCloseTo(0, 3);
});
