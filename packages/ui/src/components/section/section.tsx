import { useId, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "../../lib/class-names"

export interface SectionProps extends HTMLAttributes<HTMLElement> {
    /** Optional group heading and accessible name. */
    title?: string
    /** Supporting text below the grouped rows. */
    footer?: ReactNode
    /** Rows, typically LabeledContent. */
    children?: ReactNode
}

/**
 * A titled, inset group of rows with an optional footer, as in iOS Settings
 * and SwiftUI's grouped `List` with `Section(header:footer:)`. Rows are
 * usually `LabeledContent`; dividers between them come for free.
 */
export function Section({ title, footer, children, className, ...props }: SectionProps) {
    const headingId = useId()
    return (
        <section
            aria-labelledby={title ? headingId : undefined}
            className={cn("flex flex-col gap-2", className)}
            {...props}
        >
            {title && (
                <h2 id={headingId} className="px-4 text-footnote font-medium text-label-tertiary">
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
                <div className="px-4 text-caption leading-snug text-label-tertiary">{footer}</div>
            )}
        </section>
    )
}
