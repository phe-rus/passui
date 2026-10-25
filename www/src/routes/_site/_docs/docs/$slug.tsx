import { getPageHead } from "@/domains/seo/get-page-head"
import { ComponentNotFound } from "@/domains/catalog"
import { GuidePage, getGuide } from "@/domains/guides"
import {
    createFileRoute,
    notFound,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/docs/$slug"
)({
    loader: ({ params }) => {
        if (!getGuide(params.slug)) throw notFound()
    },
    head: ({ params }) =>
        getPageHead(
            `/docs/${params.slug}`,
            `${getGuide(params.slug)?.title ?? "Not found"} · Passui`,
            getGuide(params.slug)?.summary ?? ""
        ),
    notFoundComponent: ComponentNotFound,
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    // a fresh page per guide: folds and local state start over
    return <GuidePage key={slug} slug={slug} />
}
