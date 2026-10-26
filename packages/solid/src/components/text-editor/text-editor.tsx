import { splitProps, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"
import { textControlClasses } from "../text-field/text-field"
export interface TextEditorProps
    extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string
}
export function TextEditor(props: TextEditorProps) {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <textarea
            {...rest}
            class={cn(
                textControlClasses,
                "min-h-28 resize-y",
                local.class,
                local.className
            )}
        />
    )
}
