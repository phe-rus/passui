import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "@passui/solid/table"

export function TableEmpty() {
    return (
        <Table>
            <TableCaption>Invoices</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead scope="col">Invoice</TableHead>
                    <TableHead scope="col">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell
                        colspan={2}
                        class="py-8 text-center text-label-secondary"
                    >
                        No invoices yet. Your invoices will
                        appear here.
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
