import {
    createFileRoute,
    redirect,
} from "@tanstack/react-router"

export const Route = createFileRoute(
    "/_site/_docs/solid/components/"
)({
    beforeLoad: () => {
        throw redirect({ to: "/components", replace: true })
    },
})
