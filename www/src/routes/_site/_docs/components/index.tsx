import { getPageHead } from "@/domains/seo/get-page-head"
import { ComponentsOverview } from "@/domains/catalog"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/components/"
)({
    head: () =>
        getPageHead(
            "/components",
            "Components · Passui",
            "Every Passui control, grouped by what it does, each with a live playground."
        ),
    component: RouteComponent,
})

function RouteComponent() {
    return <ComponentsOverview />
}
