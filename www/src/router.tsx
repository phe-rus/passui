import { DefaultBoundary, NotFound } from "@passui/tanstack/route-boundary";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";

/**
 * A tab opened before a deploy still asks for chunk hashes the new build no
 * longer ships, so a lazy import fails with "Failed to fetch dynamically
 * imported module". Reload once to pick up the current build.
 */
function reloadOnStaleChunk() {
	if (typeof window === "undefined") return;
	window.addEventListener("vite:preloadError", (event) => {
		try {
			const at = Number(sessionStorage.getItem("passui:chunk-reload") ?? 0);
			if (Date.now() - at < 10_000) return;
			sessionStorage.setItem("passui:chunk-reload", String(Date.now()));
		} catch {
			return;
		}
		event.preventDefault();
		window.location.reload();
	});
}

export function getRouter() {
	reloadOnStaleChunk();
	const queryClient = new QueryClient();
	const router = createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		// The page scrolls inside <main> (ComposeViewport fixes <body>).
		scrollToTopSelectors: ["main"],
		defaultPreload: "intent",
		defaultErrorComponent: DefaultBoundary,
		defaultNotFoundComponent: () => <NotFound />,
	});
	setupRouterSsrQueryIntegration({ router, queryClient });
	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
