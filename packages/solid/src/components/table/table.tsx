import { splitProps, type JSX } from "solid-js"
import { cn } from "../../lib/class-names"

const TableElement = (
    props: JSX.IntrinsicElements["table"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <table
            {...rest}
            data-slot="table"
            class={cn(
                "w-full caption-bottom text-subheadline text-label",
                local.class,
                local.className
            )}
        />
    )
}
export function Table(
    props: JSX.IntrinsicElements["table"] & {
        className?: string
    }
) {
    return (
        <div
            data-slot="table-container"
            class="relative w-full overflow-x-auto"
        >
            <TableElement {...props} />
        </div>
    )
}
export const TableHeader = (
    props: JSX.IntrinsicElements["thead"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <thead
            {...rest}
            data-slot="table-header"
            class={cn(
                "[&_tr]:border-separator [&_tr]:border-b",
                local.class,
                local.className
            )}
        />
    )
}
export const TableBody = (
    props: JSX.IntrinsicElements["tbody"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <tbody
            {...rest}
            data-slot="table-body"
            class={cn(
                "[&_tr:last-child]:border-0",
                local.class,
                local.className
            )}
        />
    )
}
export const TableFooter = (
    props: JSX.IntrinsicElements["tfoot"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <tfoot
            {...rest}
            data-slot="table-footer"
            class={cn(
                "border-separator border-t bg-fill/50 font-semibold [&>tr]:last:border-b-0",
                local.class,
                local.className
            )}
        />
    )
}
export const TableRow = (
    props: JSX.IntrinsicElements["tr"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <tr
            {...rest}
            data-slot="table-row"
            class={cn(
                "border-separator border-b transition-colors duration-fast hover:bg-fill/50 has-aria-expanded:bg-fill/50 data-[state=selected]:bg-accent-soft/60",
                local.class,
                local.className
            )}
        />
    )
}
export const TableHead = (
    props: JSX.IntrinsicElements["th"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <th
            {...rest}
            data-slot="table-head"
            class={cn(
                "h-10 px-3 text-start align-middle text-footnote font-semibold whitespace-nowrap text-label-secondary has-[[role=checkbox]]:pe-0",
                local.class,
                local.className
            )}
        />
    )
}
export const TableCell = (
    props: JSX.IntrinsicElements["td"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <td
            {...rest}
            data-slot="table-cell"
            class={cn(
                "px-3 py-2.5 align-middle whitespace-nowrap has-[[role=checkbox]]:pe-0",
                local.class,
                local.className
            )}
        />
    )
}
export const TableCaption = (
    props: JSX.IntrinsicElements["caption"] & {
        className?: string
    }
) => {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    return (
        <caption
            {...rest}
            data-slot="table-caption"
            class={cn(
                "mt-4 text-footnote text-label-secondary",
                local.class,
                local.className
            )}
        />
    )
}
