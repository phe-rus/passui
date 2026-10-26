import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@passui/solid/table"
import { Button } from "@passui/solid/button"
import { InboxIcon } from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function TableEmpty() {
    return (
        <div class="w-full max-w-md rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Application</TableHead>
                        <TableHead>Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow class="hover:bg-transparent">
                        <TableCell colspan={2}>
                            <div class="flex flex-col items-center gap-2 py-8 text-center">
                                <Hugeicon
                                    icon={InboxIcon}
                                    size={28}
                                    class="text-label-tertiary"
                                />
                                <span class="text-subheadline font-medium text-label">
                                    No applications yet
                                </span>
                                <span class="text-footnote text-label-secondary">
                                    Apps you create appear
                                    here.
                                </span>
                                <Button
                                    variant="accent"
                                    size="sm"
                                    class="mt-2"
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
