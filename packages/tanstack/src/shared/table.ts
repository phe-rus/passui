export function isArrayValuedColumn<TData>(
    data: TData[],
    colId: string
): boolean {
    return data.some((row) =>
        Array.isArray((row as Record<string, unknown>)[colId])
    )
}
export function getColumnLabel(column: {
    columnDef: { header?: unknown }
    id: string
}) {
    const header = column.columnDef.header
    return typeof header === "string"
        ? header
        : column.id
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (value) => value.toUpperCase())
}
export function columnIdOf(column: {
    id?: string
    accessorKey?: unknown
}): string | undefined {
    return (
        column.id ||
        (typeof column.accessorKey === "string"
            ? column.accessorKey
            : undefined)
    )
}
