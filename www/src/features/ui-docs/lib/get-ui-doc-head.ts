import { getNavigationEntry } from "@/features/catalog/lib/get-navigation";
import { getPageHead } from "@/features/seo/lib/get-page-head";

/** Page metadata from the generated navigation data, with no executable demos. */
export function getUiDocHead(slug: string) {
	const entry = getNavigationEntry(slug);
	return getPageHead(
		`/components/react/${slug}`,
		`${entry?.docs.name ?? "Not found"} · React · Passui`,
		entry?.content.summary ?? "",
	);
}
