import { For } from "solid-js"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
    TableFooter,
} from "@passui/solid/table"
import { StatusIndicator } from "@passui/solid/status-indicator"

const invoices = [
    {
        id: "INV-104",
        date: "2 Oct",
        paid: true,
        amount: 120,
    },
    {
        id: "INV-105",
        date: "6 Oct",
        paid: false,
        amount: 48.5,
    },
    {
        id: "INV-106",
        date: "11 Oct",
        paid: true,
        amount: 310,
    },
]
const euros = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
})
export function TableInvoices() {
    const total = invoices.reduce(
        (sum, invoice) => sum + invoice.amount,
        0
    )
    return (
        <div class="w-full max-w-lg rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableCaption>
                    Invoices for October
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <For each={invoices}>
                        {(invoice) => (
                            <TableRow>
                                <TableCell class="font-medium text-label">
                                    {invoice.id}
                                </TableCell>
                                <TableCell class="text-label-secondary">
                                    {invoice.date}
                                </TableCell>
                                <TableCell>
                                    <StatusIndicator
                                        state={
                                            invoice.paid
                                                ? "saved"
                                                : "syncing"
                                        }
                                    >
                                        {invoice.paid
                                            ? "Paid"
                                            : "Pending"}
                                    </StatusIndicator>
                                </TableCell>
                                <TableCell class="text-right tabular-nums">
                                    {euros.format(
                                        invoice.amount
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Total
                        </TableCell>
                        <TableCell class="text-right tabular-nums">
                            {euros.format(total)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
