import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { concealMenuSource } from "../context-menu/conceal-menu-source";
import {
	menuSurfaceExit,
	menuSurfaceReveal,
	type MenuRect,
} from "../context-menu/menu-reveal";
import { useSheetFocus } from "../sheet/use-sheet-focus";
import { SheetPortal } from "../sheet/sheet-portal";
import { cn } from "../../lib/class-names";
import { screenEdges } from "../../lib/screen-edges";
import { fluidCollapse, fluidOvershoot } from "../../motion/transitions";
import { usePopover } from "./popover-root";

export type PopoverOrigin = "top-left" | "top-right";

export interface PopoverContentProps {
	children: ReactNode;
	/** Extra classes for the panel (sizing, padding, max-height). */
	className?: string;
	/** Accessible name (used when there is no labelledBy). */
	label?: string;
	/** ID of a visible heading inside the content. */
	labelledBy?: string;
	/** Allow tapping outside to close. Escape always closes. */
	dismissOnOutsidePress?: boolean;
	/**
	 * Where the content rests once expanded:
	 * - "anchor" positions relative to the trigger (default)
	 * - "center" floats in the middle of the viewport (modal)
	 */
	placement?: "anchor" | "center";
	/**
	 * Which corner the popover grows from when placement="anchor".
	 * top-left: panel's left edge aligns to the trigger's left.
	 * top-right: panel's right edge aligns to the trigger's right.
	 * @default "top-left"
	 */
	origin?: PopoverOrigin;
	/**
	 * Gap between the trigger and the panel, in pixels.
	 * @default 8
	 */
	gap?: number;
	/**
	 * ARIA role for the panel. Use "menu" for action menus, "dialog"
	 * (the default) for free-form content, "tooltip" for tips.
	 * @default "dialog"
	 */
	role?: "dialog" | "menu" | "tooltip";
}

interface Placement {
	/** Fixed left in viewport px. */
	left: number;
	/** Fixed top in viewport px. */
	top: number;
	/** Width cap so the panel never crosses the right safe edge. */
	maxWidth: number;
	/** Height cap; when set, the panel scrolls inside it. */
	maxHeight?: number;
	/** True when the panel opens above the trigger. */
	above: boolean;
}

const NO_PLACEMENT: Placement = {
	left: 0,
	top: 0,
	maxWidth: 0,
	above: false,
};

/**
 * Place the panel below (or above) the trigger, aligned to the chosen
 * corner, kept inside the screen's safe edges. Pure: no DOM, just math.
 */
function placePanel(
	trigger: DOMRect,
	panel: { width: number; height: number },
	origin: PopoverOrigin,
	gap: number,
): Placement {
	const edges = screenEdges();
	const vv = window.visualViewport;
	const vw = (vv?.width ?? window.innerWidth) + (vv?.offsetLeft ?? 0);
	const vh = (vv?.height ?? window.innerHeight) + (vv?.offsetTop ?? 0);
	const safeLeft = edges.left + (vv?.offsetLeft ?? 0);
	const safeRight = vw - edges.right;
	const safeTop = edges.top + (vv?.offsetTop ?? 0);
	const safeBottom = vh - edges.bottom;

	// Horizontal: align the chosen edge to the trigger, then clamp into view.
	const maxWidth = Math.max(0, safeRight - safeLeft);
	const width = Math.min(panel.width, maxWidth);
	const left =
		origin === "top-right"
			? Math.max(safeLeft, Math.min(trigger.right - width, safeRight - width))
			: Math.max(safeLeft, Math.min(trigger.left, safeRight - width));

	// Vertical: prefer below; flip above when there isn't room below but
	// there is above (matching the legacy popover's behaviour).
	const roomBelow = safeBottom - trigger.bottom - gap;
	const roomAbove = trigger.top - gap - safeTop;
	const above = roomBelow < panel.height && roomAbove > roomBelow;
	const room = above ? roomAbove : roomBelow;
	const top = above
		? trigger.top - gap - Math.min(panel.height, room)
		: trigger.bottom + gap;
	const maxHeight = panel.height > room ? room : undefined;

	return { left, top, maxWidth, maxHeight, above };
}

