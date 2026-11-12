import handler from "@tanstack/react-start/server-entry";
import { noindexHeader, securityHeaders } from "@/lib/headers";

export type RequestContext = {
	env: Cloudflare.Env;
	waitUntil: (promise: Promise<unknown>) => void;
	passThroughOnException: () => void;
};

declare module "@tanstack/react-start" {
	interface Register {
		server: RequestContext;
	}
}

export default {
	async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext) {
		const response = await handler.fetch(request, {
			context: {
				// @ts-expect-error - Cloudflare's Env type doesn't match TanStack Start's context shape
				env,
				waitUntil: ctx.waitUntil.bind(ctx),
				passThroughOnException: ctx.passThroughOnException.bind(ctx),
			},
		});
		const headers = new Headers(response.headers);
		for (const [name, value] of Object.entries(securityHeaders))
			headers.set(name, value);
		// Missing pages must not be indexed, whatever the router rendered.
		if (response.status === 404) headers.set("X-Robots-Tag", noindexHeader);
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	},
};
