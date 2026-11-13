import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** A focused empty or unavailable state. Compose it from the parts below. */
export function Empty({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="empty"
			className={cx(
				"flex flex-col items-center gap-3 px-6 py-10 text-center",
				className,
			)}
			{...props}
		/>
	);
}

/** Groups the media, title and description. */
export function EmptyHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-header"
			className={cx("flex max-w-sm flex-col items-center gap-1.5", className)}
			{...props}
		/>
	);
}

/** A decorative glyph above the title. Hidden from assistive technology. */
export function EmptyMedia({ className, ...props }: ComponentProps<"span">) {
	return (
		<span
			data-slot="empty-media"
			aria-hidden="true"
			className={cx(
				"text-label-tertiary mb-1 flex items-center justify-center [&_svg]:size-8",
				className,
			)}
			{...props}
		/>
	);
}

export function EmptyTitle({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="empty-title"
			className={cx("text-headline text-label font-semibold", className)}
			{...props}
		/>
	);
}

export function EmptyDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="empty-description"
			className={cx("text-footnote text-label-secondary", className)}
			{...props}
		/>
	);
}

/** The next actions, such as buttons. */
export function EmptyContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-content"
			className={cx("flex flex-wrap justify-center gap-2", className)}
			{...props}
		/>
	);
}