export function PopoverContent({
	children,
	className,
	label,
	labelledBy,
	dismissOnOutsidePress = true,
	placement = "anchor",
	origin = "top-left",
	gap = 8,
	role = "dialog",
}: PopoverContentProps) {
	const { state, send, triggerRef, contentId } = usePopover();
	const panel = useRef<HTMLDivElement>(null);
	const reducedMotion = useReducedMotion();
	const [settled, setSettled] = useState(false);
	const [material, setMaterial] = useState({ width: 0, height: 0, radius: 0 });
	const [placementState, setPlacement] = useState<Placement>(NO_PLACEMENT);
	const [reveal, setReveal] = useState<ReturnType<
		typeof menuSurfaceReveal
	> | null>(null);

	useSheetFocus(panel, () => send("CLOSE"));

	// Re-measure on every layout pass: trigger position, panel size, scroll,
	// viewport resize. Recompute the fixed placement + the morph source rect.
	useLayoutEffect(() => {
		const surface = panel.current;
		const source = triggerRef.current;
		if (!surface) return;

		const refit = () => {
			const trigger = source?.getBoundingClientRect();
			// Measure the authored size (padding/width from className) so the
			// morph target is the natural panel the author styled.
			const natural = surface.getBoundingClientRect();
			const radius =
				Number.parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 0;
			setMaterial((prev) =>
				prev.width === natural.width &&
				prev.height === natural.height &&
				prev.radius === radius
					? prev
					: { width: natural.width, height: natural.height, radius },
			);

			if (trigger && trigger.width > 0 && trigger.height > 0) {
				const next = placePanel(
					trigger,
					{ width: natural.width, height: natural.height },
					origin,
					gap,
				);
				setPlacement((current) =>
					current.left === next.left &&
					current.top === next.top &&
					current.maxWidth === next.maxWidth &&
					current.maxHeight === next.maxHeight &&
					current.above === next.above
						? current
						: next,
				);
				const sourceArg: MenuRect = {
					left: trigger.left,
					top: trigger.top,
					width: trigger.width,
					height: trigger.height,
				};
				setReveal(
					menuSurfaceReveal(sourceArg, {
						left: next.left,
						top: next.top,
						width: Math.min(natural.width, next.maxWidth),
						height: next.maxHeight
							? Math.min(natural.height, next.maxHeight)
							: natural.height,
						radius,
					}),
				);
			}
		};

		refit();
		let frame = 0;
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(refit);
		};
		const observer = new ResizeObserver(schedule);
		observer.observe(surface);
		if (source) observer.observe(source);
		const viewport = window.visualViewport;
		viewport?.addEventListener("resize", schedule);
		viewport?.addEventListener("scroll", schedule);
		window.addEventListener("resize", schedule);
		window.addEventListener("scroll", schedule, true);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
			viewport?.removeEventListener("resize", schedule);
			viewport?.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			window.removeEventListener("scroll", schedule, true);
		};
	}, [triggerRef, origin, gap]);

	// Conceal the trigger while the surface is morphing out of it.
	useLayoutEffect(() => {
		const source = triggerRef.current;
		if (!source) return;
		const restore = concealMenuSource(source, false);
		return () => {
			restore();
		};
	}, [triggerRef]);

	const anchored = placement === "anchor";
	const scrollable = settled && placementState.maxHeight !== undefined;

	return (
		<AnimatePresence>
			{state !== "closed" && (
				<SheetPortal>
					{placement === "center" && (
						<motion.div
							aria-hidden="true"
							className="fixed inset-0 z-[75] bg-black/30 backdrop-blur-md"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={reducedMotion ? { duration: 0 } : { duration: 0.18 }}
							onClick={dismissOnOutsidePress ? () => send("CLOSE") : undefined}
						/>
					)}
					<motion.div
						ref={panel}
						id={contentId}
						role={role}
						aria-modal={placement === "center" || undefined}
						aria-label={labelledBy ? undefined : label}
						aria-labelledby={labelledBy}
						tabIndex={-1}
						data-state={state}
						data-placement={
							anchored ? (placementState.above ? "top" : "bottom") : "center"
						}
						className={cn(
							"isolate flex flex-col outline-none",
							anchored
								? "rounded-5xl absolute z-40 [&>:not([data-popover-surface])]:opacity-[var(--popover-content-opacity)]"
								: "rounded-5xl fixed z-[76] max-h-[92%] w-full max-w-[560px] p-6",
							scrollable ? "overflow-hidden" : undefined,
							className,
						)}
						style={
							anchored
								? {
										position: "fixed",
										left: placementState.left,
										top: placementState.top,
										maxWidth: placementState.maxWidth || undefined,
										maxHeight: placementState.maxHeight,
										overflowY: scrollable ? "auto" : undefined,
										transformOrigin:
											origin === "top-left"
												? `0% ${placementState.above ? "100%" : "0%"}`
												: `100% ${placementState.above ? "100%" : "0%"}`,
									}
								: undefined
						}
						initial={
							anchored
								? { "--popover-content-opacity": reducedMotion ? 1 : 0 }
								: { opacity: 0 }
						}
						animate={
							anchored ? { "--popover-content-opacity": 1 } : { opacity: 1 }
						}
						exit={
							anchored
								? {
										"--popover-content-opacity": 0,
										transition: { duration: reducedMotion ? 0 : 0.06 },
									}
								: { opacity: 0 }
						}
						transition={
							anchored
								? reducedMotion
									? { duration: 0 }
									: { duration: 0.16, delay: 0.06 }
								: reducedMotion
									? { duration: 0 }
									: { duration: 0.16, delay: 0.06 }
						}
					>
						{/* The morphing glass surface — starts at the trigger's rect
						    and grows to fill the panel, with the fluid overshoot bounce. */}
						<motion.div
							key={reveal ? "surface" : "measure"}
							aria-hidden="true"
							data-popover-surface=""
							onAnimationComplete={() => {
								if (state === "opening") send("OPENED");
								if (state === "closing") send("CLOSED");
								if (reveal) setSettled(true);
							}}
							className="glass-menu rounded-5xl pointer-events-none absolute top-0 left-0 -z-10"
							style={{ width: "100%", height: "100%" }}
							initial={reducedMotion || !reveal ? { opacity: 0 } : reveal}
							animate={
								material.width > 0
									? {
											x: 0,
											y: 0,
											width: material.width,
											height: placementState.maxHeight
												? Math.min(material.height, placementState.maxHeight)
												: material.height,
											opacity: 1,
											borderRadius: material.radius,
										}
									: undefined
							}
							exit={
								reducedMotion || !reveal
									? { opacity: 0 }
									: {
											...menuSurfaceExit(reveal),
											transition: fluidCollapse,
										}
							}
							transition={
								reducedMotion
									? { duration: 0 }
									: { ...fluidOvershoot, opacity: { duration: 0.16 } }
							}
						/>
						{/* Content fades in after the surface arrives. */}
						<motion.div
							initial={reducedMotion ? false : { opacity: 0 }}
							animate={reducedMotion ? undefined : { opacity: 1 }}
							exit={
								reducedMotion
									? undefined
									: { opacity: 0, transition: { duration: 0.12 } }
							}
							transition={
								reducedMotion
									? { duration: 0 }
									: { duration: 0.16, delay: 0.06 }
							}
						>
							{state !== "closing" && children}
						</motion.div>
					</motion.div>
				</SheetPortal>
			)}
		</AnimatePresence>
	);
}
