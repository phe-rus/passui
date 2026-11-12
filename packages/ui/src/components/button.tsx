import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export type ButtonVariant =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

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
	"inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.005em] outline-none transition duration-(--duration-fast) ease-standard active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const variants: Record<ButtonVariant, string> = {
	default:
		"bg-inverse text-on-inverse shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18)] hover:brightness-110",
	destructive:
		"bg-danger text-background shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(0_0_0/0.18)] hover:brightness-110",
	outline: "border border-separator text-label hover:bg-fill/60",
	secondary:
		"bg-elevated text-label shadow-[inset_0_0_0_0.5px_var(--color-separator)] hover:bg-fill/60",
	ghost: "text-label hover:bg-fill/80",
	link: "text-accent-text underline-offset-4 hover:underline",
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

export type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

/**
 * A native button. State is plain CSS (`:hover`, `:active`, `:focus-visible`,
 * `:disabled`); `data-variant` and `data-size` are there for your own styling.
 */
export function Button({
	variant = "default",
	size = "default",
	className,
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			data-slot="button"
			data-variant={variant}
			data-size={size}
			type={type}
			className={buttonVariants({ variant, size, className })}
			{...props}
		/>
	);
}
