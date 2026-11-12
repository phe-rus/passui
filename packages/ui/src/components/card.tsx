import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

/** A grouped surface. Compose with the header, content and footer parts. */
export function Card({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cx(
				"card-surface squircle flex flex-col gap-4 py-5 text-label [--squircle-radius:1.5rem]",
				className,
			)}
			{...props}
		/>
	);
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cx(
				"grid auto-rows-min items-start gap-1 px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
				className,
			)}
			{...props}
		/>
	);
}

export function CardTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cx("text-headline font-semibold leading-tight", className)}
			{...props}
		/>
	);
}

export function CardDescription({
	className,
	...props
}: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cx("text-footnote text-label-secondary", className)}
			{...props}
		/>
	);
}

export function CardAction({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cx("col-start-2 row-span-2 row-start-1 self-start", className)}
			{...props}
		/>
	);
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cx("px-5", className)}
			{...props}
		/>
	);
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cx("flex items-center px-5", className)}
			{...props}
		/>
	);
}
