import { getNativeLanguageName } from "../../lib/language";
import { cn } from "../../lib/class-names";
import { motion, useDragControls, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useDismiss } from "../../hooks/use-dismiss";
import { CheckIcon, GlobeIcon } from "../../icons/icons";
import { Popover } from "../popover";

export type LocaleSwitcherSize = "sm" | "md" | "lg";

const triggerSizes: Record<LocaleSwitcherSize, string> = {
	sm: "glass-menu flex h-9 min-w-16 touch-none cursor-grab items-center justify-center gap-1.5 rounded-full px-3 text-caption2 font-semibold text-label active:cursor-grabbing",
	md: "glass-menu flex h-12 min-w-20 touch-none cursor-grab items-center justify-center gap-2 rounded-full px-4 text-caption font-semibold text-label active:cursor-grabbing",
	lg: "glass-menu flex h-14 min-w-24 touch-none cursor-grab items-center justify-center gap-2.5 rounded-full px-5 text-subheadline font-semibold text-label active:cursor-grabbing",
};
const iconSizes: Record<LocaleSwitcherSize, string> = {
	sm: "size-4",
	md: "size-5",
	lg: "size-6",
};
const popoverWidths: Record<LocaleSwitcherSize, string> = {
	sm: "w-44",
	md: "w-52",
	lg: "w-60",
};
const headerSizes: Record<LocaleSwitcherSize, string> = {
	sm: "flex min-h-9 w-full items-center justify-center gap-1.5 rounded-4xl bg-fill/50 text-caption2 font-semibold text-label",
	md: "flex min-h-12 w-full items-center justify-center gap-2 rounded-4xl bg-fill/50 text-caption font-semibold text-label",
	lg: "flex min-h-14 w-full items-center justify-center gap-2.5 rounded-4xl bg-fill/50 text-subheadline font-semibold text-label",
};
const itemSizes: Record<LocaleSwitcherSize, string> = {
	sm: "flex min-h-9 items-center justify-between gap-2 rounded-4xl px-3 py-2 text-left text-caption text-label outline-none",
	md: "flex min-h-11 items-center justify-between gap-3 rounded-4xl px-3.5 py-2.5 text-left text-footnote text-label outline-none",
	lg: "flex min-h-13 items-center justify-between gap-3 rounded-4xl px-4 py-3 text-left text-subheadline text-label outline-none",
};
const checkIconSizes: Record<LocaleSwitcherSize, string> = {
	sm: "size-3.5 shrink-0",
	md: "size-4 shrink-0",
	lg: "size-5 shrink-0",
};

type Side = "left" | "right";
type Edge = "top" | "bottom";

type Anchor = {
	side: Side;
	edge: Edge;
	x: number;
	y: number;
};

const DEFAULT_ANCHOR: Anchor = {
	side: "right",
	edge: "bottom",
	x: 20,
	y: 20,
};

function loadStoredAnchor(storageKey: string): Anchor | null {
	try {
		const raw = localStorage.getItem(storageKey);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as Partial<Anchor>;
		if (
			(parsed.side === "left" || parsed.side === "right") &&
			(parsed.edge === "top" || parsed.edge === "bottom") &&
			typeof parsed.x === "number" &&
			typeof parsed.y === "number"
		) {
			return {
				side: parsed.side,
				edge: parsed.edge,
				x: parsed.x,
				y: parsed.y,
			};
		}
	} catch {}
	return null;
}

function saveStoredAnchor(storageKey: string, anchor: Anchor) {
	try {
		localStorage.setItem(storageKey, JSON.stringify(anchor));
	} catch {}
}

export type LocaleSwitcherProps<L extends string> = {
	locales: readonly L[];
	locale: L;
	onSelect: (locale: L) => void;
	/** localStorage key for where the person dragged it. */
	storageKey: string;
	label: string;
	/** Trigger, header, list item and icon scale. @default "md" */
	size?: LocaleSwitcherSize;
};

