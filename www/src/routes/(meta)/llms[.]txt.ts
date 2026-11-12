import { createFileRoute } from "@tanstack/react-router";
import { getLlmsTxt } from "@/features/ai/ai-context";

export const Route = createFileRoute("/(meta)/llms.txt")({
	server: {
		handlers: {
			GET: () =>
				new Response(getLlmsTxt(), {
					headers: { "content-type": "text/plain; charset=utf-8" },
				}),
		},
	},
});
