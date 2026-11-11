import { getLlmsTxt } from "@/domains/ai-context";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: ({ request }) =>
				new Response(getLlmsTxt(new URL(request.url).origin), {
					headers: {
						"content-type": "text/plain; charset=utf-8",
					},
				}),
		},
	},
});
