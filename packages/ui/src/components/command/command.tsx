import { type ComponentProps, useEffect, useRef } from "react"
import { SearchIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { KeyboardShortcut } from "../keyboard-shortcut/keyboard-shortcut"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListEmpty,
    SearchListGroup,
    SearchListItem,
} from "../search-list/search-list"
import { Sheet, type SheetProps } from "../sheet/sheet"

export interface CommandProps extends ComponentProps<typeof SearchList> {}
export interface CommandDialogProps extends Omit<SheetProps, "placement"> {}

/** An inline command palette. SearchList owns filtering and keyboard selection. */
export function Command({ className, ...props }: CommandProps) {
    return (
        <SearchList
            {...props}
            className={cn(
                "not-typeset glass-menu flex min-h-0 w-full flex-col overflow-hidden rounded-3xl",
                className
            )}
        />
    )
}

/** A modal command palette with Sheet's focus isolation and restoration. */
export function CommandDialog({ children, className, ...props }: CommandDialogProps) {
    return (
        <Sheet
            {...props}
            placement="center"
            className={cn("max-w-lg rounded-3xl outline-none", className)}
        >
            <SearchList className="not-typeset flex min-h-0 flex-col">{children}</SearchList>
        </Sheet>
    )
}

export function CommandInput({
    className,
    autoFocus,
    ref: forwardedRef,
    ...props
}: ComponentProps<typeof SearchListField>) {
    const input = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (autoFocus) input.current?.focus({ preventScroll: true })
    }, [autoFocus])
    return (
        <div className="flex shrink-0 items-center gap-2 border-b border-separator/50 px-4">
            <SearchIcon size={17} className="shrink-0 text-label-tertiary" />
            <SearchListField
                {...props}
                ref={(node) => {
                    input.current = node
                    if (typeof forwardedRef === "function") forwardedRef(node)
                    else if (forwardedRef) forwardedRef.current = node
                }}
                className={cn(
                    "min-h-12 rounded-none border-0 bg-transparent px-0 focus-visible:ring-0",
                    className
                )}
            />
        </div>
    )
}

export function CommandList({ className, ...props }: ComponentProps<typeof SearchListResults>) {
    return (
        <SearchListResults {...props} className={cn("max-h-[min(60svh,24rem)] p-1.5", className)} />
    )
}

export function CommandEmpty({ className, ...props }: ComponentProps<typeof SearchListEmpty>) {
    return (
        <SearchListEmpty
            {...props}
            className={cn("px-3 py-8 text-center text-footnote text-label-secondary", className)}
        />
    )
}

export function CommandShortcut({ className, ...props }: ComponentProps<typeof KeyboardShortcut>) {
    return (
        <KeyboardShortcut
            {...props}
            className={cn("ms-auto border-0 bg-transparent text-label-tertiary", className)}
        />
    )
}

export function CommandGroup({ className, ...props }: ComponentProps<typeof SearchListGroup>) {
    return (
        <SearchListGroup
            {...props}
            className={cn(
                "border-separator/50 not-first:mt-1 not-first:border-t not-first:pt-1",
                className
            )}
        />
    )
}

export function CommandItem({ className, ...props }: ComponentProps<typeof SearchListItem>) {
    return (
        <SearchListItem
            {...props}
            className={cn(
                "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-label-secondary",
                className
            )}
        />
    )
}
