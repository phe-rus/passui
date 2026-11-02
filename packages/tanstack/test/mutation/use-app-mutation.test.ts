import { expect, test } from "vitest"
import { QueryClient } from "@tanstack/react-query"

import {
    restoreOptimisticSnapshot,
    shouldRestoreOptimisticSnapshot,
} from "../../src/mutation/use-app-mutation"

test("restores the snapshot while the optimistic value is current", () => {
    const optimistic = { birthday: "2000-01-01" }
    expect(shouldRestoreOptimisticSnapshot(optimistic, optimistic)).toBe(true)
})

test("preserves a newer cache value instead of rolling it back", () => {
    expect(
        shouldRestoreOptimisticSnapshot({ birthday: "2001-01-01" }, { birthday: "2000-01-01" })
    ).toBe(false)
})

test("failed optimistic creation removes the cache entry when it did not exist before", () => {
    const client = new QueryClient()
    const key = ["new-record"]
    const optimistic = { name: "Draft" }
    client.setQueryData(key, optimistic)

    expect(restoreOptimisticSnapshot(client, key, undefined, optimistic)).toBe(true)
    expect(client.getQueryData(key)).toBeUndefined()
    expect(client.getQueryState(key)).toBeUndefined()
})

test("failed optimistic changes restore their previous snapshot", () => {
    const client = new QueryClient()
    const key = ["account"]
    const original = { name: "Before" }
    const optimistic = { name: "After" }
    client.setQueryData(key, optimistic)

    expect(restoreOptimisticSnapshot(client, key, original, optimistic)).toBe(true)
    expect(client.getQueryData(key)).toEqual(original)
})

test("rollback leaves subsequent concurrent cache updates untouched", () => {
    const client = new QueryClient()
    const key = ["account"]
    const optimistic = { name: "Draft" }
    const newer = { name: "Saved elsewhere" }
    client.setQueryData(key, newer)

    expect(restoreOptimisticSnapshot(client, key, undefined, optimistic)).toBe(false)
    expect(client.getQueryData(key)).toBe(newer)
})
