import { createSignal, For } from "solid-js"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@passui/solid/table"
import { Toggle } from "@passui/solid/toggle"
import { Button } from "@passui/solid/button"

const devices = [
    {
        id: "mac",
        name: "MacBook Air",
        symbol: "⌘",
        seen: "Now",
    },
    {
        id: "phone",
        name: "iPhone 16",
        symbol: "▯",
        seen: "2 hours ago",
    },
    {
        id: "tablet",
        name: "iPad mini",
        symbol: "▣",
        seen: "3 weeks ago",
    },
]
export function TableSelection() {
    const [selected, setSelected] = createSignal<string[]>([
        "tablet",
    ])
    const toggle = (id: string, checked: boolean) =>
        setSelected((items) =>
            checked
                ? [...items, id]
                : items.filter((item) => item !== id)
        )
    return (
        <div class="flex w-full max-w-lg flex-col gap-3 rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-10">
                            <Toggle
                                style="checkbox"
                                label="Select all devices"
                                labelHidden
                                checked={
                                    selected().length ===
                                    devices.length
                                }
                                mixed={
                                    selected().length > 0 &&
                                    selected().length <
                                        devices.length
                                }
                                onChange={(checked) =>
                                    setSelected(
                                        checked
                                            ? devices.map(
                                                  (device) =>
                                                      device.id
                                              )
                                            : []
                                    )
                                }
                            />
                        </TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Last seen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <For each={devices}>
                        {(device) => (
                            <TableRow
                                data-state={
                                    selected().includes(
                                        device.id
                                    )
                                        ? "selected"
                                        : undefined
                                }
                            >
                                <TableCell>
                                    <Toggle
                                        style="checkbox"
                                        label={`Select ${device.name}`}
                                        labelHidden
                                        checked={selected().includes(
                                            device.id
                                        )}
                                        onChange={(checked) =>
                                            toggle(
                                                device.id,
                                                checked
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center gap-3">
                                        <span
                                            class="flex size-8 items-center justify-center rounded-full bg-fill text-label-secondary"
                                            aria-hidden="true"
                                        >
                                            {device.symbol}
                                        </span>
                                        <span class="text-subheadline font-medium text-label">
                                            {device.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell class="text-label-secondary">
                                    {device.seen}
                                </TableCell>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
            </Table>
            <div class="flex items-center justify-between px-2">
                <span class="text-footnote text-label-secondary">
                    {selected().length} selected
                </span>
                <Button
                    variant="destructive"
                    size="sm"
                    disabled={selected().length === 0}
                >
                    Sign out
                </Button>
            </div>
        </div>
    )
}
