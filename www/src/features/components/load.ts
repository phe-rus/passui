import { getDocCode } from "@/lib/get-doc-code";
import { getMeta } from "./registry";

/** The route loader for one component page: its meta, and its highlighted code from the server. */
export async function loadComponentPage(slug: string) {
	const meta = getMeta(slug);
	if (!meta) return null;
	return {
		meta,
		code: await getDocCode({ data: { slug, entry: meta.entry } }),
	};
}
