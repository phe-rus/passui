import {
    ComponentNotFound,
    getEntry,
} from "@/domains/catalog"
import { PreviewPage } from "@/domains/preview"
import {
    previewSearchSchema,
    settingsDefaults,
} from "@/domains/settings"
import {
    createFileRoute,
    notFound,
    stripSearchParams,
} from "@tanstack/react-router"

export const Route = createFileRoute("/preview/$slug")({
    validateSearch: previewSearchSchema,
    search: {
        middlewares: [
            stripSearchParams({
                ...settingsDefaults,
                props: {},
                scene: "component",
            }),
        ],
    },
    loader: ({ params }) => {
        if (!getEntry(params.slug)) throw notFound()
    },
    head: () => ({
        meta: [
            { title: "Preview · Passui" },
            { name: "robots", content: "noindex, nofollow" },
        ],
    }),
    notFoundComponent: ComponentNotFound,
    component: RouteComponent,
})

function RouteComponent() {
    const { slug } = Route.useParams()
    const { props, scene, ...settings } = Route.useSearch()
    return (
        <PreviewPage
            slug={slug}
            settings={settings}
            props={props}
            scene={scene}
        />
    )
}
