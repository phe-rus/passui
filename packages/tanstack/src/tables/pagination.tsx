import { IconButton } from "@passui/react/icon-button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@hugeicons/core-free-icons"
import type {
    ReactTable,
    RowData,
} from "@tanstack/react-table"
import { Picker } from "@passui/react"
import type { DataTableFeatures } from "./data-table"

type DataTablePaginationProps<TData extends RowData> = {
    table: ReactTable<DataTableFeatures, TData>
    pageSizeOptions?: number[]
}

export function DataTablePagination<TData extends RowData>({
    table,
    pageSizeOptions = [10, 20, 30, 50],
}: DataTablePaginationProps<TData>) {
    const { pageIndex, pageSize } = table.state.pagination
    const pageCount = table.getPageCount()

    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="shrink-0 whitespace-nowrap text-footnote text-label-secondary">
                Page {pageCount ? pageIndex + 1 : 0} of{" "}
                {pageCount}
            </p>

            <div className="flex items-center gap-1">
                <IconButton
                    label="First page"
                    type="button"
                    size="icon-sm"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.setPageIndex(0)}
                >
                    <HugeiconsIcon icon={ChevronFirstIcon} />
                </IconButton>
                <IconButton
                    label="Previous page"
                    type="button"
                    size="icon-sm"
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    <HugeiconsIcon icon={ChevronLeftIcon} />
                </IconButton>
                <IconButton
                    label="Next page"
                    type="button"
                    size="icon-sm"
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    <HugeiconsIcon icon={ChevronRightIcon} />
                </IconButton>
                <IconButton
                    label="Last page"
                    type="button"
                    size="icon-sm"
                    disabled={!table.getCanNextPage()}
                    onClick={() =>
                        table.setPageIndex(pageCount - 1)
                    }
                >
                    <HugeiconsIcon icon={ChevronLastIcon} />
                </IconButton>
            </div>

            <div className="w-20 shrink-0">
                <Picker
                    className="w-full"
                    label="Rows per page"
                    value={String(pageSize)}
                    onChange={(value) =>
                        table.setPageSize(Number(value))
                    }
                    options={pageSizeOptions.map((size) => ({
                        value: String(size),
                        label: String(size),
                    }))}
                    searchable={false}
                />
            </div>
        </div>
    )
}
