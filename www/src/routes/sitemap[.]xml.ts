import { getSitemap, discoveryHeaders } from "@/domains/seo/sitemap";
import { createFileRoute } from "@tanstack/react-router";

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
