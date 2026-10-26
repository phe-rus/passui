import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "@passui/solid/table"
export function TableUsage() {
    return (
        <Table>
            <TableCaption>Recent invoices</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead scope="col">Invoice</TableHead>
                    <TableHead scope="col">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>INV-001</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV-002</TableCell>
                    <TableCell>$150.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
