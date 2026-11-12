import { clampRange } from "../../lib/range-value";

export interface LiquidState {
	fill: number;
	velocity: number;
}

/** Bencho's frame-normalized liquid spring. See THIRD_PARTY_NOTICES.md. */
export function stepLiquid(
	state: LiquidState,
	target: number,
	viscosity: number,
	dt: number,
): LiquidState {
	const soft = clampRange(viscosity, 0, 100) / 100;
	target = clampRange(target, 0, 100);
	dt = clampRange(dt, 0, 2.5);
	if (soft === 0) {
		/* 0 is an ordinary slider and has to be exactly that,
           not a very stiff spring that still rings. */
		return { fill: target, velocity: 0 };
	}
	/* Stiffness falls and damping rises together: thin liquid is slow to
       answer and slow to forget, which is why these are one knob. */
	const stiff = 0.34 - soft * 0.29;
	const damp = 0.74 + soft * 0.22;
	let velocity =
		(state.velocity + (target - state.fill) * stiff * dt) * damp ** dt;
	let fill = state.fill + velocity * dt;
	/* The end stop is a wall, and a wall gives some back. Without this
       the overshoot is swallowed exactly where you are looking at it. */
	if (fill > 100) {
		fill = 100;
		velocity = -velocity * 0.42;
	}
	if (fill < 0) {
		fill = 0;
		velocity = -velocity * 0.42;
	}
	if (Math.abs(target - fill) < 0.02 && Math.abs(velocity) < 0.02)
		return { fill: target, velocity: 0 };
	return { fill, velocity };
}
