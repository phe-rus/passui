/**
 * Spring presets shared by motion/react and CSS so interactions feel the
 * same on every platform. Values follow SwiftUI's defaults.
 */
export interface Spring {
	damping: number;
	stiffness: number;
	mass: number;
}

export const springs = {
	/** Default UI transitions. */
	smooth: { damping: 26, stiffness: 240, mass: 1 },
	/** Buttons, toggles and small feedback. */
	snappy: { damping: 22, stiffness: 380, mass: 1 },
	/** Sheets, cards and playful moments. */
	bouncy: { damping: 14, stiffness: 220, mass: 1 },
} as const satisfies Record<string, Spring>;

export const duration = {
	instant: 100,
	fast: 200,
	normal: 300,
	slow: 450,
	/** Sheet and Drawer travel, paired with `easing.sheet`. */
	sheet: 500,
} as const;

/** CSS easing approximating the `smooth` spring for non-spring contexts. */
export const easing = {
	standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
	emphasized: "cubic-bezier(0.3, 1.3, 0.4, 1)",
	/** Sheet and Drawer curve, the same values Vaul uses. */
	sheet: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

/**
 * How far the page behind a Drawer scales back, read from Vaul 1.1.2 (MIT):
 * the scaled page ends `topOffset` px below the top of the screen, with
 * corners rounded to `radius` px. Scale is (width - topOffset) / width.
 */
export const pageScale = { topOffset: 26, radius: 8 } as const;

/** Where a spring counts as settled: within this distance of its target. */
const SETTLE_TOLERANCE = 0.001;
/** Samples per second when sampling a spring into a CSS easing. */
const SAMPLES_PER_SECOND = 60;
const MAX_SECONDS = 4;

/** Position of a spring released from rest at 0 and heading to 1, at `t` seconds. */
export function springPosition(spring: Spring, t: number): number {
	const { stiffness, damping, mass } = spring;
	const omega = Math.sqrt(stiffness / mass);
	const zeta = damping / (2 * Math.sqrt(stiffness * mass));
	if (zeta < 1) {
		const wd = omega * Math.sqrt(1 - zeta * zeta);
		return (
			1 -
			Math.exp(-zeta * omega * t) *
				(Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t))
		);
	}
	if (zeta === 1) return 1 - Math.exp(-omega * t) * (1 + omega * t);
	const root = omega * Math.sqrt(zeta * zeta - 1);
	const slow = -zeta * omega + root;
	const fast = -zeta * omega - root;
	return (
		1 - (fast * Math.exp(slow * t) - slow * Math.exp(fast * t)) / (fast - slow)
	);
}

/** Seconds until the spring stays within tolerance of its target. */
export function springSettleSeconds(spring: Spring): number {
	const step = 1 / SAMPLES_PER_SECOND;
	let settled = 0;
	for (let t = 0; t <= MAX_SECONDS; t += step) {
		if (Math.abs(1 - springPosition(spring, t)) > SETTLE_TOLERANCE)
			settled = t + step;
	}
	return settled;
}

/**
 * Samples a spring into a CSS `linear()` easing. Pair it with `durationMs`
 * so the CSS transition runs exactly as long as the spring takes to settle.
 */
export function springToLinear(spring: Spring): {
	durationMs: number;
	easing: string;
} {
	const seconds = springSettleSeconds(spring);
	const count = Math.max(2, Math.ceil(seconds * SAMPLES_PER_SECOND));
	const points: string[] = [];
	for (let i = 0; i <= count; i += 1) {
		const value =
			i === count ? 1 : springPosition(spring, (i / count) * seconds);
		points.push(String(Number(value.toFixed(4))));
	}
	return {
		durationMs: Math.round(seconds * 1000),
		easing: `linear(${points.join(", ")})`,
	};
}
