import { createServerFn } from "@tanstack/react-start";

/** Highlights on the server, so client navigations receive only HTML. */
export const getDocCode = createServerFn({ method: "GET" })
	.validator((input: { slug: string; entry: string }) => input)
	.handler(async ({ data }) => {
		const { highlightDoc } = await import("./highlight.server");
		return highlightDoc(data.slug, data.entry);
	});
