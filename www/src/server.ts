import handler from "@tanstack/react-start/server-entry";

export default {
	async fetch(request: Request) {
		const response = await handler.fetch(request);
		const preview = new URL(request.url).pathname.startsWith("/preview/");
		if (!preview && response.status !== 404) return response;
		const headers = new Headers(response.headers);
		headers.set("X-Robots-Tag", "noindex, nofollow");
		if (preview) {
			headers.set("Content-Security-Policy", "frame-ancestors 'self'");
		} else {
			// Allow what the docs site needs: inline scripts (TanStack Start),
			// inline styles (Tailwind v4), self connections, data URIs for
			// avatars and SVG noise, and Google Fonts for the serif/mono
			// families used in code blocks.
			headers.set(
				"Content-Security-Policy",
				[
					"default-src 'self'",
					"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
					"style-src 'self' 'unsafe-inline'",
					"connect-src 'self'",
					"img-src 'self' data: https:",
					"font-src 'self' data:",
					"frame-ancestors 'none'",
					"base-uri 'self'",
					"object-src 'none'",
				].join("; "),
			);
		}
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	},
};
