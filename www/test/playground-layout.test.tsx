import {
	createMemoryHistory,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { getEntry } from "../src/features/catalog/lib/get-catalog";
import { Playground } from "../src/features/playground/components/playground";
import { docsSettingsDefaults } from "../src/features/settings/types";

test("playground starts with one toolbar and preview while settings, props and generated code stay closed", async () => {
	const routeTree = createRootRoute({
		component: () => (
			<Playground
				docs={(getEntry("accordion") ?? { docs: {} as never }).docs}
				settings={docsSettingsDefaults}
				rawProps={{}}
			/>
		),
	});
	const router = createRouter({
		routeTree,
		history: createMemoryHistory({
			initialEntries: ["/components/react/accordion"],
		}),
	});
	await router.load();
	const html = renderToStaticMarkup(createElement(RouterProvider, { router }));
	expect(html).toContain("Playground view");
	expect(html).toContain('aria-label="Preview options"');
	expect(html).toContain('aria-label="Reset playground"');
	expect(html).toContain('aria-label="Share playground"');
	expect(html).toContain('aria-label="Live component preview"');
	expect(html).toContain("Accordion interactive preview");
	expect(html).not.toContain('aria-label="Theme"');
	expect(html).not.toContain("Component props");
	expect(html).not.toContain("Generated example code");
});
