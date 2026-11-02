import { useId, type ReactNode } from "react"
import { Button } from "../button/button"
import { ChevronDownIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { InlineDisclosure } from "../inline-disclosure/inline-disclosure"

export interface AccordionItem {
    /** Stable value used to identify the expanded item. */
    value: string
    title: string
    content: ReactNode
    description?: string
    disabled?: boolean
}

export interface AccordionProps {
    items: readonly AccordionItem[]
    /** The expanded item, or `null` when all items are closed. */
    value: string | null
    /** Selecting the open item reports `null`, so every item can collapse. */
    onValueChange: (value: string | null) => void
    className?: string
}

/** A single-open, collapsible accordion with labelled animated content regions. */
export function Accordion({ items, value, onValueChange, className }: AccordionProps) {
    const id = useId()

    return (
        <div className={cn("flex min-w-0 flex-col", className)}>
            {items.map((item, index) => {
                const open = value === item.value
                const triggerId = `${id}-trigger-${index}`
                const panelId = `${id}-panel-${index}`
                return (
                    <section
                        key={item.value}
                        className={cn("min-w-0", index > 0 && "border-t border-separator/60")}
                    >
                        <Button
                            id={triggerId}
                            type="button"
                            variant="ghost"
                            aria-expanded={open}
                            aria-controls={panelId}
                            disabled={item.disabled}
                            onClick={() => onValueChange(open ? null : item.value)}
                            className="min-h-11 w-full justify-between rounded-none px-3 py-2 text-start text-subheadline font-medium text-label hover:bg-fill/60"
                        >
                            <span className="flex min-w-0 flex-col items-start gap-0.5 whitespace-normal">
                                <span>{item.title}</span>
                                {item.description && (
                                    <span className="text-footnote font-normal text-label-secondary">
                                        {item.description}
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
                        <section
                            id={panelId}
                            aria-labelledby={triggerId}
                            aria-hidden={!open}
                            inert={!open}
                        >
                            <InlineDisclosure open={open}>
                                <div className="px-3 pb-3">{item.content}</div>
                            </InlineDisclosure>
                        </section>
                    </section>
                )
            })}
        </div>
    )
}
