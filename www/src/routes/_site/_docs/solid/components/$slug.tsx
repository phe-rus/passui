import { getEntry } from "@/domains/catalog/get-catalog"
import { hasSolidComponent } from "@passui/solid/docs"
import { SolidComponentPage } from "@/domains/framework/views/solid-component-page"
import { getPageHead } from "@/domains/seo/get-page-head"
import {
    createFileRoute,
    notFound,
    redirect,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/solid/components/$slug"
)({
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/components/solid/$slug",
            params: { slug: params.slug },
            replace: true,
        })
    },
    loader: ({ params }) => {
        if (!getEntry(params.slug)) throw notFound()
    },
    head: ({ params }) => {
        const head = getPageHead(
            `/solid/components/${params.slug}`,
            `${getEntry(params.slug)?.docs.name ?? "Not found"} · SolidJS · Passui`,
            getEntry(params.slug)?.content.summary ?? ""
        )
        return {
            ...head,
            meta: [
                ...head.meta,
                ...(!hasSolidComponent(params.slug)
                    ? [
                          {
                              name: "robots",
                              content: "noindex, follow",
                          },
                      ]
                    : []),
            ],
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    return <SolidComponentPage key={slug} slug={slug} />
}
