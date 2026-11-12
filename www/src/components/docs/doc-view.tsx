import { type ComponentType, lazy, Suspense } from "react";
import apiJson from "@/features/components/api.generated.json";
import type {
	ComponentDoc,
	ComponentMeta,
	PartApi,
} from "@/features/components/types";
import type { DocCode } from "@/lib/highlight.server";
import budgets from "../../../../size-budgets.json";
import { ComponentPage } from "./component-page";

type Loaded = { doc: ComponentDoc };
const definitions = import.meta.glob<Loaded>(
	"../../features/components/definitions/*.tsx",
);

interface Data {
	meta: ComponentMeta;
	code: DocCode;
}

const cache = new Map<string, ComponentType<Data>>();

function pageFor(slug: string) {
	let Page = cache.get(slug);
	if (!Page) {
		const load =
			definitions[`../../features/components/definitions/${slug}.tsx`];
		Page = lazy(async () => {
			const mod = await load?.();
			const api = (apiJson as Record<string, PartApi[]>)[slug] ?? [];
			const budget = (budgets.budgets as Record<string, number>)[slug];
			return {
				default: ({ meta, code }: Data) =>
					mod ? (
						<ComponentPage
							meta={meta}
							doc={mod.doc}
							code={code}
							api={api}
							sizeKb={budget ? Math.ceil(budget / 1100) : undefined}
						/>
					) : null,
			};
		});
		cache.set(slug, Page);
	}
	return Page;
}

/** Loads one page's executable demos on demand, so the registry stays light. */
export function DocView({ meta, code }: Data) {
	const Page = pageFor(meta.slug);
	return (
		<Suspense
			fallback={
				<p className="text-subheadline text-label-secondary">Loading…</p>
			}
		>
			<Page meta={meta} code={code} />
		</Suspense>
	);
}
