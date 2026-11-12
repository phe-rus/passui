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
import { fitPopover, type PopoverFit } from "./popover-fit";
import { usePopover } from "./popover-root";

export type PopoverOrigin = "top-left" | "top-right";

export interface PopoverContentProps {
	children: ReactNode;
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
	 * ARIA role for the panel. Use "menu" for action menus, "dialog"
	 * (the default) for free-form content, "tooltip" for tips.
	 * @default "dialog"
	 */
	role?: "dialog" | "menu" | "tooltip";
}

export function PopoverContent({
	children,
	className,
	label,
	labelledBy,
	dismissOnOutsidePress = true,
	placement = "anchor",
	origin = "top-left",
	role = "dialog",
}: PopoverContentProps) {
	const { state, send, triggerRef, contentId } = usePopover();
	const panel = useRef<HTMLDivElement>(null);
	const reducedMotion = useReducedMotion();
	const [settled, setSettled] = useState(false);
	const [material, setMaterial] = useState({ width: 0, height: 0, radius: 0 });
	const [fit, setFit] = useState<PopoverFit>({
		shiftX: 0,
		shiftY: 0,
		maxWidth: 0,
		above: false,
	});
	const [reveal, setReveal] = useState<ReturnType<
		typeof menuSurfaceReveal
	> | null>(null);

	useSheetFocus(panel, () => send("CLOSE"));

	// Measure panel + trigger rects, compute the reveal (initial morph state)
	// and the viewport fit (so the panel stays on screen as it resizes).
	useLayoutEffect(() => {
		const surface = panel.current;
		const source = triggerRef.current;
		if (!surface) return;

		const refit = () => {
			const panelRect = surface.getBoundingClientRect();
			const radius =
				Number.parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 0;
			setMaterial((prev) =>
				prev.width === panelRect.width &&
				prev.height === panelRect.height &&
				prev.radius === radius
					? prev
					: { width: panelRect.width, height: panelRect.height, radius },
			);

			const visualViewport = window.visualViewport;
			const offsetLeft = visualViewport?.offsetLeft ?? 0;
			const offsetTop = visualViewport?.offsetTop ?? 0;
			const edges = screenEdges();
			const trigger = source?.getBoundingClientRect();
			const next = fitPopover(
				{
					left: panelRect.left,
					top: panelRect.top,
					width: panelRect.width,
					height: panelRect.height,
				},
				trigger ? { top: trigger.top, bottom: trigger.bottom } : undefined,
				{
					viewport: {
						width: offsetLeft + (visualViewport?.width ?? window.innerWidth),
						height: offsetTop + (visualViewport?.height ?? window.innerHeight),
					},
					edges: {
						...edges,
						left: offsetLeft + edges.left,
						top: offsetTop + edges.top,
					},
				},
				trigger ? -trigger.height : 6,
				origin,
			);
			setFit((current) => {
				if (
					current.shiftX === next.shiftX &&
					current.shiftY === next.shiftY &&
					current.maxWidth === next.maxWidth &&
					current.maxHeight === next.maxHeight &&
					current.above === next.above
				)
					return current;
				return next;
			});

			const sourceArg: MenuRect | undefined =
				trigger && trigger.width > 0 && trigger.height > 0
					? {
							left: trigger.left,
							top: trigger.top,
							width: trigger.width,
							height: trigger.height,
						}
					: undefined;
			setReveal(
				menuSurfaceReveal(sourceArg, {
					left: panelRect.left,
					top: panelRect.top,
					width: next.maxWidth || panelRect.width,
					height: next.maxHeight
						? Math.min(next.maxHeight, panelRect.height)
						: panelRect.height,
					radius,
				}),
			);
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
	}, [triggerRef, origin]);

	// Conceal the trigger while the surface is morphing.
	useLayoutEffect(() => {
		const source = triggerRef.current;
		if (!source) return;
		const restore = concealMenuSource(source, false);
		return () => {
			restore();
		};
	}, [triggerRef]);

	const anchored = placement === "anchor";

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
						className={cn(
							"relative isolate flex flex-col outline-none",
							anchored
								? cn(
										"rounded-5xl absolute z-40",
										"[&>:not([data-popover-surface])]:opacity-[var(--popover-content-opacity)]",
									)
								: "rounded-5xl fixed z-[76] max-h-[92%] w-full max-w-[560px] p-6",
							settled && anchored ? "overflow-hidden" : undefined,
							className,
						)}
						style={
							anchored
								? {
										transformOrigin:
											origin === "top-left"
												? `0% ${fit.above ? "100%" : "0%"}`
												: `100% ${fit.above ? "100%" : "0%"}`,
										translate: `${fit.shiftX}px ${fit.shiftY}px`,
										maxWidth: fit.maxWidth || undefined,
										maxHeight: fit.maxHeight,
										overflowY:
											fit.maxHeight !== undefined && settled
												? "auto"
												: undefined,
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
											height: fit.maxHeight
												? Math.min(material.height, fit.maxHeight)
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
