import { SolidComponentsPage } from "@/domains/framework/views/solid-components-page"
import { getPageHead } from "@/domains/seo/get-page-head"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/solid/components/"
)({
    head: () =>
        getPageHead(
            "/solid/components",
            "Components · SolidJS · Passui",
            "Native SolidJS component coverage, examples and implementation status."
        ),
    component: RouteComponent,
})

function RouteComponent() {
    return <SolidComponentsPage />
}