/** A draggable floating language picker that snaps to the nearest corner. */
export function LocaleSwitcher<L extends string>({
	locales,
	locale,
	onSelect,
	storageKey,
	label,
	size = "md",
}: LocaleSwitcherProps<L>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const dragControls = useDragControls();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const [open, setOpen] = useState(false);
	const [anchor, setAnchor] = useState(DEFAULT_ANCHOR);

	const langs = Array.from(locales, (value) => ({
		value: value,
		label: getNativeLanguageName(value),
	}));

	useEffect(() => {
		const stored = loadStoredAnchor(storageKey);
		if (stored) setAnchor(stored);
	}, [storageKey]);

	useDismiss(containerRef, open, () => setOpen(false));
	useEffect(() => {
		if (open)
			containerRef.current
				?.querySelector<HTMLButtonElement>(
					'[role="menuitemradio"][aria-checked="true"]',
				)
				?.focus();
	}, [open]);

	function commitDraggedPosition() {
		const el = containerRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const side: Side =
			rect.left + rect.width / 2 < window.innerWidth / 2 ? "left" : "right";
		const edge: Edge =
			rect.top + rect.height / 2 < window.innerHeight / 2 ? "top" : "bottom";
		const next: Anchor = {
			side,
			edge,
			x: side === "left" ? rect.left : window.innerWidth - rect.right,
			y: edge === "top" ? rect.top : window.innerHeight - rect.bottom,
		};
		setAnchor(next);
		saveStoredAnchor(storageKey, next);
		x.set(0);
		y.set(0);
	}

	const growsUp = anchor.edge === "bottom";

	return (
		<motion.div
			ref={containerRef}
			drag
			dragControls={dragControls}
			dragListener={false}
			dragMomentum={false}
			dragElastic={0}
			style={{
				position: "fixed",
				x,
				y,
				...(anchor.side === "left" ? { left: anchor.x } : { right: anchor.x }),
				...(anchor.edge === "top" ? { top: anchor.y } : { bottom: anchor.y }),
			}}
			onDragEnd={commitDraggedPosition}
			onDragStart={() => setOpen(false)}
			onKeyDown={(event) => {
				if (!open) return;
				if (event.key === "Escape") {
					event.preventDefault();
					setOpen(false);
					triggerRef.current?.focus();
					return;
				}
				if (event.key === "Tab") {
					setOpen(false);
					return;
				}
				if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
					return;
				const options = Array.from(
					containerRef.current?.querySelectorAll<HTMLButtonElement>(
						'[role="menuitemradio"]',
					) ?? [],
				);
				if (!options.length) return;
				event.preventDefault();
				const current = options.indexOf(
					document.activeElement as HTMLButtonElement,
				);
				const next =
					event.key === "Home"
						? 0
						: event.key === "End"
							? options.length - 1
							: (current +
									(event.key === "ArrowDown" ? 1 : -1) +
									options.length) %
								options.length;
				options[next]?.focus();
			}}
			className="z-60"
		>
			<Popover open={open} onOpenChange={setOpen}>
				<Popover.Trigger
					render={({
						ref,
						"aria-haspopup": ariaHasPopup,
						"aria-expanded": ariaExpanded,
						"aria-controls": ariaControls,
						onClick,
						onKeyDown,
					}) => (
						<button
							ref={(node) => {
								ref(node);
								triggerRef.current = node;
							}}
							type="button"
							aria-label={label}
							aria-haspopup={ariaHasPopup}
							aria-expanded={ariaExpanded}
							aria-controls={ariaControls}
							onPointerDown={(e) => dragControls.start(e)}
							onClick={onClick}
							onKeyDown={(event) => {
								onKeyDown(event);
								if (
									!open &&
									(event.key === "ArrowDown" || event.key === "ArrowUp")
								) {
									event.preventDefault();
									setOpen(true);
								}
							}}
							className={triggerSizes[size]}
						>
							<GlobeIcon aria-hidden="true" className={iconSizes[size]} />
							{locale.toUpperCase()}
						</button>
					)}
				/>
				<Popover.Content
					origin={anchor.side === "right" ? "top-right" : "top-left"}
					role="menu"
					label={label}
					className={cn(
						"top-0 flex max-w-[calc(100vw-2.5rem)] gap-2 p-2",
						popoverWidths[size],
						anchor.side === "right" ? "right-0" : "left-0",
						growsUp ? "flex-col-reverse" : "flex-col",
					)}
				>
					<button
						type="button"
						aria-label={label}
						onClick={() => {
							setOpen(false);
							triggerRef.current?.focus();
						}}
						className={headerSizes[size]}
					>
						<GlobeIcon aria-hidden="true" className={iconSizes[size]} />
						{locale.toUpperCase()}
					</button>
					<div className="flex flex-col gap-1">
						{langs.map((item) => {
							const active = item.value === locale;
							return (
								<button
									key={item.value}
									type="button"
									role="menuitemradio"
									aria-checked={active}
									tabIndex={-1}
									onClick={() => {
										setOpen(false);
										triggerRef.current?.focus();
										if (!active) {
											onSelect(item.value);
										}
									}}
									className={cn(
										itemSizes[size],
										"hover:bg-fill/65 focus-visible:bg-fill/65 transition-colors",
										active && "bg-accent/12 font-medium",
									)}
								>
									{item.label}
									{active && (
										<CheckIcon
											aria-hidden="true"
											className={checkIconSizes[size]}
										/>
									)}
								</button>
							);
						})}
					</div>
				</Popover.Content>
			</Popover>
		</motion.div>
	);
}
