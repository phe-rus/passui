import type { ComponentProps } from "react"
import { cn } from "../../lib/class-names"
import { textControlClasses } from "../text-field/text-field"

export function TextEditor({ className, ...props }: ComponentProps<"textarea">) {
    return (
        <textarea {...props} className={cn(textControlClasses, "min-h-28 resize-y", className)} />
    )
}
