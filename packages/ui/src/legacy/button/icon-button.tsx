import { forwardRef } from "react";
import { cn } from "../../lib/class-names";
import { Button, type ButtonProps } from "./button";
import type { ButtonVariant, IconButtonSize } from "./button-styles";

export type { ButtonVariant, IconButtonSize };

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
	/** Icon-only actions must have an accessible name. */
	label: string;
	size?: IconButtonSize;
}

/** An accessible icon-only presentation of Button, sharing its interaction behavior. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(
		{ label, size = "icon", className, children, ...props },
		ref,
	) {
		return (
			<Button
				ref={ref}
				size={size}
				aria-label={label}
				data-tooltip={label}
				className={cn("active:scale-[0.92]", className)}
				{...props}
			>
				{children}
			</Button>
		);
	},
);
