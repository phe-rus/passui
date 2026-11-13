import type { ComponentProps, ReactNode } from "react";
import { cx } from "../lib/cx";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";

export type SidebarSize = "sm" | "md" | "lg";

const rows: Record<SidebarSize, string> = {
	sm: "min-h-7 rounded-lg px-2 py-0.5 text-footnote [@media(pointer:coarse)]:min-h-10",
	md: "min-h-8.5 rounded-xl px-2.5 py-1 text-subheadline [@media(pointer:coarse)]:min-h-11",
	lg: "min-h-10 rounded-2xl px-3 py-2 text-body [@media(pointer:coarse)]:min-h-13",
};
const headings: Record<SidebarSize, string> = {
	sm: "px-2 pb-1 text-footnote",
	md: "px-2.5 pb-1.5 text-footnote",
	lg: "px-3 pb-2 text-subheadline",
};
const counts: Record<SidebarSize, string> = {
	sm: "text-caption2",
	md: "text-footnote",
	lg: "text-subheadline",
};

/** The navigation landmark that holds groups of rows. Name it with `aria-label`. */
export function Sidebar({ className, ...props }: ComponentProps<"nav">) {
	return (
		<nav
			data-slot="sidebar"
			className={cx("flex w-full flex-col gap-5", className)}
			{...props}
		/>
	);
}

/** A titled run of rows. */
export function SidebarGroup({
	className,
	...props
}: ComponentProps<"section">) {
	return (
		<section
			data-slot="sidebar-group"
			className={cx("flex flex-col gap-0.5", className)}
			{...props}
		/>
	);
}

export type SidebarGroupLabelProps = ComponentProps<"h2"> & {
	/** Matches the rows' size. @default "md" */
	size?: SidebarSize;
};

/** The group's heading, bold enough to read as a category. */
export function SidebarGroupLabel({
	size = "md",
	className,
	...props
}: SidebarGroupLabelProps) {
	return (
		<h2
			data-slot="sidebar-group-label"
			className={cx("m-0 font-semibold text-label", headings[size], className)}
			{...props}
		/>
	);
}

export function SidebarMenu({ className, ...props }: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			className={cx("m-0 flex list-none flex-col gap-px p-0", className)}
			{...props}
		/>
	);
}

export function SidebarMenuItem({ className, ...props }: ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			className={cx("min-w-0", className)}
			{...props}
		/>
	);
}

export type SidebarMenuButtonProps = ComponentProps<"a"> & {
	/** The current destination. */
	isActive?: boolean;
	/** Row height, text and corners. @default "md" */
	size?: SidebarSize;
	/** A glyph before the label. */
	icon?: ReactNode;
	/** A count or status at the end. */
	badge?: ReactNode;
	/** Use your router's link, or a button. */
	render?: RenderProp;
};

/**
 * One row. It is an anchor by default; pass `render` for a router link or a
 * button. The current row carries `aria-current="page"` and the accent.
 */
export function SidebarMenuButton({
	isActive,
	size = "md",
	icon,
	badge,
	className,
	children,
	render,
	...props
}: SidebarMenuButtonProps) {
	return renderPart(
		"a",
		mergeProps(
			{
				"data-slot": "sidebar-menu-button",
				"data-active": isActive ? "" : undefined,
				"aria-current": isActive ? "page" : undefined,
				className: cx(
					"group flex w-full items-center gap-2.5 no-underline outline-none transition-colors duration-(--duration-fast) focus-visible:ring-2 focus-visible:ring-accent/70 motion-reduce:transition-none",
					rows[size],
					isActive
						? "bg-fill font-medium text-label"
						: "text-label-secondary hover:bg-fill/70 hover:text-label",
					className,
				),
				children: (
					<>
						{icon ? (
							<span
								aria-hidden="true"
								className={cx(
									"flex shrink-0 transition-colors",
									isActive ? "text-accent-text" : "text-label-secondary",
								)}
							>
								{icon}
							</span>
						) : null}
						<span className="grow truncate">{children}</span>
						{badge != null ? (
							<span
								className={cx(
									"tabular-nums",
									counts[size],
									isActive ? "text-accent-text" : "text-label-tertiary",
								)}
							>
								{badge}
							</span>
						) : null}
					</>
				),
			},
			props,
		),
		render,
	);
}
