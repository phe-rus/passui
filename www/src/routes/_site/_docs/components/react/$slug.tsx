import { getPageHead } from "@/domains/seo/get-page-head"
import { ComponentNotFound } from "@/domains/catalog/views/component-not-found"
import { ComponentPage } from "@/domains/catalog/views/component-page"
import { getNavigationEntry } from "@/domains/catalog/get-navigation"
import { componentSearchSchema } from "@/domains/settings"
import { createFileRoute, notFound, stripSearchParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_site/_docs/components/react/$slug")({
    validateSearch: componentSearchSchema,
    search: {
        middlewares: [stripSearchParams({ props: {} })],
    },
    loader: ({ params }) => {
        if (!getNavigationEntry(params.slug)) throw notFound()
    },
    head: ({ params }) =>
        getPageHead(
            `/components/react/${params.slug}`,
            `${getNavigationEntry(params.slug)?.docs.name ?? "Not found"} · React · Passui`,
            getNavigationEntry(params.slug)?.content.summary ?? ""
        ),
    notFoundComponent: ComponentNotFound,
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    const { props, ...settings } = Route.useSearch()
    return <ComponentPage key={slug} slug={slug} settings={settings} rawProps={props} />
}
