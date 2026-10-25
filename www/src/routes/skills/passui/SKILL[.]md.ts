import { getSkillMarkdown } from "@/domains/ai-context"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
    "/skills/passui/SKILL.md"
)({
    server: {
        handlers: {
            GET: ({ request }) =>
                new Response(
                    getSkillMarkdown(
                        new URL(request.url).origin
                    ),
                    {
                        headers: {
                            "content-type":
                                "text/markdown; charset=utf-8",
                        },
                    }
                ),
        },
    },
})
