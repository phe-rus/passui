"use client";

import {
	type ComponentProps,
	type ReactNode,
	useLayoutEffect,
	useRef,
} from "react";
import { useMinimizeOnScroll } from "../hooks/use-minimize-on-scroll";
import { cx } from "../lib/cx";
import { haptic } from "../lib/haptics";

export type TabBarSize = "sm" | "md" | "lg";

/** iOS's own proportions: a 24 pt symbol over an 11 pt label, in a floating capsule. */
const sizes: Record<TabBarSize, string> = {
	sm: "[--tab-icon:1.25rem] [--tab-min:3.5rem] [--tab-pad:0.25rem]",
	md: "[--tab-icon:1.5rem] [--tab-min:4rem] [--tab-pad:0.375rem]",
	lg: "[--tab-icon:1.75rem] [--tab-min:4.5rem] [--tab-pad:0.5rem]",
};

export type TabBarProps = ComponentProps<"nav"> & {
	/** Shrinks to icons only, like iOS 26 while you scroll down. Leave undefined to let `autoMinimize` decide. */
	minimized?: boolean;
	/**
	 * Minimizes by itself while the person scrolls down through content and
	 * restores on scroll up, at the top, or when the bar is tapped.
	 */
	autoMinimize?: boolean;
	/** Item size, from the symbol to the label. @default "md" */
	size?: TabBarSize;
	/**
	 * A separate round button beside the capsule, the iOS 26 "four and one"
	 * layout: four destinations and a search or compose action of their own.
	 */
	action?: ReactNode;
};

/** The bottom tab bar: a floating glass capsule of destinations, with one lens that glides to the chosen one. */
export function TabBar({
	minimized,
	autoMinimize = false,
	size = "md",
	action,
	className,
	children,
	onPointerUp,
	...props
}: TabBarProps) {
	const [scrolled, setScrolled] = useMinimizeOnScroll(autoMinimize);
	const isMin = minimized ?? (autoMinimize ? scrolled : false);
	const bar = useRef<HTMLElement>(null);

	// The lens is one element that follows the current item's box, so it glides
	// and stretches between destinations instead of fading in and out.
	useLayoutEffect(() => {
		const node = bar.current;
		if (!node) return;
		const place = () => {
			const current = node.querySelector<HTMLElement>(
				'[data-slot="tab-bar-item"][aria-current="page"]',
			);
			if (!current) {
				node.style.setProperty("--lens-w", "0px");
				return;
			}
			node.style.setProperty("--lens-x", `${current.offsetLeft}px`);
			node.style.setProperty("--lens-w", `${current.offsetWidth}px`);
			node.style.setProperty("--lens-h", `${current.offsetHeight}px`);
			node.style.setProperty("--lens-y", `${current.offsetTop}px`);
		};
		place();
		const observer = new ResizeObserver(place);
		observer.observe(node);
		for (const item of node.querySelectorAll("[data-slot=tab-bar-item]"))
			observer.observe(item);
		return () => observer.disconnect();
	});

	const capsule = (
		<nav
			ref={bar}
			data-slot="tab-bar"
			data-size={size}
			data-minimized={isMin || undefined}
			onPointerUp={(event) => {
				onPointerUp?.(event);
				// Tapping the shrunken bar brings the labels back, as on iOS.
				if (autoMinimize && isMin) setScrolled(false);
			}}
			className={cx(
				"glass spring-smooth shadow-floating relative mx-auto flex w-fit items-stretch gap-0.5 rounded-full p-1 transition-[padding,gap] motion-reduce:transition-none data-[minimized]:gap-0 data-[minimized]:p-0.5",
				sizes[size],
				className,
			)}
			{...props}
		>
			<span
				aria-hidden="true"
				data-slot="tab-bar-lens"
				className="glass-lens spring-smooth pointer-events-none absolute top-(--lens-y,0px) left-(--lens-x,0px) z-0 h-(--lens-h,0px) w-(--lens-w,0px) rounded-full opacity-0 transition-[left,top,width,height,opacity] motion-reduce:transition-none [nav:has([aria-current=page])>&]:opacity-100"
			/>
			{children}
		</nav>
	);
	if (!action) return capsule;
	return (
		<div
			data-slot="tab-bar-root"
			className="mx-auto flex w-fit items-center gap-2"
		>
			{capsule}
			{action}
		</div>
	);
}

export type TabBarItemProps = Omit<ComponentProps<"button">, "children"> & {
	icon: ReactNode;
	/** The visible name. Always kept for assistive technology, even when minimized. */
	label: string;
	/** The current destination. */
	active?: boolean;
};

export function TabBarItem({
	icon,
	label,
	active,
	className,
	onClick,
	...props
}: TabBarItemProps) {
	return (
		<button
			type="button"
			data-slot="tab-bar-item"
			aria-current={active ? "page" : undefined}
			aria-label={label}
			onClick={(event) => {
				if (!active) haptic("selection");
				onClick?.(event);
			}}
			className={cx(
				"group spring-snappy text-caption2 text-label-secondary hover:text-label focus-visible:ring-accent/70 aria-[current=page]:text-accent-text relative z-10 flex min-w-(--tab-min) flex-col items-center justify-center gap-0.5 rounded-full px-2.5 py-(--tab-pad) font-medium tracking-tight outline-none transition focus-visible:ring-2 active:scale-[0.94] motion-reduce:transition-none motion-reduce:active:scale-100 [&_svg]:size-(--tab-icon)",
				"in-data-[minimized]:min-w-11 in-data-[minimized]:py-2.5",
				className,
			)}
			{...props}
		>
			{icon}
			<span className="in-data-[minimized]:hidden">{label}</span>
		</button>
	);
}

export type TabBarActionProps = Omit<ComponentProps<"button">, "children"> & {
	icon: ReactNode;
	/** Names the button for assistive technology. */
	label: string;
};

/** The round button beside the capsule, for the one action that is not a destination, usually search. */
export function TabBarAction({
	icon,
	label,
	className,
	onClick,
	...props
}: TabBarActionProps) {
	return (
		<button
			type="button"
			data-slot="tab-bar-action"
			aria-label={label}
			onClick={(event) => {
				haptic("light");
				onClick?.(event);
			}}
			className={cx(
				"glass spring-snappy text-label hover:text-accent-text focus-visible:ring-accent/70 shadow-floating flex size-14 shrink-0 items-center justify-center rounded-full outline-none transition focus-visible:ring-2 active:scale-[0.94] motion-reduce:transition-none motion-reduce:active:scale-100 [&_svg]:size-6",
				className,
			)}
			{...props}
		>
			{icon}
		</button>
	);
}
