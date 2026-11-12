import { catalogIcons } from "@passui/react/icons";
import { expect, test } from "vitest";
import { getCatalog } from "../src/features/catalog/lib/get-catalog";
import { getNavigationCatalog } from "../src/features/catalog/lib/get-navigation";
import type { UiDoc } from "../src/features/ui-docs/types";

const lean = Object.values(
	import.meta.glob<{ doc: UiDoc }>("../src/features/ui-docs/docs/[!_]*.tsx", {
		eager: true,
	}),
).map(({ doc }) => ({
	docs: { slug: doc.slug, name: doc.name },
	group: doc.group,
	icon: doc.icon,
	exampleIds: doc.examples.map((example) => example.id),
	content: { summary: doc.summary },
}));

test("lightweight shell metadata matches every registered page, with lean pages replacing or joining", () => {
	const catalog = getCatalog().map(({ docs, group, content, icon }) => ({
		docs: { slug: docs.slug, name: docs.name },
		group,
		icon:
			Object.entries(catalogIcons).find(
				([, candidate]) => candidate === icon,
			)?.[0] ?? "input",
		exampleIds: docs.examples.map((example) => example.id),
		content: { summary: content.summary },
	}));
	expect(getNavigationCatalog()).toEqual([
		...catalog.map(
			(entry) =>
				lean.find((page) => page.docs.slug === entry.docs.slug) ?? entry,
		),
		...lean.filter(
			(page) => !catalog.some((entry) => entry.docs.slug === page.docs.slug),
		),
	]);
	for (const entry of getNavigationCatalog())
		expect(entry.docs).not.toHaveProperty("render");
});
