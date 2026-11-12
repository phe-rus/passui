import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/class-names";
import {
	type ButtonSize,
	type ButtonVariant,
	buttonSizes,
	buttonVariants,
} from "./button-styles";
import { PendingSpinner } from "./pending-spinner";
import { usePendingIndicator } from "./use-pending-indicator";

export type { ButtonSize, ButtonVariant };

/**
 * Each variant has a little depth: a fine highlight along the top edge and
 * a soft, layered shadow, like a well-made physical key.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Visual emphasis: `default` (solid), `accent` (main action),
	 * `secondary` (quiet fill), `outline`, `ghost`, `link`, or `destructive`.
	 * @default "default"
	 */
	variant?: ButtonVariant;
	/**
	 * Label sizes: `xs`, `sm`, `default`, `lg`.
	 * Icon sizes: `icon-xs`, `icon-sm`, `icon`, `icon-lg`, `icon-full`.
	 * Prefer IconButton for an icon with a built-in accessible label.
	 * @default "default"
	 */
	size?: ButtonSize;
	/** Shows a delayed spinner, keeps the button's width, and prevents repeat presses.
	 * @default false
	 */
	isPending?: boolean;
	/** Layout classes for the content wrapper, such as a full-width disclosure row. */
	contentClassName?: string;
}

/** Shares native button appearance with semantic links without nesting a button. */
export function buttonStyle({
	variant = "default",
	size = "default",
	className,
}: Pick<ButtonProps, "variant" | "size" | "className"> = {}) {
	return cn(
		"group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden font-semibold tracking-[-0.005em] whitespace-nowrap select-none",
		"transition-[background-color,filter,transform,box-shadow] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
		"disabled:pointer-events-none disabled:opacity-40 motion-reduce:transform-none motion-reduce:transition-none",
		"focus-visible:ring-accent/70 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
		buttonSizes[size],
		buttonVariants[variant],
		className,
	);
}

/** A native button with Passui styling, pending feedback, and an HTMLButtonElement ref. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{
			variant = "default",
			size = "default",
			isPending = false,
			contentClassName,
			disabled,
			children,
			className,
			type = "button",
			...props
		},
		ref,
	) {
		const showPendingIndicator = usePendingIndicator(isPending);

		return (
			<button
				ref={ref}
				type={type}
				className={buttonStyle({
					variant,
					size,
					// pending is busy, not unavailable: keep full colour
					className: cn(
						"data-pending:cursor-progress data-pending:disabled:opacity-100",
						className,
					),
				})}
				{...props}
				data-pending={isPending || undefined}
				disabled={disabled || isPending}
				aria-busy={isPending || props["aria-busy"]}
			>
				{/* the label keeps its space, so the width never jumps */}
				<span
					className={cn(
						"inline-flex min-w-0 items-center justify-center gap-2 truncate transition-opacity duration-200",
						showPendingIndicator && "opacity-0",
						contentClassName,
					)}
				>
					{children}
				</span>
				{showPendingIndicator && <PendingSpinner />}
			</button>
		);
	},
);
