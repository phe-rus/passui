import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@passui/react/table"
import type { AnatomyPart } from "../types"

type AnatomyTableProps = {
    parts: AnatomyPart[]
}

/** The parts a component is made of, and what each one does. */
export function AnatomyTable({ parts }: AnatomyTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl ring-1 ring-separator/60">
            <Table className="w-full border-collapse text-left">
                <TableHeader className="bg-fill/50 *:text-sm!">
                    <TableRow>
                        <TableHead className="w-36 px-3 py-2">Element</TableHead>
                        <TableHead className="px-3 py-2">Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="*:text-xs!">
                    {parts.map((part) => (
                        <TableRow
                            key={part.element}
                            className="border-separator/60 border-t align-top"
                        >
                            <TableCell className="whitespace-normal px-3 py-2 font-semibold">
                                {part.element}
                            </TableCell>
                            <TableCell className="whitespace-normal px-3 py-2">
                                {part.required && <strong>Required. </strong>}
                                {part.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
