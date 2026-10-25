import type { RowData } from "@tanstack/react-table"
import { Toggle } from "@passui/react/toggle"
import type { DataTableColumnDef } from "./data-table"

export function selectColumn<
    TData extends RowData,
>(): DataTableColumnDef<TData> {
    return {
        id: "select",
        enableColumnFilter: false,
        enableGlobalFilter: false,
        header: ({ table }) => (
            <Toggle
                style="checkbox"
                labelHidden
                checked={table.getIsAllPageRowsSelected()}
                mixed={
                    table.getIsSomePageRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                }
                onChange={(checked) =>
                    table.toggleAllPageRowsSelected(checked)
                }
                label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Toggle
                style="checkbox"
                labelHidden
                checked={row.getIsSelected()}
                onChange={(checked) =>
                    row.toggleSelected(checked)
                }
                label="Select row"
            />
        ),
    }
}
