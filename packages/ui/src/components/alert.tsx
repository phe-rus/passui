import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export type AlertVariant = "default" | "destructive";

export type AlertProps = ComponentProps<"div"> & {
	/** @default "default" */
	variant?: AlertVariant;
};

/** An inline message. Put an icon first and it takes its own column. */
export function Alert({
	variant = "default",
	className,
	...props
}: AlertProps) {
	return (
		<div
			role="alert"
			data-slot="alert"
			data-variant={variant}
			className={cx(
				"relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-2xl bg-fill/60 px-4 py-3 text-subheadline has-[>svg]:grid-cols-[1rem_1fr] has-[>svg]:gap-x-3 [&>svg]:mt-0.5 [&>svg]:size-4",
				variant === "destructive"
					? "bg-danger/10 text-danger [&>svg]:text-current"
					: "text-label [&>svg]:text-label-secondary",
				className,
			)}
			{...props}
		/>
	);
}

export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cx("col-start-2 font-semibold", className)}
			{...props}
		/>
	);
}

export function AlertDescription({
	className,
	...props
}: ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cx("col-start-2 text-footnote opacity-80", className)}
			{...props}
		/>
	);
}
