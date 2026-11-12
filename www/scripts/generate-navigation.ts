import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { catalogIcons } from "@passui/react/icons";
import { getCatalog } from "../src/features/catalog/lib/get-catalog";
import type { UiDoc } from "../src/features/ui-docs/types";

const output = new URL(
	"../src/features/catalog/generated/navigation.json",
	import.meta.url,
);
// Pages built on the lean docs system replace any catalog entry with the same slug.
const docsDirectory = new URL("../src/features/ui-docs/docs/", import.meta.url);
const leanDocs: UiDoc[] = [];
for (const file of readdirSync(docsDirectory).sort())
	if (file.endsWith(".tsx") && !file.startsWith("_"))
		leanDocs.push((await import(new URL(file, docsDirectory).href)).doc);
const leanEntries = leanDocs.map((doc) => ({
	docs: { slug: doc.slug, name: doc.name },
	group: doc.group,
	icon: doc.icon,
	exampleIds: doc.examples.map((example) => example.id),
	content: { summary: doc.summary },
}));
const catalogEntries = getCatalog().map(({ docs, group, content, icon }) => ({
	docs: { slug: docs.slug, name: docs.name },
	group,
	icon:
		Object.entries(catalogIcons).find(
			([, candidate]) => candidate === icon,
		)?.[0] ?? "input",
	exampleIds: docs.examples.map((example) => example.id),
	content: { summary: content.summary },
}));
const entries = [
	...catalogEntries.map(
		(entry) =>
			leanEntries.find((lean) => lean.docs.slug === entry.docs.slug) ?? entry,
	),
	...leanEntries.filter(
		(lean) =>
			!catalogEntries.some((entry) => entry.docs.slug === lean.docs.slug),
	),
];
if (process.argv.includes("--check")) {
	const existing = JSON.parse(readFileSync(output, "utf8"));
	if (JSON.stringify(existing) !== JSON.stringify(entries)) {
		throw new Error("Navigation metadata is stale. Run bun run docs:api.");
	}
} else writeFileSync(output, `${JSON.stringify(entries, null, 4)}\n`);
