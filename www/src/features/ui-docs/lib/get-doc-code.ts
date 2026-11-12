import { createServerFn } from "@tanstack/react-start";

/**
 * Highlights on the server. The handler body is removed from the browser
 * build, so Shiki never ships to visitors; client navigations receive only HTML.
 */
export const getDocCode = createServerFn({ method: "GET" })
	.validator((slug: string) => slug)
	.handler(async ({ data }) => {
		const { highlightDoc } = await import("./highlight");
		return highlightDoc(data);
	});
