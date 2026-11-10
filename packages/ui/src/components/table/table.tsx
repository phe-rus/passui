import { createContext, useContext } from "react"
import type * as React from "react"

import { cn } from "../../lib/class-names"

export type TableSize = "sm" | "md" | "lg"

const tableText: Record<TableSize, string> = {
    sm: "text-footnote text-label",
    md: "text-subheadline text-label",
    lg: "text-body text-label",
}
const headCell: Record<TableSize, string> = {
    sm: "h-8 px-2 text-start align-middle text-caption2 font-semibold whitespace-nowrap",
    md: "h-10 px-3 text-start align-middle text-footnote font-semibold whitespace-nowrap",
    lg: "h-12 px-4 text-start align-middle text-subheadline font-semibold whitespace-nowrap",
}
const bodyCell: Record<TableSize, string> = {
    sm: "px-2 py-1.5 align-middle whitespace-nowrap",
    md: "px-3 py-2.5 align-middle whitespace-nowrap",
    lg: "px-4 py-3.5 align-middle whitespace-nowrap",
}
const captionText: Record<TableSize, string> = {
    sm: "mt-3 text-caption2 text-label-secondary",
    md: "mt-4 text-footnote text-label-secondary",
    lg: "mt-5 text-subheadline text-label-secondary",
}

const TableSizeContext = createContext<TableSize>("md")
const useTableSize = () => useContext(TableSizeContext)

function Table({
    className,
    size = "md",
    ...props
}: React.ComponentProps<"table"> & {
    /** Row height, cell padding and text scale. @default "md" */ size?: TableSize
}) {
    return (
        <div data-slot="table-container" className="relative w-full overflow-x-auto">
            <TableSizeContext value={size}>
                <table data-slot="table" className={cn(tableText[size], className)} {...props} />
            </TableSizeContext>
        </div>
    )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
    return (
        <thead
            data-slot="table-header"
            className={cn("[&_tr]:border-separator [&_tr]:border-b", className)}
            {...props}
        />
    )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="table-body"
            className={cn("[&_tr:last-child]:border-0", className)}
            {...props}
        />
    )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                "border-separator border-t bg-fill/50 font-semibold [&>tr]:last:border-b-0",
                className
            )}
            {...props}
        />
    )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                "border-separator border-b transition-colors duration-fast hover:bg-fill/50 has-aria-expanded:bg-fill/50",
                "data-[state=selected]:bg-accent-soft/60",
                className
            )}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
    const size = useTableSize()
    return (
        <th
            data-slot="table-head"
            className={cn(
                headCell[size],
                "text-label-secondary has-[[role=checkbox]]:pe-0",
                className
            )}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
    const size = useTableSize()
    return (
        <td
            data-slot="table-cell"
            className={cn(bodyCell[size], "has-[[role=checkbox]]:pe-0", className)}
            {...props}
        />
    )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
    const size = useTableSize()
    return (
        <caption
            data-slot="table-caption"
            className={cn(captionText[size], className)}
            {...props}
        />
    )
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
