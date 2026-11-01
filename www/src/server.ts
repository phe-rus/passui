import handler from "@tanstack/react-start/server-entry"

export default {
    async fetch(request: Request) {
        const response = await handler.fetch(request)
        const preview = new URL(request.url).pathname.startsWith("/preview/")
        if (!preview && response.status !== 404) return response
        const headers = new Headers(response.headers)
        headers.set("X-Robots-Tag", "noindex, nofollow")
        if (preview) headers.set("Content-Security-Policy", "frame-ancestors 'self'")
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
        })
    },
}
