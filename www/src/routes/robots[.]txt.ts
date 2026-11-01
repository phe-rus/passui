import { getRobots, discoveryHeaders } from "@/domains/seo/sitemap"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/robots.txt")({
    server: {
        handlers: {
            GET: () =>
                new Response(getRobots(), {
                    headers: {
                        ...discoveryHeaders,
                        "Content-Type": "text/plain; charset=utf-8",
                    },
                }),
        },
    },
})
