import { getSolidLlmsTxt } from "@/domains/ai-context"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/solid/llms.txt")({
    server: {
        handlers: {
            GET: ({ request }) =>
                new Response(
                    getSolidLlmsTxt(
                        new URL(request.url).origin
                    ),
                    {
                        headers: {
                            "content-type":
                                "text/plain; charset=utf-8",
                        },
                    }
                ),
        },
    },
})
