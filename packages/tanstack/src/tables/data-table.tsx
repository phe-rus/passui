import { HugeiconsIcon } from "@hugeicons/react"
import {
    Cancel01Icon,
    ChevronDownIcon,
    ChevronUpIcon,
    Loading03Icon,
} from "@hugeicons/core-free-icons"
import type {
    ColumnDef,
    ColumnFiltersState,
    ColumnVisibilityState,
    RowData,
    RowSelectionState,
    SortingState,
} from "@tanstack/react-table"
import {
    columnFilteringFeature,
    columnVisibilityFeature,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    filterFn_arrIncludes,
    filterFn_arrIncludesSome,
    filterFn_equals,
    filterFn_inDateRange,
    filterFn_inNumberRange,
    filterFn_includesString,
    flexRender,
    globalFilteringFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortFn_alphanumeric,
    sortFn_datetime,
    sortFn_text,
    tableFeatures,
    useTable,
} from "@tanstack/react-table"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@passui/react/button"
import { Toggle } from "@passui/react/toggle"
import { SearchField } from "@passui/react"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@passui/react/table"
import { cn } from "@passui/react/cn"
import { FilterRow } from "./filter-row"
import { DataTablePagination } from "./pagination"
import {
    columnIdOf,
    getColumnLabel,
    isArrayValuedColumn,
} from "./utils"

export const baseTableFeatures = tableFeatures({
    globalFilteringFeature,
    columnFilteringFeature,
    rowSortingFeature,
    rowPaginationFeature,
    columnVisibilityFeature,
    rowSelectionFeature,
    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    filterFns: {
        includesString: filterFn_includesString,
        inNumberRange: filterFn_inNumberRange,
        equals: filterFn_equals,
        arrIncludes: filterFn_arrIncludes,
        arrIncludesSome: filterFn_arrIncludesSome,
        inDateRange: filterFn_inDateRange,
    },
    sortFns: {
        text: sortFn_text,
        alphanumeric: sortFn_alphanumeric,
        datetime: sortFn_datetime,
    },
})

export type DataTableFeatures = typeof baseTableFeatures

/**
 * `filterVariant: 'date'` is the one thing a caller has to opt into
 * explicitly (`updatedAt`/`createdAt`, or a custom `type: 'date'` column):
 * unlike an array-valued column (detected automatically below, from the
 * actual data), a date is just a string or number at runtime, nothing to
 * sniff it from safely.
 */
export type DataTableColumnMeta = {
    filterVariant?: "date"
}

export type DataTableColumnDef<
    TData extends RowData,
    TValue = unknown,
> = ColumnDef<DataTableFeatures, TData, TValue> & {
    meta?: DataTableColumnMeta
}

type DataTableProps<TData extends RowData> = {
    data: TData[]
    // biome-ignore lint/suspicious/noExplicitAny: a column array mixes columns with different value types per accessor, same escape hatch tanstack-table's own ColumnDef[] typings use
    columns: DataTableColumnDef<TData, any>[]
    /**
     * A stable id per row, used as the React key and by react-table's row
     * model. Without this, react-table falls back to the row's array index,
     * so deleting a row shifts every id below it onto a different row's
     * data, reusing DOM nodes (and any open dropdown/overlay state) across
     * what are now different rows. Required, not defaulted, so this can't
     * silently regress.
     */
    getRowId: (row: TData) => string
    "aria-label": string
    emptyMessage?: ReactNode
    searchPlaceholder?: string
    bulkActions?: (
        selectedRows: TData[],
        clearSelection: () => void
    ) => ReactNode
    /** Set false to render just the table. Default true. */
    pagination?: boolean
    pageSizeOptions?: number[]
    onSelectedRowsChange?: (rows: TData[]) => void
    /** Opens a row, e.g. its detail drawer. Ignored while rows are selectable. */
    onRowClick?: (row: TData) => void
    /** A summary row rendered inside the table's own <tfoot>, below the data rows — e.g. a totals line. Gets the visible column count for its colSpan. */
    footer?: (columnCount: number) => ReactNode
    /** True while a background refetch is in flight (e.g. after a mutation invalidates the query). Dims the existing rows and shows a small spinner rather than rendering nothing, since `data` still holds the last good result. */
    isLoading?: boolean
    /** Columns hidden until someone turns them on from the Columns menu, keyed by column id. */
    initialColumnVisibility?: ColumnVisibilityState
}

