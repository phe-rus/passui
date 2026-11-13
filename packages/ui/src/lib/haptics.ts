/**
 * The feedback kinds Apple's three generators share: impact (`light`, `medium`,
 * `heavy`, `soft`, `rigid`), selection, and notification (`success`,
 * `warning`, `error`).
 */
export type HapticKind =
	| "selection"
	| "light"
	| "medium"
	| "heavy"
	| "soft"
	| "rigid"
	| "success"
	| "warning"
	| "error";

type Player = (kind: HapticKind) => void;

/** Vibration milliseconds per kind: alternating on and off, for devices with the Vibration API. */
const patterns: Record<HapticKind, number[]> = {
	selection: [4],
	light: [8],
	soft: [10],
	medium: [16],
	rigid: [14],
	heavy: [28],
	success: [10, 40, 18],
	warning: [18, 50, 18],
	error: [22, 40, 22, 40, 30],
};

/** Gaps between the taps of one kind, for iOS, where only a tap is available. */
const taps: Record<HapticKind, number[]> = {
	selection: [0],
	light: [0],
	soft: [0],
	medium: [0],
	rigid: [0],
	heavy: [0, 60],
	success: [0, 90],
	warning: [0, 120],
	error: [0, 80, 160],
};

let enabled = true;
let tick: HTMLLabelElement | null = null;

/** Safari on iOS 18 ticks when a `switch` checkbox is toggled, the only haptic the web can reach there. */
function iosTick() {
	if (!tick) {
		const label = document.createElement("label");
		label.setAttribute("aria-hidden", "true");
		Object.assign(label.style, {
			position: "fixed",
			opacity: "0",
			pointerEvents: "none",
			width: "1px",
			height: "1px",
			overflow: "hidden",
		});
		const input = document.createElement("input");
		input.type = "checkbox";
		input.setAttribute("switch", "");
		input.tabIndex = -1;
		label.append(input);
		document.body.append(label);
		tick = label;
	}
	tick.click();
}

const isIos = () =>
	typeof navigator !== "undefined" &&
	/iP(hone|ad|od)/.test(navigator.userAgent) &&
	typeof CSS !== "undefined" &&
	CSS.supports("-webkit-touch-callout", "none");

/** What this device can do with no help: vibrate, tick on iOS, or nothing. */
const builtIn: Player = (kind) => {
	if (typeof window === "undefined" || !enabled) return;
	if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
	if (isIos()) {
		for (const gap of taps[kind]) window.setTimeout(iosTick, gap);
		return;
	}
	navigator.vibrate?.(patterns[kind]);
};

let player: Player = builtIn;

/**
 * Components only ask for feedback; the app decides how it plays on this
 * device (system haptics, a vibration, or nothing) and whether it's on.
 * Without a call to this, Passui vibrates on Android and ticks on iOS Safari.
 */
export function setHapticPlayer(next: Player): void {
	player = next;
}

/** Turns the built in feedback on or off, for a settings switch. A custom player is unaffected. */
export function setHapticsEnabled(next: boolean): void {
	enabled = next;
}

/** True where the built in player can do something: vibration, or iOS Safari's switch tick. */
export function hapticsSupported(): boolean {
	return (
		typeof navigator !== "undefined" &&
		(typeof navigator.vibrate === "function" || isIos())
	);
}

export function haptic(kind: HapticKind): void {
	player(kind);
}
