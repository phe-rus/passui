import { cn } from "../../lib/class-names"

/** Shared field treatment for the popup-based Picker, date and time controls. */
export function pickerTriggerStyle(className?: string) {
    return cn(
        "flex w-full min-w-0 items-center gap-2 rounded-lg control-field px-3 py-2 text-start text-subheadline text-label",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
    )
}