/** A pill that opens the Columns or Filters panel, with a quiet count when something is hidden or applied. */
function ToolbarToggle({
    label,
    count,
    open,
    onClick,
}: {
    label: string
    count: number
    open: boolean
    onClick: () => void
}) {
    const engaged = open || count > 0
    return (
        <button
            type="button"
            aria-expanded={open}
            onClick={onClick}
            className={cn(
                "flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-border/40 px-3 text-xs transition-colors",
                engaged
                    ? "bg-foreground/[0.07] text-foreground"
                    : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
            )}
        >
            {label}
            {count > 0 && (
                <span className="rounded-full bg-foreground/10 px-1.5 tabular-nums">
                    {count}
                </span>
            )}
            <HugeiconsIcon
                icon={ChevronDownIcon}
                className={cn(
                    "size-3 transition-transform duration-150",
                    open && "rotate-180"
                )}
            />
        </button>
    )
}

/**
 * Self-contained table: pass `data` + `columns`, get sorting, pagination,
 * search, column visibility, per-column filters, and row selection for
 * free. There's no `useTable` state to wire up on the caller's side.
 */
export function DataTable<TData extends RowData>({
    data,
    columns,
    getRowId,
    emptyMessage = "No results.",
    searchPlaceholder = "Search…",
    bulkActions,
    pagination = true,
    pageSizeOptions,
    onSelectedRowsChange,
    onRowClick,
    footer,
    isLoading = false,
    initialColumnVisibility = {},
    "aria-label": ariaLabel,
}: DataTableProps<TData>) {
    const [searchInput, setSearchInput] = useState("")
    const [globalFilter, setGlobalFilter] = useState("")
    // Debounced: typing updates searchInput (the input stays responsive),
    // globalFilter (the actual re-filter trigger, synchronous across the
    // whole dataset) only updates 200ms after the last keystroke.
    useEffect(() => {
        const timeout = setTimeout(
            () => setGlobalFilter(searchInput),
            200
        )
        return () => clearTimeout(timeout)
    }, [searchInput])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        useState<ColumnVisibilityState>(
            initialColumnVisibility
        )
    const [rowSelection, setRowSelection] =
        useState<RowSelectionState>({})
    const [columnsOpen, setColumnsOpen] = useState(false)
    const [filtersOpen, setFiltersOpen] = useState(false)
    const augmentedColumns = useMemo(
        () =>
            columns.map((col) => {
                if (col.filterFn) return col
                const colId = columnIdOf(col)
                if (!colId) return col
                if (col.meta?.filterVariant === "date") {
                    return {
                        ...col,
                        filterFn: filterFn_inDateRange,
                    }
                }
                if (isArrayValuedColumn(data, colId)) {
                    return {
                        ...col,
                        filterFn: filterFn_arrIncludesSome,
                    }
                }
                return col
            }),
        [columns, data]
    )

    const table = useTable({
        features: baseTableFeatures,
        data,
        columns: augmentedColumns,
        getRowId,
        enableRowSelection: true,
        state: {
            globalFilter,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        globalFilterFn: "auto",
    })

    const toggleableColumns = table
        .getAllColumns()
        .filter((c) => c.getCanHide())
    const hiddenCount = toggleableColumns.filter(
        (c) => !c.getIsVisible()
    ).length

    const skip = ["select", "actions"]
    const filterableColumns = table
        .getAllColumns()
        .filter(
            (c) =>
                c.getCanFilter() &&
                !skip.includes(c.id) &&
                c.accessorFn !== undefined
        )

    const activeFilterCount = columnFilters.length
    const selectedCount =
        Object.values(rowSelection).filter(Boolean).length
    const selectedRows = table
        .getSelectedRowModel()
        .rows.map((r) => r.original)
    const clearSelection = () => setRowSelection({})

    const rows = table.getRowModel().rows
    const columnCount = table.getVisibleLeafColumns().length

    return (
        <div className="flex flex-col gap-3 [&_div]:no-scrollbar [&_tr]:border-none!">
            <div className="flex flex-wrap items-center gap-3">
                <SearchField
                    className="w-full min-w-0 sm:max-w-sm"
                    aria-label={searchPlaceholder}
                    placeholder={searchPlaceholder}
                    autoComplete="off"
                    value={searchInput}
                    onChange={(event) =>
                        setSearchInput(event.target.value)
                    }
                />
                {isLoading && (
                    <HugeiconsIcon
                        icon={Loading03Icon}
                        className="size-4 shrink-0 animate-spin"
                        aria-label="Loading"
                    />
                )}
                <div className="flex shrink-0 items-center gap-1.5 sm:ml-auto">
                    <ToolbarToggle
                        label="Columns"
                        count={hiddenCount}
                        open={columnsOpen}
                        onClick={() => {
                            setColumnsOpen((o) => !o)
                            setFiltersOpen(false)
                        }}
                    />
                    <ToolbarToggle
                        label="Filters"
                        count={activeFilterCount}
                        open={filtersOpen}
                        onClick={() => {
                            setFiltersOpen((o) => !o)
                            setColumnsOpen(false)
                        }}
                    />
                </div>
            </div>

            {columnsOpen && (
                <div className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-foreground/[0.025] p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs">Columns</h3>
                        {hiddenCount > 0 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    table.resetColumnVisibility()
                                }
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Show all
                            </Button>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        {toggleableColumns.map((column) => {
                            const visible =
                                column.getIsVisible()
                            return (
                                <div
                                    key={column.id}
                                    className="flex cursor-pointer items-center gap-2"
                                    onClick={() =>
                                        column.toggleVisibility()
                                    }
                                >
                                    <Toggle
                                        style="checkbox"
                                        labelHidden
                                        label={getColumnLabel(
                                            column
                                        )}
                                        checked={visible}
                                        onChange={() =>
                                            column.toggleVisibility()
                                        }
                                    />
                                    <span className="text-xs">
                                        {getColumnLabel(
                                            column
                                        )}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {filtersOpen && (
                <div className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-foreground/[0.025] p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs">Filters</h3>
                        {activeFilterCount > 0 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    setColumnFilters([])
                                }
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <HugeiconsIcon
                                    icon={Cancel01Icon}
                                    className="size-3"
                                />
                                Clear all
                            </Button>
                        )}
                    </div>
                    {filterableColumns.length === 0 ? (
                        <p className="text-xs text-muted-foreground/60">
                            No filterable columns.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filterableColumns.map(
                                (column) => (
                                    <FilterRow
                                        key={column.id}
                                        column={column}
                                        data={data}
                                        skip={skip}
                                        isArrayColumn={isArrayValuedColumn(
                                            data,
                                            column.id
                                        )}
                                        isDateColumn={
                                            (
                                                column.columnDef as {
                                                    meta?: DataTableColumnMeta
                                                }
                                            ).meta
                                                ?.filterVariant ===
                                            "date"
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            )}

            {bulkActions && selectedCount > 0 && (
                <div className="flex items-center gap-3 rounded-full border border-border/40 bg-foreground/[0.035] py-1.5 pr-1.5 pl-4">
                    <span className="text-xs font-medium">
                        {selectedCount} selected
                    </span>
                    <div className="h-4 w-px bg-input/40" />
                    {bulkActions(
                        selectedRows,
                        clearSelection
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearSelection}
                        className="ml-auto text-muted-foreground hover:text-foreground"
                    >
                        Clear
                    </Button>
                </div>
            )}

            <Table
                aria-label={ariaLabel}
                className={cn(
                    "divide-none!",
                    isLoading &&
                        "opacity-60 transition-opacity"
                )}
            >
                <TableHeader>
                    {table
                        .getHeaderGroups()
                        .map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-b border-border/40 hover:bg-transparent"
                            >
                                {headerGroup.headers.map(
                                    (header) => (
                                        <TableHead
                                            key={header.id}
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className="flex w-fit cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(
                                                        header
                                                            .column
                                                            .columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    <div className="flex flex-col">
                                                        <HugeiconsIcon
                                                            icon={
                                                                ChevronUpIcon
                                                            }
                                                            className={cn(
                                                                "size-3 opacity-20",
                                                                header.column.getIsSorted() ===
                                                                    "asc" &&
                                                                    "opacity-100"
                                                            )}
                                                        />
                                                        <HugeiconsIcon
                                                            icon={
                                                                ChevronDownIcon
                                                            }
                                                            className={cn(
                                                                "-mt-1.5 size-3 opacity-20",
                                                                header.column.getIsSorted() ===
                                                                    "desc" &&
                                                                    "opacity-100"
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                flexRender(
                                                    header
                                                        .column
                                                        .columnDef
                                                        .header,
                                                    header.getContext()
                                                )
                                            )}
                                        </TableHead>
                                    )
                                )}
                            </TableRow>
                        ))}
                </TableHeader>
                <TableBody>
                    {rows.length ? (
                        rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className={cn(
                                    "border-b border-border/25 transition-colors last:border-b-0 hover:bg-foreground/[0.025]",
                                    onRowClick &&
                                        "cursor-pointer"
                                )}
                                data-state={
                                    row.getIsSelected()
                                        ? "selected"
                                        : undefined
                                }
                                onClick={() => {
                                    if (
                                        !onSelectedRowsChange
                                    ) {
                                        onRowClick?.(
                                            row.original
                                        )
                                        return
                                    }
                                    row.toggleSelected()
                                    onSelectedRowsChange(
                                        selectedRows
                                    )
                                }}
                            >
                                {row
                                    .getVisibleCells()
                                    .map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column
                                                    .columnDef
                                                    .cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columnCount}
                                className="h-24 text-center"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                {footer && (
                    <TableFooter>
                        {footer(columnCount)}
                    </TableFooter>
                )}
            </Table>

            {pagination && (
                <DataTablePagination
                    table={table}
                    pageSizeOptions={pageSizeOptions}
                />
            )}
        </div>
    )
}
