import type { ReactNode } from "react"
import { cn } from "../../lib/class-names"

export interface LabeledContentProps {
    /** The visible name of the row. */
    label: string
    /** Supporting text below the label. */
    description?: string
    /** The row's control or value. */
    children: ReactNode
    /** Places the control below the label at every width. @default false */
    stacked?: boolean
    /** Places a wide control below its label on phones. @default false */
    wide?: boolean
}

/**
 * A row: a label, an optional description, and its control at the trailing
 * end, as SwiftUI's `LabeledContent`. Wide controls move under the label
 * when there is no room beside it, rather than squeezing.
 */
export function LabeledContent({
    label,
    description,
    children,
    stacked,
    wide,
}: LabeledContentProps) {
    return (
        <div
            className={cn(
                "flex flex-wrap gap-x-4 gap-y-2.5 px-4 py-3",
                stacked
                    ? "flex-col items-stretch"
                    : cn(
                          "items-center justify-between",
                          wide &&
                              "max-sm:flex-col max-sm:items-stretch max-sm:gap-2.5"
                      )
            )}
        >
            <div
                className={cn(
                    "flex min-w-0 flex-1 flex-col break-normal",
                    !stacked && "basis-36",
                    wide && "max-sm:basis-auto"
                )}
            >
                <span className="text-subheadline text-label">
                    {label}
                </span>
                {description && (
                    <span className="text-footnote leading-snug text-label-secondary">
                        {description}
                    </span>
                )}
            </div>
            {/* Controls give way before the label does; a segmented control that
          no longer fits turns into a pop-up button by itself. */}
            <div
                className={cn(
                    "ms-auto flex max-w-full min-w-0 shrink-0 justify-end [&>*]:max-w-full",
                    stacked && "w-full",
                    wide && "max-sm:w-full"
                )}
            >
                {children}
            </div>
        </div>
    )
}
