import { StatusIndicator } from "@passui/react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@passui/react/table"

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
        <div className="w-full max-w-lg rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableCaption>
                    Invoices for October
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-medium text-label">
                                {invoice.id}
                            </TableCell>
                            <TableCell className="text-label-secondary">
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
                            <TableCell className="text-right tabular-nums">
                                {euros.format(invoice.amount)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Total
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                            {euros.format(total)}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
