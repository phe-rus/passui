import { jsxText } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { TableEmpty } from "./examples/table-empty"
import { TableInvoices } from "./examples/table-invoices"
import { TableSelection } from "./examples/table-selection"
import { TableWide } from "./examples/table-wide"
import { TableShowcase } from "./examples/table-showcase"
import { TableUsage } from "./examples/table-usage"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./table"

// The caption and footer are parts inside Table, so the snippet writes
// them into the children.
type DemoProps = {
    caption: string
    footer: boolean
}

const invoices = [
    { id: "INV-104", status: "Paid", amount: "€120.00" },
    { id: "INV-105", status: "Pending", amount: "€48.50" },
    { id: "INV-106", status: "Paid", amount: "€310.00" },
]

export const tableDocs = defineDocs<DemoProps>()({
    slug: "table",
    name: "Table",
    importPath: "@passui/react/table",
    controls: {
        caption: { kind: "text", default: "Recent invoices" },
        footer: { kind: "boolean", default: true },
    },
    render: ({ caption, footer }) => (
        <div className="w-full max-w-md rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                {caption && (
                    <TableCaption>{caption}</TableCaption>
                )}
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>
                                {invoice.id}
                            </TableCell>
                            <TableCell>
                                {invoice.status}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">
                                {invoice.amount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {footer && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>
                                Total
                            </TableCell>
                            <TableCell className="text-right tabular-nums">
                                €478.50
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </div>
    ),
    childrenSnippet: ({ caption, footer }) => ({
        imports: [
            `import { TableBody, ${caption ? "TableCaption, " : ""}TableCell, ${footer ? "TableFooter, " : ""}TableHead, TableHeader, TableRow } from "@passui/react/table"`,
        ],
        omit: ["caption", "footer"],
        children: [
            "",
            ...(caption
                ? [
                      `    <TableCaption>${jsxText(caption)}</TableCaption>`,
                  ]
                : []),
            "    <TableHeader>",
            "        <TableRow>",
            "            <TableHead>Invoice</TableHead>",
            '            <TableHead className="text-right">Amount</TableHead>',
            "        </TableRow>",
            "    </TableHeader>",
            "    <TableBody>",
            "        <TableRow>",
            "            <TableCell>INV-104</TableCell>",
            '            <TableCell className="text-right">€120.00</TableCell>',
            "        </TableRow>",
            "    </TableBody>",
            ...(footer
                ? [
                      "    <TableFooter>",
                      "        <TableRow>",
                      "            <TableCell>Total</TableCell>",
                      '            <TableCell className="text-right">€120.00</TableCell>',
                      "        </TableRow>",
                      "    </TableFooter>",
                  ]
                : []),
            "",
        ].join("\n"),
    }),
    usage: TableUsage,
    showcase: TableShowcase,
    examples: [
        { id: "invoices", component: TableInvoices },
        { id: "selection", component: TableSelection },
        { id: "wide", component: TableWide },
        { id: "empty", component: TableEmpty },
    ],
})
