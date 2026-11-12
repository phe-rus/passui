import {
	AnimatePresence,
	motion,
	useIsPresent,
	useReducedMotion,
} from "motion/react";
import {
	type ReactNode,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { concealMenuSource } from "../context-menu/conceal-menu-source";
import {
	menuSurfaceExit,
	menuSurfaceReveal,
	type MenuRect,
} from "../context-menu/menu-reveal";
import { useSheetFocus } from "../sheet/use-sheet-focus";
import { SheetPortal } from "../sheet/sheet-portal";
import { cn } from "../../lib/class-names";
import {
	contentCrossfade,
	fluidCollapse,
	fluidOvershoot,
} from "../../motion/transitions";
import { usePopover } from "./popover-root";

export function PopoverContent({
	children,
	className,
	label,
	labelledBy,
	dismissOnOutsidePress = true,
	placement = "anchor",
}: {
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
}) {
	const { state, send, triggerRef, contentId } = usePopover();
	const panel = useRef<HTMLDivElement>(null);
	const reducedMotion = useReducedMotion();
	const present = useIsPresent();
	const [settled, setSettled] = useState(false);
	const [material, setMaterial] = useState({ width: 0, height: 0, radius: 0 });
	const [reveal, setReveal] = useState<ReturnType<
		typeof menuSurfaceReveal
	> | null>(null);

	useSheetFocus(panel, () => send("CLOSE"));

	// Measure panel + trigger rects, compute the reveal (initial morph state).
	useLayoutEffect(() => {
		const surface = panel.current;
		const source = triggerRef.current;
		if (!surface) return;

		const measure = () => {
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

			const sourceRect = source?.getBoundingClientRect();
			const sourceArg: MenuRect | undefined =
				sourceRect && sourceRect.width > 0 && sourceRect.height > 0
					? {
							left: sourceRect.left,
							top: sourceRect.top,
							width: sourceRect.width,
							height: sourceRect.height,
						}
					: undefined;
			setReveal(
				menuSurfaceReveal(sourceArg, {
					left: panelRect.left,
					top: panelRect.top,
					width: panelRect.width,
					height: panelRect.height,
					radius,
				}),
			);
		};

		measure();
		let frame = 0;
		const schedule = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(measure);
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
	}, [triggerRef]);

	// Conceal the trigger while the surface is morphing.
	useLayoutEffect(() => {
		const source = triggerRef.current;
		if (!source) return;
		const restore = concealMenuSource(source, false);
		return () => {
			restore();
		};
	}, [triggerRef]);

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
						role="dialog"
						aria-modal={placement === "center" || undefined}
						aria-label={labelledBy ? undefined : label}
						aria-labelledby={labelledBy}
						tabIndex={-1}
						data-state={state}
						className={cn(
							"relative isolate flex flex-col outline-none",
							placement === "center"
								? "fixed z-[76] max-h-[92%] max-w-[560px] w-full p-6"
								: "absolute z-40",
							settled && "overflow-hidden",
							className,
						)}
						initial={
							placement === "center"
								? { opacity: 0 }
								: { "--popover-content-opacity": reducedMotion ? 1 : 0 }
						}
						animate={
							placement === "center"
								? { opacity: 1 }
								: { "--popover-content-opacity": 1 }
						}
						exit={
							placement === "center"
								? { opacity: 0 }
								: {
										"--popover-content-opacity": 0,
										transition: { duration: reducedMotion ? 0 : 0.06 },
									}
						}
						transition={
							placement === "center"
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
							className={cn(
								"glass-menu pointer-events-none absolute top-0 left-0 -z-10",
								placement === "center" ? "rounded-5xl" : "rounded-5xl",
							)}
							style={{ width: "100%", height: "100%" }}
							initial={reducedMotion || !reveal ? { opacity: 0 } : reveal}
							animate={
								material.width > 0
									? {
											x: 0,
											y: 0,
											width: material.width,
											height: material.height,
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
