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
				"glass spring-smooth mx-auto flex w-fit items-center gap-1 rounded-full p-1 transition-[padding,gap] motion-reduce:transition-none data-[minimized]:gap-0",
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
				"spring-snappy text-footnote text-label-secondary hover:text-label focus-visible:ring-accent/70 aria-[current=page]:bg-fill aria-[current=page]:text-accent-text relative flex min-w-16 flex-col items-center gap-0.5 rounded-full px-3 py-1.5 font-medium outline-none transition focus-visible:ring-2 active:scale-[0.96] motion-reduce:transition-none [&_svg]:size-5",
				"in-data-[minimized]:min-w-10 in-data-[minimized]:py-2.5",
				className,
			)}
			{...props}
		>
			{icon}
			<span className="text-caption in-data-[minimized]:hidden">{label}</span>
		</button>
	);
}
