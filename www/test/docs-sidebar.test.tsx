import {
	createMemoryHistory,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { DocsNav } from "@/features/catalog/components/docs-nav";
import { getNavigationCatalog } from "@/features/catalog/lib/get-navigation";

async function renderNavigation(path = "/") {
	const routeTree = createRootRoute({ component: DocsNav });
	const router = createRouter({
		routeTree,
		history: createMemoryHistory({ initialEntries: [path] }),
	});
	await router.load();
	return renderToStaticMarkup(createElement(RouterProvider, { router }));
}

test("sidebar exposes every component in one alphabetical list without collapsed categories", async () => {
	const html = await renderNavigation("/components/react/button");
	expect(
		[...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map((match) => match[1]),
	).toEqual(["Getting started", "Components"]);
	expect(html).not.toContain('href="/components"');
	expect(html).not.toContain("aria-expanded");
	const links = [...html.matchAll(/href="\/components\/react\/([^"/]+)"/g)].map(
		(match) => match[1],
	);
	expect(links).toEqual(getNavigationCatalog().map((entry) => entry.docs.slug));
	expect(html).toContain('aria-current="page"');
});
