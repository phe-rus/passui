import { catalogIcons } from "@passui/react/icons";
import { readFileSync, writeFileSync } from "node:fs";
import { getCatalog } from "../src/domains/catalog/get-catalog";

const output = new URL(
	"../src/domains/catalog/navigation.generated.json",
	import.meta.url,
);
const entries = getCatalog().map(({ docs, group, content, icon }) => ({
	docs: { slug: docs.slug, name: docs.name },
	group,
	icon:
		Object.entries(catalogIcons).find(
			([, candidate]) => candidate === icon,
		)?.[0] ?? "input",
	exampleIds: docs.examples.map((example) => example.id),
	content: { summary: content.summary },
}));
if (process.argv.includes("--check")) {
	const existing = JSON.parse(readFileSync(output, "utf8"));
	if (JSON.stringify(existing) !== JSON.stringify(entries)) {
		throw new Error("Navigation metadata is stale. Run bun run docs:api.");
	}
} else writeFileSync(output, `${JSON.stringify(entries, null, 4)}\n`);
