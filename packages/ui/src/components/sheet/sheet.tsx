import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
	type ReactNode,
	type RefObject,
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
import { useVisualViewport } from "../../hooks/use-visual-viewport";
import { cn } from "../../lib/class-names";
import {
	contentCrossfade,
	fluidCollapse,
	fluidOvershoot,
	spring,
	zoomReveal,
} from "../../motion/transitions";
import { SheetPortal } from "./sheet-portal";
import { useSheetFocus } from "./use-sheet-focus";

export type SheetPlacement = "adaptive" | "center";
export type SheetSize = "sm" | "md" | "lg";

const outerPaddings: Record<SheetSize, string> = {
	sm: "p-4",
	md: "p-6",
	lg: "p-8",
};
const panelMaxWidths: Record<SheetSize, string> = {
	sm: "max-w-sm",
	md: "max-w-[560px]",
	lg: "max-w-2xl",
};

export interface SheetProps {
	/** Controls whether the sheet is presented. */
	open: boolean;
	/** Called on Escape or an outside press. */
	onClose: () => void;
	/** Allow tapping the backdrop to close. Escape still calls onClose. @default true */
	dismissOnOutsidePress?: boolean;
	/** Read out by screen readers as the sheet's name. */
	label: string;
	/** ID of a visible heading to use instead of label for the accessible name. */
	labelledBy?: string;
	/** `adaptive` rises from the bottom on phones; `center` always floats. @default "adaptive" */
	placement?: SheetPlacement;
	/** Outer padding and panel max-width. @default "md" */
	size?: SheetSize;
	/**
	 * The element whose rect the sheet grows from and collapses back to.
	 * When provided, the glass material springs out of the source (Apple's
	 * matched-geometry effect) instead of rising from the screen edge /
	 * zooming from center. The source is concealed while mounted.
	 */
	sourceRef?: RefObject<HTMLElement | null>;
	className?: string;
	children: ReactNode;
}

/**
 * A modal card: rises from the bottom edge on phones and floats in the
 * middle on larger screens. Escape or a tap outside closes it.
 *
 * Pass `sourceRef` to make the sheet morph out of a trigger element —
 * the same matched-geometry effect `Morph` and anchored `Popover` use.
 */
export function Sheet({ open, ...props }: SheetProps) {
	return (
		<AnimatePresence>
			{open && (
				<SheetPortal>
					<OpenSheet {...props} />
				</SheetPortal>
			)}
		</AnimatePresence>
	);
}

