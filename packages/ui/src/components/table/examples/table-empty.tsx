import { InboxIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@passui/react/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@passui/react/table"

export function TableEmpty() {
    return (
        <div className="w-full max-w-md rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Application</TableHead>
                        <TableHead>Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={2}>
                            <div className="flex flex-col items-center gap-2 py-8 text-center">
                                <HugeiconsIcon
                                    icon={InboxIcon}
                                    size={28}
                                    className="text-label-tertiary"
                                />
                                <span className="text-subheadline font-medium text-label">
                                    No applications yet
                                </span>
                                <span className="text-footnote text-label-secondary">
                                    Apps you create appear
                                    here.
                                </span>
                                <Button
                                    variant="accent"
                                    size="sm"
                                    className="mt-2"
                                >
                                    New application
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
