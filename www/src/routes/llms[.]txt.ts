import { createFileRoute } from "@tanstack/react-router";
import { getLlmsTxt } from "@/features/ai/lib/get-ai-context";

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
