import {
	AnimatePresence,
	type HTMLMotionProps,
	motion,
	useReducedMotion,
} from "motion/react";
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
import { useSheetFocus } from "../sheet/use-sheet-focus";
import { SheetPortal } from "../sheet/sheet-portal";
import { cn } from "../../lib/class-names";
import {
	contentCrossfade,
	fluidCollapse,
	fluidOvershoot,
} from "../../motion/transitions";

export type MorphSize = "sm" | "md" | "lg";

const outerPaddings: Record<MorphSize, string> = {
	sm: "p-4",
	md: "p-6",
	lg: "p-8",
};
const panelMaxWidths: Record<MorphSize, string> = {
	sm: "max-w-sm",
	md: "max-w-[720px]",
	lg: "max-w-3xl",
};

export interface MorphProps extends Omit<HTMLMotionProps<"div">, "children"> {
	/** Controls whether the overlay is presented. */
	open: boolean;
	/** Called on Escape or outside press. */
	onClose: () => void;
	/** The element whose rect the overlay grows from and collapses back to. */
	sourceRef: RefObject<HTMLElement | null>;
	/** Accessible name (used when there is no labelledBy). */
	label: string;
	/** ID of a visible heading inside the overlay. */
	labelledBy?: string;
	/** Allow tapping the backdrop to close. Escape still calls onClose. @default true */
	dismissOnOutsidePress?: boolean;
	/** Outer padding and panel max-width. @default "md" */
	size?: MorphSize;
	className?: string;
	children?: ReactNode;
}

/**
 * A modal overlay that morphs its glass material from a source element's
 * rect to its own resting rect, then collapses back — Apple's
 * matched-geometry effect. The source is concealed while the overlay is
 * mounted so the material reads as the source itself springing open.
 *
 * Reuses `SheetPortal` (theme inheritance), `useSheetFocus` (focus trap,
 * Escape, modal environment) and the same `menuSurfaceReveal` FLIP
 * primitive that powers anchored `Popover` and `ContextMenu`.
 */
export function Morph({ open, ...props }: MorphProps) {
	return <AnimatePresence>{open && <OpenMorph {...props} />}</AnimatePresence>;
}

function OpenMorph({
	onClose,
	sourceRef,
	label,
	labelledBy,
	dismissOnOutsidePress = true,
	size = "md",
	className,
	children,
	...props
}: Omit<MorphProps, "open">) {
	const panel = useRef<HTMLDivElement>(null);
	const reducedMotion = useReducedMotion();
	const [settled, setSettled] = useState(false);
	const [target, setTarget] = useState<{
		width: number;
		height: number;
		radius: number;
	} | null>(null);
	const [reveal, setReveal] = useState<ReturnType<
		typeof menuSurfaceReveal
	> | null>(null);
	useSheetFocus(panel, onClose);

	// Measure the panel's resting rect and the source's rect, then compute
	// the reveal (initial material state) from menuSurfaceReveal. Re-measures
	// on resize/scroll so the morph stays aligned if either moves.
	useLayoutEffect(() => {
		const surface = panel.current;
		const source = sourceRef.current;
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
	}, [sourceRef]);

	// Conceal the source while the morph is mounted; restore on unmount.
	useLayoutEffect(() => {
		const source = sourceRef.current;
		if (!source) return;
		const restore = concealMenuSource(source, false);
		return () => {
			restore();
		};
	}, [sourceRef]);

	return (
		<SheetPortal>
			<div
				className={cn(
					"fixed inset-0 z-[75] flex items-center justify-center",
					outerPaddings[size],
				)}
			>
				<motion.div
					aria-hidden="true"
					className="absolute inset-0 bg-black/30 backdrop-blur-md"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={reducedMotion ? { duration: 0 } : { duration: 0.18 }}
					onClick={dismissOnOutsidePress ? onClose : undefined}
				/>
				<motion.div
					ref={panel}
					role="dialog"
					aria-modal="true"
					aria-label={labelledBy ? undefined : label}
					aria-labelledby={labelledBy}
					tabIndex={-1}
					className={cn(
						"rounded-5xl relative isolate flex w-full flex-col outline-none",
						"max-h-[92%]",
						panelMaxWidths[size],
						settled && "overflow-hidden",
						className,
					)}
					{...props}
				>
					{/* The morphing material — mirrors Popover's data-popover-surface
                        pattern. Starts at the source's rect (offset relative to the
                        panel) and grows to fill the panel, with the fluid overshoot
                        bounce. Border radius interpolates from the source's
                        "pillified" radius to the panel's authored radius. */}
					<motion.div
						key={reveal ? "surface" : "measure"}
						aria-hidden="true"
						data-morph-surface=""
						onAnimationComplete={() => {
							if (reveal) setSettled(true);
						}}
						className="glass-menu rounded-5xl pointer-events-none absolute top-0 left-0 -z-10"
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
		</SheetPortal>
	);
}
