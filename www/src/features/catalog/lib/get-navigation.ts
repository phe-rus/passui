import entries from "../generated/navigation.json";

/** Metadata only: the site shell must not import executable component examples. */
export function getNavigationCatalog() {
	return entries;
}

export function getNavigationEntry(slug: string) {
	return entries.find((entry) => entry.docs.slug === slug);
}
