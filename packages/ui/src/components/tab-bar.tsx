import type { ComponentProps, ReactNode } from "react";
import { cx } from "../lib/cx";

export type TabBarProps = ComponentProps<"nav"> & {
	/** Shrinks to icons only, like iOS 26 while you scroll down. Pair with `useMinimizeOnScroll`. */
	minimized?: boolean;
};

/** The bottom tab bar: a floating glass capsule of destinations. */
export function TabBar({ minimized, className, ...props }: TabBarProps) {
	return (
		<nav
			data-slot="tab-bar"
			data-minimized={minimized || undefined}
			className={cx(
				"glass spring-smooth mx-auto flex w-fit items-stretch gap-0.5 rounded-full p-1.5 shadow-floating transition-[padding,gap] motion-reduce:transition-none data-[minimized]:gap-0 data-[minimized]:p-1",
				className,
			)}
			{...props}
		/>
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
	...props
}: TabBarItemProps) {
	return (
		<button
			type="button"
			data-slot="tab-bar-item"
			aria-current={active ? "page" : undefined}
			aria-label={label}
			className={cx(
				"group spring-snappy text-caption text-label-secondary hover:text-label focus-visible:ring-accent/70 aria-[current=page]:text-accent-text relative isolate flex min-w-18 flex-col items-center justify-center gap-0.5 rounded-full px-4 py-1.5 font-medium outline-none transition focus-visible:ring-2 active:scale-[0.94] motion-reduce:transition-none [&_svg]:size-6",
				"in-data-[minimized]:min-w-11 in-data-[minimized]:py-2.5",
				className,
			)}
			{...props}
		>
			{/* The selected destination sits in its own lens of glass, which swells in as it is chosen. */}
			<span
				aria-hidden="true"
				className="glass-lens spring-smooth absolute inset-0 -z-10 scale-75 rounded-full opacity-0 transition group-aria-[current=page]:scale-100 group-aria-[current=page]:opacity-100 motion-reduce:transition-none"
			/>
			{icon}
			<span className="in-data-[minimized]:hidden">{label}</span>
		</button>
	);
}
