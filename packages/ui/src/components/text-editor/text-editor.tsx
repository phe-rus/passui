import type { ComponentProps } from "react";
import { cn } from "../../lib/class-names";
import { fieldSize, type TextFieldSize } from "../text-field/text-field";

const minHeights: Record<TextFieldSize, string> = {
	xs: "min-h-24",
	sm: "min-h-24",
	md: "min-h-28",
	lg: "min-h-32",
};

export type TextEditorSize = TextFieldSize;

export interface TextEditorProps
	extends Omit<ComponentProps<"textarea">, "size"> {
	/** Field surface scale; matches TextField's xs | sm | md | lg. @default "md" */
	size?: TextEditorSize;
}

/** A multi-line text field that reuses TextField's shared surface treatment. */
export function TextEditor({
	className,
	size = "md",
	...props
}: TextEditorProps) {
	const surface = fieldSize(size);
	return (
		<textarea
			{...props}
			className={cn(
				"border-separator bg-elevated text-label placeholder:text-label-tertiary w-full min-w-0 resize-y border",
				"focus-visible:outline-accent-text focus-visible:outline-2 focus-visible:outline-offset-2",
				"aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-40",
				surface.radius,
				surface.padding,
				surface.text,
				minHeights[size],
				className,
			)}
		/>
	);
}
