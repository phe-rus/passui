import { createFileRoute } from "@tanstack/react-router";
import { discoveryHeaders, getSitemap } from "@/features/seo/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(getSitemap(), {
					headers: {
						...discoveryHeaders,
						"Content-Type": "application/xml; charset=utf-8",
					},
				}),
		},
	},
});
