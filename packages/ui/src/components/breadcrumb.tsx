import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";

export function Breadcrumb(props: ComponentProps<"nav">) {
	return <nav aria-label="Breadcrumb" data-slot="breadcrumb" {...props} />;
}

export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cx(
				"m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-footnote text-label-secondary",
				className,
			)}
			{...props}
		/>
	);
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cx("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	);
}

/** A link. Pass `render` to use your router's link element. */
export function BreadcrumbLink({
	className,
	render,
	...props
}: ComponentProps<"a"> & { render?: RenderProp }) {
	return renderPart(
		"a",
		mergeProps(
			{
				"data-slot": "breadcrumb-link",
				className: "transition-colors hover:text-label",
			},
			{ className, ...props },
		),
		render,
	);
}

export function BreadcrumbPage({
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span
			aria-current="page"
			data-slot="breadcrumb-page"
			className={cx("font-medium text-label", className)}
			{...props}
		/>
	);
}

export function BreadcrumbSeparator({
	children = "/",
	className,
	...props
}: ComponentProps<"li">) {
	return (
		<li
			role="presentation"
			aria-hidden="true"
			data-slot="breadcrumb-separator"
			className={cx("text-label-tertiary", className)}
			{...props}
		>
			{children}
		</li>
	);
}

/** Stands in for the crumbs that were folded away. Wrap it in a menu trigger to reveal them. */
export function BreadcrumbEllipsis({
	children = "…",
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			className={cx("text-label-secondary flex h-6 items-center", className)}
			{...props}
		>
			{children}
		</span>
	);
}
