import type { QueryClient } from "@tanstack/react-query";

/** What every route can read from `context`: the one query client for the app. */
export interface RouterContext {
	queryClient: QueryClient;
}
