import type { ComponentProps, ReactNode } from "react";
import { cx } from "../lib/cx";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";

/** iOS inset grouped list: rows on one rounded plate with hairlines inset from the leading edge. */
export function List({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="list"
			className={cx(
				"inset-group squircle m-0 list-none p-0 [--squircle-radius:1.25rem]",
				className,
			)}
			{...props}
		/>
	);
}

export interface ListSectionProps
	extends Omit<ComponentProps<"section">, "title"> {
	/** Small caps heading above the plate. */
	title?: ReactNode;
	/** Quiet explanation below the plate. */
	footer?: ReactNode;
}

/** A titled group: heading, the list plate, and a footer note. */
export function ListSection({
	title,
	footer,
	className,
	children,
	...props
}: ListSectionProps) {
	return (
		<section
			data-slot="list-section"
			className={cx("flex flex-col gap-1.5", className)}
			{...props}
		>
			{title ? (
				<h3 className="text-footnote text-label-secondary px-4 font-normal tracking-wide uppercase">
					{title}
				</h3>
			) : null}
			{children}
			{footer ? (
				<p className="text-footnote text-label-secondary px-4">{footer}</p>
			) : null}
		</section>
	);
}

export interface ListItemProps extends Omit<ComponentProps<"li">, "title"> {
	/** An icon or avatar at the start. The hairline insets past it. */
	leading?: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	/** A value, switch or badge at the end. */
	trailing?: ReactNode;
	/** Shows the disclosure chevron, for rows that open something. */
	chevron?: boolean;
	/** Makes the whole row your own element, such as a router link. */
	render?: RenderProp;
}

/** One row. With `render`, `href` or `onClick` the whole row presses like iOS. */
export function ListItem({
	leading,
	title,
	description,
	trailing,
	chevron,
	render,
	className,
	...props
}: ListItemProps) {
	const row = (
		<>
			{leading ? (
				<span className="text-accent-text flex size-8 shrink-0 items-center justify-center [&_svg]:size-5">
					{leading}
				</span>
			) : null}
			<span className="flex min-w-0 flex-1 flex-col">
				<span className="text-body truncate">{title}</span>
				{description ? (
					<span className="text-footnote text-label-secondary truncate">
						{description}
					</span>
				) : null}
			</span>
			{trailing ? (
				<span className="text-body text-label-secondary shrink-0">
					{trailing}
				</span>
			) : null}
			{chevron ? (
				<svg
					viewBox="0 0 16 16"
					aria-hidden="true"
					className="text-label-tertiary size-4 shrink-0"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m6 3 5 5-5 5" />
				</svg>
			) : null}
		</>
	);
	const rowClass =
		"relative flex min-h-11 w-full items-center gap-3 px-4 py-2 text-left text-label outline-none transition-colors duration-(--duration-instant) after:absolute after:right-0 after:bottom-0 after:left-4 after:h-px after:bg-separator";
	const inset = leading ? "after:left-14" : "";
	return (
		<li
			data-slot="list-item"
			className={cx("relative [&:last-child>*]:after:hidden", className)}
			{...props}
		>
			{render ? (
				renderPart(
					"a",
					mergeProps(
						{
							className: cx(rowClass, inset, "hover:bg-fill/70 active:bg-fill"),
							children: row,
						},
						{},
					),
					render,
				)
			) : (
				<div className={cx(rowClass, inset)}>{row}</div>
			)}
		</li>
	);
}
