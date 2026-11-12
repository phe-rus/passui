import { createFileRoute } from "@tanstack/react-router";
import { discoveryHeaders, getRobots } from "@/features/seo/lib/sitemap";

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
});
