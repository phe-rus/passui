import type { ReactNode } from "react"
import { DisclosureGroup } from "../disclosure-group/disclosure-group"
import { cn } from "../../lib/class-names"

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
    return (
        <div
            className={cn(
                "flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-separator/60 bg-elevated",
                className
            )}
        >
            {items.map((item, index) => (
                <DisclosureGroup
                    key={item.value}
                    label={item.title}
                    description={item.description}
                    open={value === item.value}
                    disabled={item.disabled}
                    triggerClassName="rounded-none"
                    onOpenChange={(open) => onValueChange(open ? item.value : null)}
                    className={cn(index > 0 && "border-t border-separator/60")}
                >
                    {item.content}
                </DisclosureGroup>
            ))}
        </div>
    )
}
