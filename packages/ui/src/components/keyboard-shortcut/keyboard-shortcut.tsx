import type { ComponentProps } from "react";
import { cn } from "../../lib/class-names";

export type KeyboardShortcutSize = "sm" | "md";

const sizes: Record<KeyboardShortcutSize, string> = {
	sm: "px-1 py-0 text-caption2",
	md: "px-1.5 py-0.5 text-caption2",
};

export interface KeyboardShortcutProps extends ComponentProps<"kbd"> {
	/** Keycap padding density. Text stays at caption2 in both sizes. @default "md" */
	size?: KeyboardShortcutSize;
}

/** A quiet keycap for a shortcut supplied and localized by the application. */
export function KeyboardShortcut({
	size = "md",
	className,
	...props
}: KeyboardShortcutProps) {
	return (
		<kbd
			{...props}
			className={cn(
				"border-separator/70 bg-fill/50 text-label-secondary inline-flex shrink-0 items-center rounded-md border font-mono leading-none",
				sizes[size],
				className,
			)}
		/>
	);
}
