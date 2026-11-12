import { DefaultBoundary, NotFound } from "@passui/tanstack/route-boundary";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
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
