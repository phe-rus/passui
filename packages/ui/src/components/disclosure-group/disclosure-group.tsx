import { Button } from "../button/button"
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
    /** Trigger layout when composed inside a shared surface such as Accordion. */
    triggerClassName?: string
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
    triggerClassName,
    description,
}: DisclosureGroupProps) {
    const id = useId()

    return (
        <div className={cn("w-full min-w-0", className)}>
            <h3 className="m-0">
                <Button
                    variant="ghost"
                    contentClassName="w-full min-w-0 justify-between gap-3"
                    type="button"
                    id={`${id}-trigger`}
                    aria-expanded={open}
                    aria-controls={id}
                    disabled={disabled}
                    onClick={() => onOpenChange(!open)}
                    className={cn(
                        "h-auto min-h-11 w-full rounded-xl px-4 py-3 text-start active:scale-100",
                        "text-subheadline font-normal text-label hover:bg-fill/60 focus-visible:ring-inset focus-visible:ring-offset-0",
                        "focus-visible:outline-accent-text disabled:cursor-not-allowed disabled:opacity-40",
                        triggerClassName
                    )}
                >
                    <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="font-medium break-words whitespace-normal">{label}</span>
                        {description && (
                            <span className="text-footnote leading-footnote font-normal break-words whitespace-normal text-label-secondary">
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
                </Button>
            </h3>
            <section id={id} aria-labelledby={`${id}-trigger`} aria-hidden={!open} inert={!open}>
                <InlineDisclosure open={open}>
                    <div className="min-w-0 px-4 pb-4 text-subheadline leading-subheadline text-label-secondary [overflow-wrap:anywhere]">
                        {children}
                    </div>
                </InlineDisclosure>
            </section>
        </div>
    )
}
