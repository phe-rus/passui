import { type ComponentProps, type ReactNode, useId, useState } from "react"
import { Button } from "../button/button"
import { cn } from "../../lib/class-names"

export const textControlClasses = cn(
    "w-full min-w-0 rounded-xl border border-separator bg-elevated",
    "px-3 py-2 text-body text-label placeholder:text-label-tertiary",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
    "disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-danger"
)

const fieldIconClasses = "flex shrink-0 items-center text-label-secondary"

export type TextFieldProps = ComponentProps<"input"> & {
    label: string
    description?: ReactNode
    errors?: string[]
    /** A decorative icon before the text, such as a mail glyph. */
    icon?: ReactNode
    /** A decorative icon after the text, such as a unit or a check. */
    trailingIcon?: ReactNode
    /** An interactive control after the text, such as a clear button. Size it to the field: an `xs` or `icon-xs` button, never the default. */
    action?: ReactNode
    revealLabels?: { show: string; hide: string }
}

export function TextField({
    label,
    description,
    errors = [],
    icon,
    trailingIcon,
    action,
    revealLabels,
    type = "text",
    id: suppliedId,
    className,
    ...props
}: TextFieldProps) {
    const generatedId = useId()
    const id = suppliedId ?? generatedId
    const [revealed, setRevealed] = useState(false)
    const messages = Array.from(new Set(errors))
    const reveal = type === "password" && revealLabels
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-subheadline font-semibold">
                {label}
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-separator bg-elevated px-3 focus-within:ring-1 focus-within:ring-accent/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-text/70">
                {icon && (
                    <span aria-hidden className={fieldIconClasses}>
                        {icon}
                    </span>
                )}
                <input
                    {...props}
                    id={id}
                    type={reveal && revealed ? "text" : type}
                    aria-invalid={messages.length > 0}
                    aria-describedby={
                        messages.length || description ? `${id}-description` : undefined
                    }
                    className={cn(
                        "h-11 w-full min-w-0 bg-transparent text-body text-label outline-none",
                        "placeholder:text-label-tertiary disabled:opacity-40",
                        className
                    )}
                />
                {trailingIcon && (
                    <span aria-hidden className={fieldIconClasses}>
                        {trailingIcon}
                    </span>
                )}
                {reveal && (
                    <Button
                        variant="ghost"
                        size="xs"
                        // sized to sit inside the 44px field; on touch a
                        // wider invisible area keeps a 44px target
                        className="-mr-1.5 shrink-0 whitespace-nowrap [@media(pointer:coarse)]:before:absolute [@media(pointer:coarse)]:before:-inset-1.5 [@media(pointer:coarse)]:before:content-['']"
                        aria-controls={id}
                        aria-label={revealed ? revealLabels.hide : revealLabels.show}
                        aria-pressed={revealed}
                        onClick={() => setRevealed(!revealed)}
                    >
                        {revealed ? revealLabels.hide : revealLabels.show}
                    </Button>
                )}
                {action}
            </div>
            {(messages.length > 0 || description) && (
                <div
                    id={`${id}-description`}
                    role={messages.length ? "alert" : undefined}
                    className={cn(
                        "text-footnote",
                        messages.length ? "text-danger" : "text-label-secondary"
                    )}
                >
                    {messages.length ? messages.join(". ") : description}
                </div>
            )}
        </div>
    )
}
