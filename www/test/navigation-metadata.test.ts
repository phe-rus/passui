import { catalogIcons } from "@passui/react/icons";
import { expect, test } from "vitest";
import { getCatalog } from "../src/domains/catalog/get-catalog";
import { getNavigationCatalog } from "../src/domains/catalog/get-navigation";

test("lightweight shell metadata matches every registered page in the same order", () => {
	expect(getNavigationCatalog()).toEqual(
		getCatalog().map(({ docs, group, content, icon }) => ({
			docs: { slug: docs.slug, name: docs.name },
			group,
			icon:
				Object.entries(catalogIcons).find(
					([, candidate]) => candidate === icon,
				)?.[0] ?? "input",
			exampleIds: docs.examples.map((example) => example.id),
			content: { summary: content.summary },
		})),
	);
	for (const entry of getNavigationCatalog())
		expect(entry.docs).not.toHaveProperty("render");
});
