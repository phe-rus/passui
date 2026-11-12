import { cn } from "../../lib/class-names";

export type PickerSize = "sm" | "md" | "lg";

const triggerSizes: Record<PickerSize, string> = {
	sm: "px-2.5 py-1.5 text-caption rounded-lg",
	md: "px-3 py-2 text-subheadline rounded-lg",
	lg: "px-4 py-3 text-body rounded-xl",
};

/** Shared field treatment for the popup-based Picker, date and time controls. */
export function pickerTriggerStyle(
	className?: string,
	size: PickerSize = "md",
) {
	return cn(
		"control-field text-label flex w-full min-w-0 items-center gap-2 text-start",
		"disabled:cursor-not-allowed disabled:opacity-40",
		triggerSizes[size],
		className,
	);
}
