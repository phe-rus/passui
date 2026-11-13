import { getDocCode } from "@/features/docs/lib/get-doc-code";
import { getMeta } from "./registry";
import type { ComponentDoc } from "./types";

/**
 * A component's examples are real components, so they load by dynamic import,
 * one page at a time, and the registry stays light.
 */
const definitions = import.meta.glob<{ doc: ComponentDoc }>(
	"./definitions/*.tsx",
);
const loaded = new Map<string, ComponentDoc>();
const pending = new Map<string, Promise<ComponentDoc>>();

/** Loads one page's examples once, and remembers them. */
export function loadDefinition(slug: string) {
	let promise = pending.get(slug);
	if (!promise) {
		const load = definitions[`./definitions/${slug}.tsx`];
		promise = (
			load?.() ?? Promise.reject(new Error(`No page for ${slug}`))
		).then(({ doc }) => {
			loaded.set(slug, doc);
			return doc;
		});
		// React's `use` returns at once for a thenable that says it is settled,
		// so a page that is already loaded never suspends again.
		const settled = promise as Promise<ComponentDoc> & {
			status?: string;
			value?: ComponentDoc;
		};
		settled.then((doc) => {
			settled.status = "fulfilled";
			settled.value = doc;
		});
		pending.set(slug, promise);
	}
	return promise;
}

/** The examples, once `loadDefinition` has finished for this page. */
export const readDefinition = (slug: string) => loaded.get(slug);

/** The route loader for one component page: its meta, its code from the server, and its examples ready to render. */
export async function loadComponentPage(slug: string) {
	const meta = getMeta(slug);
	if (!meta) return null;
	const [page] = await Promise.all([
		getDocCode({ data: { slug, entry: meta.entry } }),
		loadDefinition(slug),
	]);
	return { meta, code: page };
}
