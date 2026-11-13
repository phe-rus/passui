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
const CLOSE_EASING = "cubic-bezier(0.45, 0, 0.2, 1)";
const CLOSE_MS = 480;
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
type EdgeRect = Pick<
	DOMRect,
	"left" | "top" | "right" | "bottom" | "width" | "height"
>;

type Side = "top" | "bottom" | "left" | "right";

const OPPOSITE: Record<Side, Side> = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left",
};

const isSide = (value: string | undefined): value is Side =>
	value === "top" ||
	value === "bottom" ||
	value === "left" ||
	value === "right";

/** What an anchor needs to know beyond the trigger's rectangle. */
export interface AnchorState {
	/** Set once the machine has flipped to the opposite side, so the anchor follows it. */
	flipped?: boolean;
	/**
	 * Extra pixels to move the panel along the vertical axis, measured when the
	 * panel is open. Item aligned Select uses it to land the selected option on
	 * the trigger's value. Only applies to a panel opening downward.
	 */
	shift?: () => number;
}

/**
 * Positioning for a panel that opens on its trigger instead of beside it. The
 * water drop swells out of the trigger, so the panel's near edge belongs on the
 * trigger's near edge, not a gap away: iOS lays the menu over the button and
 * grows it from there. Pass the gap the machine adds so it cancels out.
 *
 * Works on all four sides: above and below the anchor is a flat line on the
 * trigger's top or bottom edge; left and right it is a line on the left or
 * right edge, as tall as the trigger so start and end alignment still hold.
 *
 * Give it to a machine's `positioning.getAnchorRect`. It stands down (`null`
 * means the trigger's own rectangle) wherever the morph does not run, so the
 * panel then sits beside the trigger as usual.
 */
export function anchorOnTrigger(
	placement: string,
	gap: number,
	state?: AnchorState,
) {
	return (element: { getBoundingClientRect(): EdgeRect } | null) => {
		const asked = placement.split("-")[0];
		if (!element || !isSide(asked) || !canMorph()) return null;
		const side = state?.flipped ? OPPOSITE[asked] : asked;
		const rect = element.getBoundingClientRect();
		// The machine puts the panel a gap past the anchor, so the anchor is a gap
		// inside the trigger's edge on the side the panel opens toward.
		switch (side) {
			case "bottom": {
				const shift = state?.shift?.() ?? 0;
				return {
					x: rect.left,
					y: rect.top - gap + shift,
					width: rect.width,
					height: 0,
				};
			}
			case "top":
				return {
					x: rect.left,
					y: rect.bottom + gap,
					width: rect.width,
					height: 0,
				};
			case "right":
				return {
					x: rect.left - gap,
					y: rect.top,
					width: 0,
					height: rect.height,
				};
			case "left":
				return {
					x: rect.right + gap,
					y: rect.top,
					width: 0,
					height: rect.height,
				};
		}
	};
}

/** The side a machine placed its panel on, from the positioner's props. */
export function positionerSide(props: object): string | undefined {
	const side = (props as Record<string, unknown>)["data-side"];
	return typeof side === "string" ? side : undefined;
}

/** A trigger anchor that follows the panel when the machine flips it to the other side. */
export interface TriggerAnchor {
	getAnchorRect: ReturnType<typeof anchorOnTrigger>;
	/** Read and written by the anchor and `useAnchorFollow`. */
	state: AnchorState;
	/** The side the placement asked for. */
	base: string;
}

/**
 * `anchorOnTrigger` that survives a flip. The machine decides the side after the
 * anchor is read, so a panel pushed to the other side of the trigger would float
 * a gap away from it. Pass the result to `useAnchorFollow` once the machine's
 * api exists.
 */
export function useTriggerAnchor(
	placement: string,
	gap: number,
): TriggerAnchor {
	return useMemo(() => {
		const state: AnchorState = {};
		return {
			getAnchorRect: anchorOnTrigger(placement, gap, state),
			state,
			base: placement.split("-")[0] ?? placement,
		};
	}, [placement, gap]);
}

/**
 * Re-aims the anchor at the trigger's opposite edge the first time the machine
 * opens on the other side, then repositions. The panel is still hidden while
 * the drop waits for it to settle, so the correction is never seen. It flips at
 * most once per opening, so a panel that fits neither side cannot loop.
 */
export function useAnchorFollow(
	anchor: TriggerAnchor,
	open: boolean,
	side: string | undefined,
	reposition: () => void,
) {
	const again = useRef(reposition);
	again.current = reposition;
	useEffect(() => {
		if (!open) {
			anchor.state.flipped = false;
			return;
		}
		if (anchor.state.flipped || !isSide(side) || side === anchor.base) return;
		anchor.state.flipped = true;
		again.current();
	}, [anchor, open, side]);
}

