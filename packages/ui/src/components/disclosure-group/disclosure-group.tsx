import { type ReactNode, useId } from "react"
import { ChevronDownIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { InlineDisclosure } from "../inline-disclosure/inline-disclosure"

export interface DisclosureGroupProps {
    label: string
    open: boolean
    onOpenChange: (open: boolean) => void
    children: ReactNode
    disabled?: boolean
    className?: string
    /** Supporting text beneath the title. */
    description?: string
}

/** A controlled, accessible disclosure row with the shared inline reveal. */
export function DisclosureGroup({
    label,
    open,
    onOpenChange,
    children,
    disabled = false,
    className,
    description,
}: DisclosureGroupProps) {
    const id = useId()

    return (
        <div className={cn("min-w-0", className)}>
            <h3 className="m-0">
                <button
                    type="button"
                    id={`${id}-trigger`}
                    aria-expanded={open}
                    aria-controls={id}
                    disabled={disabled}
                    onClick={() => onOpenChange(!open)}
                    className={cn(
                        "flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-start",
                        "text-subheadline text-label hover:bg-fill/60 focus-visible:outline-2 focus-visible:outline-offset-2",
                        "focus-visible:outline-accent-text disabled:cursor-not-allowed disabled:opacity-40"
                    )}
                >
                    <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="font-semibold">{label}</span>
                        {description && (
                            <span className="text-footnote font-normal text-label-secondary">
                                {description}
                            </span>
                        )}
                    </span>
                    <ChevronDownIcon
                        size={17}
                        aria-hidden="true"
                        className={cn(
                            "shrink-0 text-label-tertiary transition-transform duration-normal motion-reduce:transition-none",
                            open && "rotate-180"
                        )}
                    />
                </button>
            </h3>
            <section id={id} aria-labelledby={`${id}-trigger`}>
                <InlineDisclosure open={open}>
                    <div className="px-3 pb-3">{children}</div>
                </InlineDisclosure>
            </section>
        </div>
    )
}
