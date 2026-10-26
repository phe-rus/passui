/** @jsxImportSource solid-js */
import { createMemo, For, Show } from "solid-js"
import type { Column, RowData } from "@tanstack/solid-table"
import { Button, Toggle } from "@passui/solid"
import type { DataTableFeatures } from "./data-table"
export function FilterRow<TData extends RowData>(props: {
    column: Column<DataTableFeatures, TData, unknown>
    data: TData[]
    skip: string[]
    isArrayColumn: boolean
    isDateColumn?: boolean
}) {
    const values = createMemo(() => {
        if (props.skip.includes(props.column.id)) return []
        const values = props.data
            .flatMap((row) => {
                const value = (
                    row as Record<string, unknown>
                )[props.column.id]
                return props.isArrayColumn &&
                    Array.isArray(value)
                    ? value
                    : [value]
            })
            .filter(
                (value) =>
                    value !== null &&
                    value !== undefined &&
                    value !== "" &&
                    typeof value !== "object"
            )
        const unique = [...new Set(values.map(String))]
        return unique.length >= 2 &&
            unique.length <= (props.isArrayColumn ? 20 : 12)
            ? unique
            : []
    })
    const label = () =>
        typeof props.column.columnDef.header === "string"
            ? props.column.columnDef.header
            : props.column.id
    const range = () =>
        (props.column.getFilterValue() as
            | [string?, string?]
            | undefined) ?? []
    return (
        <div class="flex flex-wrap items-center gap-3">
            <span class="text-footnote">{label()}</span>
            <Show
                when={props.isDateColumn}
                fallback={
                    <Show
                        when={values().length}
                        fallback={
                            <input
                                aria-label={label()}
                                value={String(
                                    props.column.getFilterValue() ??
                                        ""
                                )}
                                onInput={(event) =>
                                    props.column.setFilterValue(
                                        event.currentTarget
                                            .value ||
                                            undefined
                                    )
                                }
                                class="rounded-lg border border-separator px-3 py-2"
                            />
                        }
                    >
                        <For each={values()}>
                            {(value) => (
                                <Toggle
                                    style="checkbox"
                                    label={value}
                                    checked={(
                                        (props.column.getFilterValue() as
                                            | string[]
                                            | undefined) ?? []
                                    ).includes(value)}
                                    onChange={(checked) =>
                                        props.column.setFilterValue(
                                            (
                                                previous:
                                                    | string[]
                                                    | undefined
                                            ) => {
                                                const next =
                                                    checked
                                                        ? [
                                                              ...(previous ??
                                                                  []),
                                                              value,
                                                          ]
                                                        : (
                                                              previous ??
                                                              []
                                                          ).filter(
                                                              (
                                                                  item
                                                              ) =>
                                                                  item !==
                                                                  value
                                                          )
                                                return next.length
                                                    ? next
                                                    : undefined
                                            }
                                        )
                                    }
                                />
                            )}
                        </For>
                    </Show>
                }
            >
                <input
                    type="date"
                    aria-label={`${label()} from`}
                    value={range()[0] ?? ""}
                    onInput={(event) =>
                        props.column.setFilterValue([
                            event.currentTarget.value ||
                                undefined,
                            range()[1],
                        ])
                    }
                />
                <input
                    type="date"
                    aria-label={`${label()} to`}
                    value={range()[1] ?? ""}
                    onInput={(event) =>
                        props.column.setFilterValue([
                            range()[0],
                            event.currentTarget.value ||
                                undefined,
                        ])
                    }
                />
            </Show>
            <Show
                when={
                    props.column.getFilterValue() !==
                    undefined
                }
            >
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                        props.column.setFilterValue(undefined)
                    }
                >
                    Clear
                </Button>
            </Show>
        </div>
    )
}
