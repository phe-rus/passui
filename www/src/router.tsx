import { DefaultBoundary, NotFound } from "@passui/tanstack/route-boundary";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	return createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		// The page scrolls inside <main> (ComposeViewport fixes <body>).
		scrollToTopSelectors: ["main"],
		defaultPreload: "intent",
		defaultErrorComponent: DefaultBoundary,
		defaultNotFoundComponent: () => <NotFound />,
	});
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
