/** Restore only the snapshot this mutation wrote, preserving newer concurrent writes. */
export function shouldRestoreOptimisticSnapshot<T>(
    current: T | undefined,
    expected: T
) {
    return current === expected
}
