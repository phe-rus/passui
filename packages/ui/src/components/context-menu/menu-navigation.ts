export type MenuNavigationKey = "ArrowDown" | "ArrowUp" | "Home" | "End";

export function isMenuNavigationKey(key: string): key is MenuNavigationKey {
	return (
		key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End"
	);
}

/** Index of the next enabled action in a menu, with wrapping arrow navigation. */
export function nextMenuIndex(
	key: MenuNavigationKey,
	current: number,
	count: number,
): number {
	if (count <= 0) return -1;
	if (key === "Home") return 0;
	if (key === "End") return count - 1;
	if (key === "ArrowDown") return (current + 1) % count;
	return current < 0 ? count - 1 : (current - 1 + count) % count;
}

/** Finds a matching label after the current action, wrapping at the end. */
export function findMenuTypeaheadIndex(
	labels: ReadonlyArray<string>,
	query: string,
	current: number,
): number {
	if (!labels.length || !query.trim()) return -1;
	const needle = query.toLocaleLowerCase();
	for (let offset = 1; offset <= labels.length; offset++) {
		const index = (current + offset + labels.length) % labels.length;
		if (labels[index]?.trim().toLocaleLowerCase().startsWith(needle))
			return index;
	}
	return -1;
}
