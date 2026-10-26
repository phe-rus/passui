import { For } from "solid-js"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "@passui/solid/table"

const invoices = [
    {
        id: "INV-024",
        client: "Acme Studio",
        amount: "$820",
        status: "Paid",
    },
    {
        id: "INV-025",
        client: "Northwind",
        amount: "$460",
        status: "Pending",
    },
]
export function TableInvoices() {
    return (
        <Table>
            <TableCaption>Latest invoices</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead scope="col">Invoice</TableHead>
                    <TableHead scope="col">Client</TableHead>
                    <TableHead scope="col">Amount</TableHead>
                    <TableHead scope="col">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <For each={invoices}>
                    {(invoice) => (
                        <TableRow>
                            <TableCell>
                                {invoice.id}
                            </TableCell>
                            <TableCell>
                                {invoice.client}
                            </TableCell>
                            <TableCell>
                                {invoice.amount}
                            </TableCell>
                            <TableCell>
                                {invoice.status}
                            </TableCell>
                        </TableRow>
                    )}
                </For>
            </TableBody>
        </Table>
    )
}
