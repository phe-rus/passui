export default {
    async fetch(request: Request): Promise<Response> {
        const target = new URL(request.url)
        if (target.hostname !== "hino.pherus.org")
            return new Response("Not found", { status: 404 })
        target.protocol = "https:"
        target.hostname = "passui.pherus.org"
        target.port = ""
        if (target.pathname === "/skills/hino/SKILL.md")
            target.pathname = "/skills/passui/SKILL.md"
        return Response.redirect(target.toString(), 308)
    },
} satisfies ExportedHandler<Env>
