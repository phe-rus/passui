import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import {
    DefaultBoundary,
    NotFound,
} from "@passui/tanstack/route-boundary"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
    return createTanStackRouter({
        routeTree,
        scrollRestoration: true,
        // the page scrolls inside <main> (ComposeViewport fixes <body>),
        // so a new page must reset that, not the window
        scrollToTopSelectors: ["main"],
        defaultPreload: "intent",
        defaultErrorComponent: DefaultBoundary,
        defaultNotFoundComponent: () => <NotFound />,
    })
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof getRouter>
    }
}
