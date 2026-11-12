import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

const HOUR = 60 * 60 * 1000;

/**
 * The repository's star count, read on the server. Returns null when GitHub
 * does not answer, and the header then shows the link without a number.
 */
export const getStars = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const response = await fetch(
			"https://api.github.com/repos/phe-rus/passui",
			{
				headers: {
					accept: "application/vnd.github+json",
					"user-agent": "passui-website",
				},
				signal: AbortSignal.timeout(2500),
			},
		);
		if (!response.ok) return null;
		const body = (await response.json()) as { stargazers_count?: unknown };
		return typeof body.stargazers_count === "number"
			? body.stargazers_count
			: null;
	} catch {
		// A slow or unreachable API must never break a page.
		return null;
	}
});

/** Fresh for an hour, so the site asks GitHub at most once an hour per visitor. */
export const starsQuery = queryOptions({
	queryKey: ["github", "stars"],
	queryFn: () => getStars(),
	staleTime: HOUR,
});
