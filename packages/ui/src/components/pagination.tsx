import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";
import { buttonVariants } from "./button";

export function Pagination({ className, ...props }: ComponentProps<"nav">) {
	return (
		<nav
			aria-label="Pagination"
			data-slot="pagination"
			className={cx("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}

export function PaginationContent({
	className,
	...props
}: ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cx(
				"m-0 flex list-none flex-row items-center gap-1 p-0",
				className,
			)}
			{...props}
		/>
	);
}

export function PaginationItem(props: ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

export type PaginationLinkProps = ComponentProps<"a"> & {
	isActive?: boolean;
	render?: RenderProp;
};

/** A page link. Pass `render` to use your router's link element. */
export function PaginationLink({
	isActive,
	className,
	render,
	...props
}: PaginationLinkProps) {
	return renderPart(
		"a",
		mergeProps(
			{
				"aria-current": isActive ? "page" : undefined,
				"data-slot": "pagination-link",
				"data-active": isActive ? "" : undefined,
				className: buttonVariants({
					variant: isActive ? "secondary" : "ghost",
					size: "icon",
					className,
				}),
			},
			props,
		),
		render,
	);
}

export function PaginationPrevious({
	className,
	children = "Previous",
	...props
}: PaginationLinkProps) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			className={cx("w-auto gap-1 px-4", className)}
			{...props}
		>
			{children}
		</PaginationLink>
	);
}

export function PaginationNext({
	className,
	children = "Next",
	...props
}: PaginationLinkProps) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			className={cx("w-auto gap-1 px-4", className)}
			{...props}
		>
			{children}
		</PaginationLink>
	);
}

export function PaginationEllipsis({
	className,
	...props
}: ComponentProps<"span">) {
	return (
		<span
			aria-hidden="true"
			data-slot="pagination-ellipsis"
			className={cx(
				"flex size-9 items-center justify-center text-label-secondary",
				className,
			)}
			{...props}
		>
			…
		</span>
	);
}
