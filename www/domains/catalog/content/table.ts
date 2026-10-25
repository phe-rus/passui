import type { tableDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const tableContent: ComponentContent<
    typeof tableDocs
> = {
    summary:
        "Styled parts for a plain HTML table: header, rows, cells, a footer and a caption, scrolling sideways when it's wider than the screen.",
    usage: "Use it for small sets of rows you write out yourself. For sorting, filtering and pages of server data, use DataTable from @passui/tanstack, which is built on these parts.",
    propDescriptions: {
        caption:
            "The children of TableCaption: a short line under the table that names it.",
        footer: "Adds a TableFooter for totals, on a shaded row.",
    },
    examples: {
        invoices: {
            title: "Totals and status",
            description:
                "A caption, a status for each row, right-aligned amounts and a footer with the total.",
        },
        wide: {
            title: "Wide tables",
            description:
                "When there are more columns than fit, the table scrolls sideways inside its card instead of stretching the page.",
        },
        empty: {
            title: "Empty state",
            description:
                "One row spanning every column says there's nothing yet and offers the next step.",
        },
        selection: {
            title: "Selectable rows",
            description:
                "Checkbox toggles in the first column. A selected row sets data-state to selected and is shaded.",
        },
    },
    anatomy: [
        {
            element: "Table",
            description:
                "The table, inside a container that scrolls sideways.",
            required: true,
        },
        {
            element: "TableHeader and TableHead",
            description: "The column headings.",
            required: true,
        },
        {
            element: "TableBody, TableRow and TableCell",
            description:
                "The rows. Each row is shaded on hover.",
            required: true,
        },
        {
            element: "TableFooter",
            description: "Optional rows for totals.",
        },
        {
            element: "TableCaption",
            description:
                "Optional name for the table, shown under it.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Right-align numbers and use tabular-nums, so digits line up.",
        },
        {
            kind: "do",
            text: "Give every column a heading. Hide it with sr-only if the column holds only actions.",
        },
        {
            kind: "dont",
            text: "Use a table to lay out a page. Use it only for rows and columns of data.",
        },
    ],
    accessibility: [
        "Real table, th and td elements, so screen readers announce rows, columns and headings.",
        "A caption names the table for people who navigate by tables.",
    ],
}
