import { useEffect, useMemo, useRef } from "react";
import type { PresenceHooks } from "./presence";

/** A rectangle in viewport pixels with the radius its corners are drawn with. */
export interface DropBox {
	left: number;
	top: number;
	width: number;
	height: number;
	radius: number;
}

/** Fallback spring when the motion tokens are not loaded: a soft settle with a little overshoot. */
const OPEN_EASING = "cubic-bezier(0.2, 0.9, 0.25, 1.12)";
const OPEN_MS = 480;
/** Closing is quicker and never overshoots, so the glass does not shrink past its trigger. */
const CLOSE_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const CLOSE_MS = 320;
/** The trigger's own face gives way as the drop leaves it. */
const HIDE_MS = 140;
/** Frames to wait for the positioner to place the panel before measuring it anyway. */
const SETTLE_FRAMES = 8;

/** Whether the browser can run the morph. jsdom, old engines and Reduce Motion cannot or should not. */
export function canMorph(): boolean {
	if (typeof window === "undefined") return false;
	if (typeof Element === "undefined") return false;
	if (typeof Element.prototype.animate !== "function") return false;
	return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** The edges of a rectangle, which both a DOM element and Zag's virtual element can report. */
type EdgeRect = Pick<DOMRect, "left" | "top" | "bottom" | "width" | "height">;

/**
 * Positioning for a panel that opens on its trigger instead of beside it. The
 * water drop swells out of the trigger, so the panel's near edge belongs on the
 * trigger's near edge, not a gap away: iOS lays the menu over the button and
 * grows it from there. Pass the gap the machine adds so it cancels out.
 *
 * Give it to a machine's `positioning.getAnchorRect`. It stands down (`null`
 * means the trigger's own rectangle) wherever the morph does not run, so the
 * panel then sits below or above the trigger as usual.
 */
export function anchorOnTrigger(placement: string, gap: number) {
	return (element: { getBoundingClientRect(): EdgeRect } | null) => {
		const vertical =
			placement.startsWith("bottom") || placement.startsWith("top");
		if (!element || !vertical || !canMorph()) return null;
		const rect = element.getBoundingClientRect();
		// A zero height anchor on the near edge: the panel's edge lands on the trigger's.
		const y = placement.startsWith("top") ? rect.bottom + gap : rect.top - gap;
		return { x: rect.left, y, width: rect.width, height: 0 };
	};
}

/** Reads an element's viewport rectangle and the radius it is drawn with, capped to a full pill. */
export function readBox(el: Element): DropBox {
	const rect = el.getBoundingClientRect();
	const corner = getComputedStyle(el).borderTopLeftRadius;
	const pill = Math.min(rect.width, rect.height) / 2;
	const raw = Number.parseFloat(corner);
	const radius = corner.includes("%") ? pill : Number.isFinite(raw) ? raw : 0;
	return {
		left: rect.left,
		top: rect.top,
		width: rect.width,
		height: rect.height,
		radius: Math.min(radius, pill),
	};
}

/** One animation frame of the drop: where it sits, how big it is and how round. */
export function boxKeyframe(box: DropBox): Keyframe {
	return {
		transform: `translate(${box.left}px, ${box.top}px)`,
		width: `${box.width}px`,
		height: `${box.height}px`,
		borderRadius: `${box.radius}px`,
	};
}

/** Converts a CSS time such as `0.5s` or `450ms` to milliseconds. */
export function toMs(value: string, fallback: number): number {
	const text = value.trim();
	const n = Number.parseFloat(text);
	if (!Number.isFinite(n)) return fallback;
	return text.endsWith("ms") ? n : text.endsWith("s") ? n * 1000 : fallback;
}

/** The smooth spring from the motion tokens, falling back when they are absent. */
function openSpring(el: Element): { easing: string; ms: number } {
	const style = getComputedStyle(el);
	return {
		easing: style.getPropertyValue("--spring-smooth").trim() || OPEN_EASING,
		ms: toMs(style.getPropertyValue("--spring-smooth-duration"), OPEN_MS),
	};
}

/** Glass that grows from the source. It sits just under the panel's positioner, above any backdrop. */
function makeGhost(panel: HTMLElement, material: string): HTMLElement {
	const positioner = panel.parentElement as HTMLElement;
	const ghost = document.createElement("div");
	ghost.setAttribute("aria-hidden", "true");
	ghost.setAttribute("data-slot", "water-drop");
	ghost.className = material;
	Object.assign(ghost.style, {
		position: "fixed",
		left: "0",
		top: "0",
		margin: "0",
		boxSizing: "border-box",
		pointerEvents: "none",
		zIndex: getComputedStyle(positioner).zIndex,
	});
	positioner.parentNode?.insertBefore(ghost, positioner);
	return ghost;
}

interface Latest {
	/** Id of the element the panel grows from. Nothing morphs when it is absent. */
	sourceId: string | undefined;
	/** Utility classes that give the drop the panel's material and corner shape. */
	material: string;
}

/**
 * The water drop. A panel does not pop in at a distance from its trigger: the
 * trigger's own glass swells into the panel, and on close it drops back into
 * the trigger, like the three dot menu in iOS Notes.
 *
 * Only a separate layer of glass changes size, so the panel's content never
 * stretches. The content fades in once the glass has nearly arrived and out
 * before it leaves. Pass the returned hooks to `usePresence`.
 */
export function useWaterDrop(options: Latest): PresenceHooks<HTMLElement> {
	const latest = useRef(options);
	latest.current = options;
	const controller = useMemo(() => createController(latest), []);
	useEffect(() => controller.dispose, [controller]);
	return controller;
}

function createController(latest: { current: Latest }) {
	let animations: Animation[] = [];
	let ghosts: HTMLElement[] = [];
	let frame = 0;

	const source = () => {
		const id = latest.current.sourceId;
		return id ? document.getElementById(id) : null;
	};

	/** Stops everything this controller started, which also hands the trigger back. */
	const reset = () => {
		cancelAnimationFrame(frame);
		frame = 0;
		for (const animation of animations) animation.cancel();
		animations = [];
		for (const ghost of ghosts) ghost.remove();
		ghosts = [];
	};

	const track = (animation: Animation) => {
		animations.push(animation);
		return animation;
	};

	/** Drops the ghost once its fade ends. A cancelled fade rejects, which is fine. */
	const retireOnFinish = (fade: Animation, ghost: HTMLElement) => {
		fade.finished.then(
			() => {
				ghost.remove();
				ghosts = ghosts.filter((g) => g !== ghost);
			},
			() => {},
		);
	};

	const open = (panel: HTMLElement, from: HTMLElement) => {
		const { easing, ms } = openSpring(panel);
		const content = track(
			panel.animate(
				[{ opacity: 0 }, { opacity: 0, offset: 0.45 }, { opacity: 1 }],
				{ duration: ms, easing: "linear", fill: "both" },
			),
		);
		// Held at its first frame until the positioner has placed the panel.
		content.pause();
		let previous = "";
		let frames = 0;
		const settle = () => {
			frame = 0;
			const rect = panel.getBoundingClientRect();
			const key = `${rect.left},${rect.top},${rect.width},${rect.height}`;
			const placed = rect.width > 0 && rect.bottom > 0 && key === previous;
			if (!placed && ++frames < SETTLE_FRAMES) {
				previous = key;
				frame = requestAnimationFrame(settle);
				return;
			}
			try {
				const ghost = makeGhost(panel, latest.current.material);
				ghosts.push(ghost);
				track(
					ghost.animate(
						[boxKeyframe(readBox(from)), boxKeyframe(readBox(panel))],
						{ duration: ms, easing, fill: "forwards" },
					),
				);
				const fade = track(
					ghost.animate(
						[{ opacity: 1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }],
						{ duration: ms, easing: "linear", fill: "forwards" },
					),
				);
				retireOnFinish(fade, ghost);
				track(
					from.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: HIDE_MS,
						easing: "ease-out",
						fill: "forwards",
					}),
				);
				content.play();
				content.onfinish = () => content.cancel();
			} catch {
				reset();
				panel.removeAttribute("data-morph");
			}
		};
		frame = requestAnimationFrame(settle);
	};

	return {
		enter(panel: HTMLElement) {
			reset();
			const from = source();
			if (!from || !canMorph()) return;
			panel.setAttribute("data-morph", "");
			try {
				open(panel, from);
			} catch {
				reset();
				panel.removeAttribute("data-morph");
			}
		},

		exit(panel: HTMLElement) {
			if (!panel.hasAttribute("data-morph")) return;
			const to = source();
			// Leave from wherever the drop is now, so a close mid-open is continuous.
			const live = ghosts[0];
			const start = readBox(live ?? panel);
			const opacity = Number.parseFloat(getComputedStyle(panel).opacity);
			reset();
			if (!to) {
				panel.animate([{ opacity }, { opacity: 0 }], {
					duration: 160,
					fill: "forwards",
				});
				return;
			}
			try {
				const ghost = makeGhost(panel, latest.current.material);
				ghosts.push(ghost);
				track(
					ghost.animate([boxKeyframe(start), boxKeyframe(readBox(to))], {
						duration: CLOSE_MS,
						easing: CLOSE_EASING,
						fill: "forwards",
					}),
				);
				const fade = track(
					ghost.animate(
						[{ opacity: 1 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }],
						{ duration: CLOSE_MS, easing: "linear", fill: "forwards" },
					),
				);
				retireOnFinish(fade, ghost);
				// The panel itself stays mounted for the whole drop: presence waits on this.
				track(
					panel.animate(
						[{ opacity }, { opacity: 0, offset: 0.3 }, { opacity: 0 }],
						{ duration: CLOSE_MS, easing: "linear", fill: "forwards" },
					),
				);
				// The trigger's face returns as the drop lands on it.
				track(
					to.animate(
						[{ opacity: 0 }, { opacity: 0, offset: 0.7 }, { opacity: 1 }],
						{ duration: CLOSE_MS, easing: "linear" },
					),
				);
			} catch {
				reset();
			}
		},

		dispose: reset,
	};
}
