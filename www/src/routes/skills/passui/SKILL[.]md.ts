import { createFileRoute } from "@tanstack/react-router";
import { getSkill } from "@/features/ai/ai-context";

export const Route = createFileRoute("/skills/passui/SKILL.md")({
	server: {
		handlers: {
			GET: () =>
				new Response(getSkill(), {
					headers: { "content-type": "text/markdown; charset=utf-8" },
				}),
		},
	},
});