function OpenSheet({
	onClose,
	dismissOnOutsidePress = true,
	label,
	labelledBy,
	placement = "adaptive",
	size = "md",
	sourceRef,
	className,
	children,
}: Omit<SheetProps, "open">) {
	const panel = useRef<HTMLDivElement>(null);
	const reducedMotion = useReducedMotion();
	const viewport = useVisualViewport();
	useSheetFocus(panel, onClose);

	// Morph state: the panel's resting rect + the reveal (initial material
	// state) computed from the source via menuSurfaceReveal. Mirrors Morph.
	const morphing = !!sourceRef;
	const [target, setTarget] = useState<{
		width: number;
		height: number;
		radius: number;
	} | null>(null);
	const [reveal, setReveal] = useState<ReturnType<
		typeof menuSurfaceReveal
	> | null>(null);

	// Measure the panel + source rects and compute the reveal. Re-measures on
	// resize/scroll so the morph stays aligned. Uses the same callback-ref
	// trick as PopoverContent: the panel lives behind SheetPortal (host set one
	// render later) + AnimatePresence, so panel.current is null on the first
	// commit — storing the node in state re-runs the effect when it attaches.
	const [surfaceNode, setSurfaceNode] = useState<HTMLDivElement | null>(null);
	const setPanelRef = (node: HTMLDivElement | null) => {
		panel.current = node;
		setSurfaceNode(node);
	};

	useLayoutEffect(() => {
		if (!morphing) return;
		const surface = surfaceNode;
		const source = sourceRef?.current;
		if (!surface) return;
		const measure = () => {
			const panelRect = surface.getBoundingClientRect();
			const radius =
				Number.parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 0;
			setTarget((current) =>
				current &&
				current.width === panelRect.width &&
				current.height === panelRect.height &&
				current.radius === radius
					? current
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
		const vv = window.visualViewport;
		vv?.addEventListener("resize", schedule);
		vv?.addEventListener("scroll", schedule);
		window.addEventListener("resize", schedule);
		window.addEventListener("scroll", schedule, true);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
			vv?.removeEventListener("resize", schedule);
			vv?.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			window.removeEventListener("scroll", schedule, true);
		};
	}, [surfaceNode, sourceRef, morphing]);

	// Conceal the source while the sheet is mounted; restore on unmount.
	useLayoutEffect(() => {
		if (!morphing) return;
		const source = sourceRef?.current;
		if (!source) return;
		const restore = concealMenuSource(source, false);
		return () => {
			restore();
		};
	}, [sourceRef, morphing]);

	return (
		<div
			className={cn(
				"fixed inset-0 z-[65] flex justify-center",
				placement === "center"
					? cn("items-center", outerPaddings[size])
					: cn("items-end sm:items-center", `sm:${outerPaddings[size]}`),
			)}
			style={
				viewport
					? {
							top: viewport.top,
							left: viewport.left,
							width: viewport.width,
							height: viewport.height,
							bottom: "auto",
							right: "auto",
						}
					: undefined
			}
		>
			<motion.div
				aria-hidden="true"
				className="absolute inset-0 bg-black/30 backdrop-blur-md"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={dismissOnOutsidePress ? onClose : undefined}
			/>
			<motion.div
				ref={setPanelRef}
				role="dialog"
				aria-modal="true"
				aria-label={labelledBy ? undefined : label}
				aria-labelledby={labelledBy}
				tabIndex={-1}
				className={cn(
					"relative flex w-full flex-col overflow-hidden",
					"max-h-[92%]",
					panelMaxWidths[size],
					placement === "center"
						? "rounded-sheet"
						: "rounded-t-sheet sm:rounded-sheet",
					// When morphing, the glass material is a separate surface that
					// carries the radius; the panel itself just clips content.
					!morphing && "glass-menu",
					className,
				)}
				style={{
					transformOrigin:
						placement === "center" ? "center center" : "bottom center",
				}}
				// When morphing, the panel simply fades/scales in place — the
				// travelling glass surface (below) carries the spatial motion.
				// Without a source, keep the legacy slide/zoom.
				initial={
					morphing
						? reducedMotion
							? { opacity: 0 }
							: { opacity: 0, scale: 0.98 }
						: reducedMotion
							? { opacity: 0 }
							: placement === "center"
								? zoomReveal.initial
								: { y: 40, opacity: 0, scale: 0.96 }
				}
				animate={
					morphing
						? reducedMotion
							? { opacity: 1 }
							: { opacity: 1, scale: 1 }
						: reducedMotion
							? { opacity: 1 }
							: placement === "center"
								? zoomReveal.animate
								: { y: 0, opacity: 1, scale: 1 }
				}
				exit={
					morphing
						? reducedMotion
							? { opacity: 0 }
							: { opacity: 0, scale: 0.98 }
						: reducedMotion
							? { opacity: 0 }
							: placement === "center"
								? zoomReveal.exit
								: { y: 30, opacity: 0, scale: 0.98 }
				}
				transition={
					reducedMotion
						? { duration: 0 }
						: morphing
							? { ...fluidOvershoot, opacity: { duration: 0.18 } }
							: placement === "center"
								? zoomReveal.transition
								: { ...spring.bouncy, opacity: { duration: 0.18 } }
				}
			>
				{morphing && (
					// The morphing glass material — same pattern as Morph /
					// PopoverContent. Starts at the source's rect (offset relative
					// to the panel) and grows to fill the panel, with the fluid
					// overshoot bounce; collapses back to the source on exit.
					<motion.div
						key={reveal ? "surface" : "measure"}
						aria-hidden="true"
						data-sheet-surface=""
						className="glass-menu rounded-sheet pointer-events-none absolute top-0 left-0 -z-10"
						style={{ width: "100%", height: "100%" }}
						initial={reducedMotion || !reveal ? { opacity: 0 } : reveal}
						animate={
							target
								? {
										x: 0,
										y: 0,
										width: target.width,
										height: target.height,
										opacity: 1,
										borderRadius: target.radius,
									}
								: undefined
						}
						exit={
							reducedMotion || !reveal
								? { opacity: 0 }
								: { ...menuSurfaceExit(reveal), transition: fluidCollapse }
						}
						transition={
							reducedMotion
								? { duration: 0 }
								: { ...fluidOvershoot, opacity: { duration: 0.18 } }
						}
					/>
				)}
				<motion.div
					className="flex min-h-0 flex-1 flex-col overflow-y-auto"
					initial={reducedMotion ? false : contentCrossfade.initial}
					animate={reducedMotion ? undefined : contentCrossfade.animate}
					exit={reducedMotion ? undefined : contentCrossfade.exit}
					transition={
						reducedMotion ? { duration: 0 } : contentCrossfade.transition
					}
				>
					{children}
				</motion.div>
			</motion.div>
		</div>
	);
}
