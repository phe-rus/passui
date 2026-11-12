import { ChevronLeftIcon } from "@passui/icons/chevron-left";
import { ChevronRightIcon } from "@passui/icons/chevron-right";
import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import { mergeProps, type RenderProp, renderPart } from "../lib/render";
import { buttonVariants } from "./button";

/**
 * The page numbers to show, with `"ellipsis"` where a run is folded:
 * the first and last page, the current one and `siblings` on each side.
 * `pageRange(8, 20)` is `[1, "ellipsis", 7, 8, 9, "ellipsis", 20]`.
 */
export function pageRange(
	current: number,
	total: number,
	siblings = 1,
): Array<number | "ellipsis"> {
	const slots = siblings * 2 + 5;
	if (total <= slots)
		return Array.from({ length: total }, (_, index) => index + 1);
	const left = Math.max(current - siblings, 2);
	const right = Math.min(current + siblings, total - 1);
	const range: Array<number | "ellipsis"> = [1];
	if (left > 2) range.push("ellipsis");
	for (let page = left; page <= right; page++) range.push(page);
	if (right < total - 1) range.push("ellipsis");
	range.push(total);
	return range;
}

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
			className={cx("w-auto gap-1 ps-2.5 pe-3", className)}
			{...props}
		>
			<ChevronLeftIcon size={14} />
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
			className={cx("w-auto gap-1 ps-3 pe-2.5", className)}
			{...props}
		>
			{children}
			<ChevronRightIcon size={14} />
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
				"flex size-8.5 items-center justify-center text-label-secondary",
				className,
			)}
			{...props}
		>
			…
		</span>
	);
}
