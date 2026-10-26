import { createSignal, For } from "solid-js"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "@passui/solid/table"

const members = [
    { id: "aiko", name: "Aiko Kamado" },
    { id: "nora", name: "Nora Ellis" },
    { id: "jade", name: "Jade Chen" },
]
export function TableSelection() {
    const [selected, setSelected] = createSignal<string[]>([])
    const toggle = (id: string) =>
        setSelected((items) =>
            items.includes(id)
                ? items.filter((item) => item !== id)
                : [...items, id]
        )
    return (
        <div class="grid w-full gap-2">
            <Table>
                <TableCaption>Team members</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead scope="col">
                            Select
                        </TableHead>
                        <TableHead scope="col">
                            Name
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <For each={members}>
                        {(member) => (
                            <TableRow>
                                <TableCell>
                                    <input
                                        aria-label={`Select ${member.name}`}
                                        type="checkbox"
                                        checked={selected().includes(
                                            member.id
                                        )}
                                        onChange={() =>
                                            toggle(member.id)
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    {member.name}
                                </TableCell>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
            </Table>
            <output class="text-footnote text-label-secondary">
                {selected().length} selected
            </output>
        </div>
    )
}
