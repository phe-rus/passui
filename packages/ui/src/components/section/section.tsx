import { useId, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "../../lib/class-names"

export type SectionSize = "sm" | "md" | "lg"

const titleSizes: Record<SectionSize, string> = {
    sm: "px-3 text-caption",
    md: "px-4 text-footnote",
    lg: "px-5 text-subheadline",
}

const footerSizes: Record<SectionSize, string> = {
    sm: "px-3",
    md: "px-4",
    lg: "px-5",
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
    /** Optional group heading and accessible name. */
    title?: string
    /** Supporting text below the grouped rows. */
    footer?: ReactNode
    /** Rows, typically LabeledContent. */
    children?: ReactNode
    /** Title and footer text scale + padding. @default "md" */
    size?: SectionSize
}

/**
 * A titled, inset group of rows with an optional footer, as in iOS Settings
 * and SwiftUI's grouped `List` with `Section(header:footer:)`. Rows are
 * usually `LabeledContent`; dividers between them come for free.
 */
export function Section({
    title,
    footer,
    children,
    className,
    size = "md",
    ...props
}: SectionProps) {
    const headingId = useId()
    return (
        <section
            aria-labelledby={title ? headingId : undefined}
            className={cn("flex flex-col gap-2", className)}
            {...props}
        >
            {title && (
                <h2
                    id={headingId}
                    className={cn(titleSizes[size], "font-medium text-label-tertiary")}
                >
                    {title}
                </h2>
            )}
            {/* A group can be only a note, e.g. where to find something on this device. */}
            {children ? (
                <div className="flex flex-col divide-y divide-separator/60 overflow-hidden rounded-3xl border border-separator/60 bg-elevated">
                    {children}
                </div>
            ) : null}
            {footer && (
                <div
                    className={cn(
                        footerSizes[size],
                        "text-caption leading-snug text-label-tertiary"
                    )}
                >
                    {footer}
                </div>
            )}
        </section>
    )
}
