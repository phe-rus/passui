import { getPageHead } from "@/domains/seo/get-page-head"
import {
    ComponentNotFound,
    ComponentPage,
    getEntry,
} from "@/domains/catalog"
import { componentSearchSchema } from "@/domains/settings"
import {
    createFileRoute,
    notFound,
    stripSearchParams,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/components/react/$slug"
)({
    validateSearch: componentSearchSchema,
    search: {
        middlewares: [stripSearchParams({ props: {} })],
    },
    loader: ({ params }) => {
        if (!getEntry(params.slug)) throw notFound()
    },
    head: ({ params }) =>
        getPageHead(
            `/components/react/${params.slug}`,
            `${getEntry(params.slug)?.docs.name ?? "Not found"} · React · Passui`,
            getEntry(params.slug)?.content.summary ?? ""
        ),
    notFoundComponent: ComponentNotFound,
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    const { props, ...settings } = Route.useSearch()
    return (
        <ComponentPage
            key={slug}
            slug={slug}
            settings={settings}
            rawProps={props}
        />
    )
}
