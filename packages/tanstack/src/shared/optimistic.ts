import type { QueryClient, QueryKey } from "@tanstack/react-query"

/** Restore only the snapshot this mutation wrote, preserving newer concurrent writes. */
export function shouldRestoreOptimisticSnapshot<T>(current: T | undefined, expected: T) {
    return current === expected
}

/** Remove a new optimistic cache entry when no cache value existed before the mutation. */
export function restoreOptimisticSnapshot<T>(
    client: Pick<QueryClient, "getQueryData" | "setQueryData" | "removeQueries">,
    queryKey: QueryKey,
    previous: T | undefined,
    expected: T
) {
    if (!shouldRestoreOptimisticSnapshot(client.getQueryData<T>(queryKey), expected)) return false
    if (previous === undefined) client.removeQueries({ queryKey, exact: true })
    else client.setQueryData(queryKey, previous)
    return true
}
