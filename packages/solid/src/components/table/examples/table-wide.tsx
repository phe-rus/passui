import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "@passui/solid/table"

export function TableWide() {
    return (
        <div class="w-full overflow-x-auto">
            <Table>
                <TableCaption>
                    Quarterly overview
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead scope="col">
                            Project
                        </TableHead>
                        <TableHead scope="col">
                            Owner
                        </TableHead>
                        <TableHead scope="col">
                            Status
                        </TableHead>
                        <TableHead scope="col">
                            Budget
                        </TableHead>
                        <TableHead scope="col">
                            Updated
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Mobile app</TableCell>
                        <TableCell>Aiko</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>$12,000</TableCell>
                        <TableCell>Today</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
