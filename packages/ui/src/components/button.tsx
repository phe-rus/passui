import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export type ButtonVariant =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link"
	| "accent";

export type ButtonSize =
	| "default"
	| "xs"
	| "sm"
	| "lg"
	| "icon"
	| "icon-xs"
	| "icon-sm"
	| "icon-lg";

const base =
	"relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.005em] outline-none transition spring-snappy [-webkit-tap-highlight-color:transparent] active:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const variants: Record<ButtonVariant, string> = {
	default:
		"bg-inverse text-on-inverse shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18),0_6px_16px_-6px_rgb(0_0_0/0.35)] hover:brightness-[1.12]",
	destructive:
		"bg-danger text-background shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18),0_6px_16px_-6px_rgb(0_0_0/0.35)] hover:brightness-[1.08]",
	outline:
		"text-label shadow-[inset_0_0_0_1px_var(--color-separator)] hover:bg-fill/60",
	secondary:
		"bg-elevated text-label shadow-[inset_0_0_0_0.5px_color-mix(in_srgb,var(--color-separator)_55%,transparent),0_1px_2px_rgb(40_30_0/0.06)] hover:bg-fill/60",
	ghost: "text-label hover:bg-fill/80",
	link: "text-accent-text underline-offset-4 hover:underline",
	accent:
		"bg-accent text-on-accent ring-1 ring-accent-text/25 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(60_40_0/0.16),0_6px_16px_-6px_color-mix(in_srgb,var(--color-accent)_70%,transparent)] hover:brightness-[1.04]",
};

const sizes: Record<ButtonSize, string> = {
	default: "h-11 px-5 text-subheadline",
	xs: "h-8 px-3 text-caption",
	sm: "h-9 px-4 text-subheadline",
	lg: "h-12 px-6 text-body",
	icon: "size-11",
	"icon-xs": "size-8",
	"icon-sm": "size-9",
	"icon-lg": "size-12",
};

export interface ButtonStyleProps {
	/** Visual emphasis. @default "default" */
	variant?: ButtonVariant;
	/** Label sizes `xs`, `sm`, `default`, `lg`, and square icon sizes. @default "default" */
	size?: ButtonSize;
	className?: string;
}

/** Button classes for other elements, such as a link that looks like a button. */
export function buttonVariants({
	variant = "default",
	size = "default",
	className,
}: ButtonStyleProps = {}): string {
	return cx(base, variants[variant], sizes[size], className);
}

export type ButtonProps = ComponentProps<"button"> &
	ButtonStyleProps & {
		/** Disables the button, marks it busy and shows a spinner while work runs. */
		isPending?: boolean;
	};

/**
 * A native button. State is plain CSS (`:hover`, `:active`, `:focus-visible`,
 * `:disabled`); `data-variant` and `data-size` are there for your own styling.
 */
export function Button({
	variant = "default",
	size = "default",
	className,
	type = "button",
	isPending,
	children,
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			data-slot="button"
			data-variant={variant}
			data-size={size}
			type={type}
			className={buttonVariants({ variant, size, className })}
			disabled={disabled || isPending}
			aria-busy={isPending || undefined}
			{...props}
		>
			{isPending ? (
				<svg
					aria-hidden="true"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					className="size-4 animate-spin"
				>
					<path d="M12 3a9 9 0 1 0 9 9" />
				</svg>
			) : null}
			{children}
		</button>
	);
}
