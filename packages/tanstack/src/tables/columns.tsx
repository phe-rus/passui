import { Checkbox } from "@passui/react/checkbox";
import type { RowData } from "@tanstack/react-table";
import type { DataTableColumnDef } from "./data-table";

export function selectColumn<
	TData extends RowData,
>(): DataTableColumnDef<TData> {
	return {
		id: "select",
		enableColumnFilter: false,
		enableGlobalFilter: false,
		header: ({ table }) => (
			<Checkbox
				aria-label="Select all"
				checked={
					table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
						? "indeterminate"
						: table.getIsAllPageRowsSelected()
				}
				onCheckedChange={(checked) =>
					table.toggleAllPageRowsSelected(checked === true)
				}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				aria-label="Select row"
				checked={row.getIsSelected()}
				onCheckedChange={(checked) => row.toggleSelected(checked === true)}
			/>
		),
	};
}
