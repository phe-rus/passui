import handler from "@tanstack/react-start/server-entry";
import { withSiteHeaders } from "@/lib/headers";

export default {
	async fetch(request: Request) {
		return withSiteHeaders(await handler.fetch(request));
	},
};
