/** @jsxImportSource solid-js */
import type {
    RowData,
    SolidTable,
} from "@tanstack/solid-table"
import { Button, Picker } from "@passui/solid"
import type { DataTableFeatures } from "./data-table"
export function DataTablePagination<
    TData extends RowData,
>(props: {
    table: SolidTable<DataTableFeatures, TData>
    pageSizeOptions?: number[]
}) {
    return (
        <div class="flex flex-wrap items-center gap-2">
            <p class="text-footnote text-label-secondary">
                Page{" "}
                {props.table.getPageCount()
                    ? (props.table.atoms.pagination.get()
                          ?.pageIndex ?? 0) + 1
                    : 0}{" "}
                of {props.table.getPageCount()}
            </p>
            <Button
                size="sm"
                variant="ghost"
                disabled={!props.table.getCanPreviousPage()}
                onClick={() => props.table.setPageIndex(0)}
            >
                First
            </Button>
            <Button
                size="sm"
                variant="ghost"
                disabled={!props.table.getCanPreviousPage()}
                onClick={() => props.table.previousPage()}
            >
                Previous
            </Button>
            <Button
                size="sm"
                variant="ghost"
                disabled={!props.table.getCanNextPage()}
                onClick={() => props.table.nextPage()}
            >
                Next
            </Button>
            <Button
                size="sm"
                variant="ghost"
                disabled={!props.table.getCanNextPage()}
                onClick={() =>
                    props.table.setPageIndex(
                        props.table.getPageCount() - 1
                    )
                }
            >
                Last
            </Button>
            <Picker
                label="Rows per page"
                value={String(
                    props.table.atoms.pagination.get()
                        ?.pageSize ?? 10
                )}
                onChange={(value) =>
                    props.table.setPageSize(Number(value))
                }
                options={(
                    props.pageSizeOptions ?? [10, 20, 30, 50]
                ).map((size) => ({
                    value: String(size),
                    label: String(size),
                }))}
            />
        </div>
    )
}
