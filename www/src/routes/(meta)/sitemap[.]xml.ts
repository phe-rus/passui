import { createFileRoute } from "@tanstack/react-router";
import { discoveryHeaders, getSitemap } from "@/features/seo/sitemap";

export const Route = createFileRoute("/(meta)/sitemap.xml")({
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
