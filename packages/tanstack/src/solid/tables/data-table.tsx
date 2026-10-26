/** @jsxImportSource solid-js */
import {
    createTable,
    FlexRender,
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
    globalFilteringFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortFn_alphanumeric,
    sortFn_datetime,
    sortFn_text,
    tableFeatures,
    type ColumnDef,
    type RowData,
    type ColumnVisibilityState,
} from "@tanstack/solid-table"
import {
    createEffect,
    createMemo,
    createSignal,
    For,
    onCleanup,
    Show,
    type JSX,
} from "solid-js"
import { Button, SearchField, Toggle } from "@passui/solid"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
} from "@passui/solid/table"
import { DataTablePagination } from "./pagination"
import { FilterRow } from "./filter-row"
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

export type DataTableProps<TData extends RowData> = {
    data: TData[]
    // biome-ignore lint/suspicious/noExplicitAny: columns can carry different cell value types.
    columns: DataTableColumnDef<TData, any>[]
    getRowId?: (row: TData, index: number) => string
    emptyMessage?: string
    searchPlaceholder?: string
    bulkActions?: (
        selected: TData[],
        clear: () => void
    ) => JSX.Element
    pagination?: boolean
    pageSizeOptions?: number[]
    onSelectedRowsChange?: (rows: TData[]) => void
    onRowClick?: (row: TData) => void
    footer?: (columns: number) => JSX.Element
    isLoading?: boolean
    initialColumnVisibility?: ColumnVisibilityState
    "aria-label"?: string
}
export function DataTable<TData extends RowData>(
    props: DataTableProps<TData>
) {
    const [search, setSearch] = createSignal(""),
        [columnsOpen, setColumnsOpen] = createSignal(false),
        [filtersOpen, setFiltersOpen] = createSignal(false)
    const columns = createMemo(() =>
        props.columns.map((column) =>
            column.filterFn || !("accessorKey" in column)
                ? column
                : {
                      ...column,
                      filterFn: props.data.some((row) =>
                          Array.isArray(
                              (
                                  row as Record<
                                      string,
                                      unknown
                                  >
                              )[String(column.accessorKey)]
                          )
                      )
                          ? ("arrIncludesSome" as const)
                          : column.meta?.filterVariant ===
                              "date"
                            ? ("inDateRange" as const)
                            : ("includesString" as const),
                  }
        )
    )
    const table = createTable({
        features: baseTableFeatures,
        get data() {
            return props.data
        },
        get columns() {
            return columns()
        },
        getRowId: props.getRowId,
        initialState: {
            columnVisibility:
                props.initialColumnVisibility ?? {},
            pagination: {
                pageIndex: 0,
                pageSize: props.pageSizeOptions?.[0] ?? 10,
            },
        },
    })
    createEffect(() => {
        const value = search()
        const timer = setTimeout(
            () => table.setGlobalFilter(value),
            200
        )
        onCleanup(() => clearTimeout(timer))
    })
    const selected = () =>
        table
            .getSelectedRowModel()
            .rows.map((row) => row.original)
    createEffect(() => {
        const rows = selected()
        props.onSelectedRowsChange?.(rows)
    })
    const clear = () => table.resetRowSelection()
    const rows = () =>
        props.pagination === false
            ? table.getPrePaginatedRowModel().rows
            : table.getRowModel().rows
    return (
        <div
            class="flex w-full flex-col gap-4"
            aria-busy={props.isLoading}
        >
            <div class="flex flex-wrap items-center gap-2">
                <SearchField
                    aria-label={
                        props.searchPlaceholder ?? "Search"
                    }
                    placeholder={
                        props.searchPlaceholder ?? "Search…"
                    }
                    value={search()}
                    onInput={(event) =>
                        setSearch(event.currentTarget.value)
                    }
                />
                <Button
                    size="sm"
                    variant="secondary"
                    aria-expanded={columnsOpen()}
                    onClick={() =>
                        setColumnsOpen((value) => !value)
                    }
                >
                    Columns
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    aria-expanded={filtersOpen()}
                    onClick={() =>
                        setFiltersOpen((value) => !value)
                    }
                >
                    Filters
                </Button>
            </div>
            <Show when={columnsOpen()}>
                <div class="flex flex-wrap gap-3">
                    <For
                        each={table
                            .getAllLeafColumns()
                            .filter((column) =>
                                column.getCanHide()
                            )}
                    >
                        {(column) => (
                            <Toggle
                                style="checkbox"
                                label={
                                    typeof column.columnDef
                                        .header === "string"
                                        ? column.columnDef
                                              .header
                                        : column.id
                                }
                                checked={column.getIsVisible()}
                                onChange={(visible) =>
                                    column.toggleVisibility(
                                        visible
                                    )
                                }
                            />
                        )}
                    </For>
                </div>
            </Show>
            <Show when={filtersOpen()}>
                <div class="flex flex-col gap-3">
                    <For
                        each={table
                            .getAllLeafColumns()
                            .filter((column) =>
                                column.getCanFilter()
                            )}
                    >
                        {(column) => (
                            <FilterRow
                                column={column}
                                data={props.data}
                                skip={[]}
                                isArrayColumn={props.data.some(
                                    (row) =>
                                        Array.isArray(
                                            (
                                                row as Record<
                                                    string,
                                                    unknown
                                                >
                                            )[column.id]
                                        )
                                )}
                                isDateColumn={
                                    (
                                        column.columnDef
                                            .meta as
                                            | DataTableColumnMeta
                                            | undefined
                                    )?.filterVariant ===
                                    "date"
                                }
                            />
                        )}
                    </For>
                </div>
            </Show>
            <Show
                when={props.bulkActions && selected().length}
            >
                <div class="flex items-center gap-3 rounded-full bg-fill p-2">
                    <span>{selected().length} selected</span>
                    {props.bulkActions?.(selected(), clear)}
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={clear}
                    >
                        Clear
                    </Button>
                </div>
            </Show>
            <Table aria-label={props["aria-label"]}>
                <TableHeader>
                    <For each={table.getHeaderGroups()}>
                        {(group) => (
                            <TableRow>
                                <For each={group.headers}>
                                    {(header) => (
                                        <TableHead
                                            aria-sort={
                                                header.column.getIsSorted() ===
                                                "asc"
                                                    ? "ascending"
                                                    : header.column.getIsSorted() ===
                                                        "desc"
                                                      ? "descending"
                                                      : undefined
                                            }
                                        >
                                            <Show
                                                when={
                                                    !header.isPlaceholder
                                                }
                                            >
                                                <Show
                                                    when={header.column.getCanSort()}
                                                    fallback={
                                                        <FlexRender
                                                            header={
                                                                header
                                                            }
                                                        />
                                                    }
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        class="flex items-center gap-1"
                                                    >
                                                        <FlexRender
                                                            header={
                                                                header
                                                            }
                                                        />
                                                        <span aria-hidden="true">
                                                            {header.column.getIsSorted() ===
                                                            "asc"
                                                                ? "↑"
                                                                : header.column.getIsSorted() ===
                                                                    "desc"
                                                                  ? "↓"
                                                                  : "↕"}
                                                        </span>
                                                    </button>
                                                </Show>
                                            </Show>
                                        </TableHead>
                                    )}
                                </For>
                            </TableRow>
                        )}
                    </For>
                </TableHeader>
                <TableBody>
                    <Show
                        when={rows().length}
                        fallback={
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        table.getVisibleLeafColumns()
                                            .length
                                    }
                                    class="h-24 text-center"
                                >
                                    {props.emptyMessage ??
                                        "No results."}
                                </TableCell>
                            </TableRow>
                        }
                    >
                        <For each={rows()}>
                            {(row) => (
                                <TableRow
                                    data-state={
                                        row.getIsSelected()
                                            ? "selected"
                                            : undefined
                                    }
                                    onClick={(event) => {
                                        if (
                                            (
                                                event.target as Element
                                            ).closest(
                                                "button, input, a"
                                            )
                                        )
                                            return
                                        if (
                                            props.onSelectedRowsChange
                                        )
                                            row.toggleSelected()
                                        else
                                            props.onRowClick?.(
                                                row.original
                                            )
                                    }}
                                >
                                    <For
                                        each={row.getVisibleCells()}
                                    >
                                        {(cell) => (
                                            <TableCell>
                                                <FlexRender
                                                    cell={
                                                        cell
                                                    }
                                                />
                                            </TableCell>
                                        )}
                                    </For>
                                </TableRow>
                            )}
                        </For>
                    </Show>
                </TableBody>
                <Show when={props.footer}>
                    <TableFooter>
                        {props.footer?.(
                            table.getVisibleLeafColumns()
                                .length
                        )}
                    </TableFooter>
                </Show>
            </Table>
            <Show when={props.pagination !== false}>
                <DataTablePagination
                    table={table}
                    pageSizeOptions={props.pageSizeOptions}
                />
            </Show>
        </div>
    )
}
