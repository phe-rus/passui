import { ComponentNotFound, getEntry } from "@/domains/catalog"
import { componentSearchSchema } from "@/domains/settings"
import { createFileRoute, notFound, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_site/_docs/components/$slug")({
    validateSearch: componentSearchSchema,
    beforeLoad: ({ params, search, location }) => {
        if (!getEntry(params.slug)) throw notFound()
        throw redirect({
            to: "/components/react/$slug",
            params: { slug: params.slug },
            search,
            hash: location.hash,
            replace: true,
        })
    },
    notFoundComponent: ComponentNotFound,
})
