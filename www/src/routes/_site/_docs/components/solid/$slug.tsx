import { getEntry } from "@/domains/catalog/get-catalog"
import { hasSolidComponent } from "@passui/solid/docs"
import { SolidComponentPage } from "@/domains/framework/views/solid-component-page"
import { getPageHead } from "@/domains/seo/get-page-head"
import {
    createFileRoute,
    notFound,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/components/solid/$slug"
)({
    loader: ({ params }) => {
        if (
            !getEntry(params.slug) ||
            !hasSolidComponent(params.slug)
        )
            throw notFound()
    },
    head: ({ params }) =>
        getPageHead(
            `/components/solid/${params.slug}`,
            `${getEntry(params.slug)?.docs.name ?? "Not found"} · SolidJS · Passui`,
            getEntry(params.slug)?.content.summary ?? ""
        ),
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    return <SolidComponentPage key={slug} slug={slug} />
}
