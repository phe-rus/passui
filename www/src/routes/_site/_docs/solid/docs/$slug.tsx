import { SolidGuidePage } from "@/domains/framework/views/solid-guide-page"
import { solidGuideSummaries } from "@/domains/framework/solid-guides"
import { getGuide } from "@/domains/guides/get-guides"
import { getPageHead } from "@/domains/seo/get-page-head"
import {
    createFileRoute,
    notFound,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/solid/docs/$slug"
)({
    loader: ({ params }) => {
        if (!getGuide(params.slug)) throw notFound()
    },
    head: ({ params }) => {
        const guide = getGuide(params.slug)
        return getPageHead(
            `/solid/docs/${params.slug}`,
            `${guide?.title ?? "Not found"} · SolidJS · Passui`,
            guide ? solidGuideSummaries[guide.slug] : ""
        )
    },
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    return <SolidGuidePage key={slug} slug={slug} />
}