/**
 * How far to move a downward list so its selected option lands on the trigger's
 * value, as macOS and iOS pickers do. Measured from the open list, which is
 * already in the DOM when the machine positions it. Returns 0 (the list sits
 * below the trigger) when nothing is selected or the list scrolls, because a
 * scrolled list cannot keep the option and the trigger together.
 */
export function alignSelectedOption(
	trigger: Element | null,
	list: HTMLElement | null,
	selector = '[role="option"][data-state="checked"]',
): number {
	const option = list?.querySelector<HTMLElement>(selector);
	if (!trigger || !list || !option) return 0;
	if (list.scrollHeight > list.clientHeight + 1) return 0;
	// offsetTop is relative to the positioner for both, so the difference holds
	// whatever the list's own offset parent is.
	const optionCenter =
		option.offsetTop - list.offsetTop + option.offsetHeight / 2;
	const triggerCenter = trigger.getBoundingClientRect().height / 2;
	return triggerCenter - optionCenter;
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

/** Half the size of the bead of glass a point origin starts as and lands on. */
const POINT_RADIUS = 6;

/** A small round bead centered on a point, where a context menu's glass starts and lands. */
export function pointBox(x: number, y: number): DropBox {
	return {
		left: x - POINT_RADIUS,
		top: y - POINT_RADIUS,
		width: POINT_RADIUS * 2,
		height: POINT_RADIUS * 2,
		radius: POINT_RADIUS,
	};
}

interface Latest {
	/** Id of the element the panel grows from. Nothing morphs when it is absent. */
	sourceId: string | undefined;
	/**
	 * Where the glass grows from when there is no source element, such as the
	 * pointer of a context menu. Read when the panel opens and again when it closes.
	 */
	point?: () => { x: number; y: number } | null;
	/** Utility classes that give the drop the panel's material and corner shape. */
	material: string;
	/**
	 * For a field the reader keeps typing in, such as a combobox. The source stays
	 * visible the whole time and the glass grows from, and returns to, the
	 * source's bottom edge instead of swelling out of its face.
	 */
	keepSource?: boolean;
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

/** Where a drop starts and lands, and the element whose face it hides on the way, if any. */
interface Origin {
	el: HTMLElement | null;
	box: DropBox;
}

function createController(latest: { current: Latest }) {
	let animations: Animation[] = [];
	let ghosts: HTMLElement[] = [];
	let frame = 0;

	/** The element the glass grows from, when there is one. */
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

	/** Where the glass starts and lands: the source's box, or a flat line on its bottom edge. */
	const sourceBox = (from: HTMLElement): DropBox => {
		const box = readBox(from);
		return latest.current.keepSource
			? { ...box, top: box.top + box.height, height: 0 }
			: box;
	};

	/** Where the glass starts and lands: the source element, or else a bead at the point. */
	const origin = (): Origin | null => {
		const el = source();
		if (el) return { el, box: sourceBox(el) };
		const at = latest.current.point?.();
		return at ? { el: null, box: pointBox(at.x, at.y) } : null;
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

	const open = (panel: HTMLElement, from: Origin) => {
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
					ghost.animate([boxKeyframe(from.box), boxKeyframe(readBox(panel))], {
						duration: ms,
						easing,
						fill: "forwards",
					}),
				);
				const fade = track(
					ghost.animate(
						[{ opacity: 1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }],
						{ duration: ms, easing: "linear", fill: "forwards" },
					),
				);
				retireOnFinish(fade, ghost);
				if (from.el && !latest.current.keepSource) {
					track(
						from.el.animate([{ opacity: 1 }, { opacity: 0 }], {
							duration: HIDE_MS,
							easing: "ease-out",
							fill: "forwards",
						}),
					);
				}
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
			const from = origin();
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
			const to = origin();
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
					ghost.animate([boxKeyframe(start), boxKeyframe(to.box)], {
						duration: CLOSE_MS,
						easing: CLOSE_EASING,
						fill: "forwards",
					}),
				);
				const fade = track(
					ghost.animate(
						[{ opacity: 1 }, { opacity: 1, offset: 0.88 }, { opacity: 0 }],
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
				if (to.el && !latest.current.keepSource) {
					track(
						to.el.animate(
							[{ opacity: 0 }, { opacity: 0, offset: 0.8 }, { opacity: 1 }],
							{ duration: CLOSE_MS, easing: "linear" },
						),
					);
				}
			} catch {
				reset();
			}
		},

		dispose: reset,
	};
}
