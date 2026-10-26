import { getSolidSkillMarkdown } from "@/domains/ai-context"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
    "/skills/passui-solid/SKILL.md"
)({
    server: {
        handlers: {
            GET: ({ request }) =>
                new Response(
                    getSolidSkillMarkdown(
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
