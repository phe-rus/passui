import {
    LaptopIcon,
    SmartPhone01Icon,
    Tablet01Icon,
} from "@hugeicons/core-free-icons"
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
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

const devices = [
    {
        id: "mac",
        name: "MacBook Air",
        icon: LaptopIcon,
        seen: "Now",
    },
    {
        id: "phone",
        name: "iPhone 16",
        icon: SmartPhone01Icon,
        seen: "2 hours ago",
    },
    {
        id: "tablet",
        name: "iPad mini",
        icon: Tablet01Icon,
        seen: "3 weeks ago",
    },
]

export function TableSelection() {
    const [selected, setSelected] = useState<string[]>([
        "tablet",
    ])
    const all = selected.length === devices.length

    function toggle(id: string, checked: boolean) {
        setSelected((current) =>
            checked
                ? [...current, id]
                : current.filter((item) => item !== id)
        )
    }

    return (
        <div className="flex w-full max-w-lg flex-col gap-3 rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">
                            <Toggle
                                style="checkbox"
                                label="Select all devices"
                                labelHidden
                                checked={all}
                                mixed={
                                    selected.length > 0 &&
                                    !all
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
                    {devices.map((device) => {
                        const isSelected = selected.includes(
                            device.id
                        )
                        return (
                            <TableRow
                                key={device.id}
                                data-state={
                                    isSelected
                                        ? "selected"
                                        : undefined
                                }
                            >
                                <TableCell>
                                    <Toggle
                                        style="checkbox"
                                        label={`Select ${device.name}`}
                                        labelHidden
                                        checked={isSelected}
                                        onChange={(checked) =>
                                            toggle(
                                                device.id,
                                                checked
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-8 items-center justify-center rounded-full bg-fill text-label-secondary">
                                            <HugeiconsIcon
                                                icon={
                                                    device.icon
                                                }
                                                size={18}
                                            />
                                        </span>
                                        <span className="text-subheadline font-medium text-label">
                                            {device.name}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-label-secondary">
                                    {device.seen}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between px-2">
                <span className="text-footnote text-label-secondary">
                    {selected.length} selected
                </span>
                <Button
                    variant="destructive"
                    size="sm"
                    disabled={selected.length === 0}
                >
                    Sign out
                </Button>
            </div>
        </div>
    )
}
