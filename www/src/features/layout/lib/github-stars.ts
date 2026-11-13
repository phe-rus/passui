import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

const DAY = 24 * 60 * 60 * 1000;
const REPO_URL = "https://api.github.com/repos/phe-rus/passui";
/** A synthetic key: the edge cache stores one shared answer for every visitor. */
const CACHE_KEY = "https://passui.pherus.org/__cache/github-stars";
const FOUND_SECONDS = 24 * 60 * 60;
/** A failed lookup is remembered briefly so a rate limit is not hammered. */
const MISSED_SECONDS = 5 * 60;

function edgeCache(): Cache | null {
	// `caches.default` exists on Workers only; local dev and tests have none.
	return typeof caches === "undefined"
		? null
		: ((caches as unknown as { default?: Cache }).default ?? null);
}

async function readFromGitHub(): Promise<number | null> {
	try {
		const response = await fetch(REPO_URL, {
			headers: {
				accept: "application/vnd.github+json",
				"user-agent": "passui-website",
			},
			signal: AbortSignal.timeout(2500),
		});
		if (!response.ok) return null;
		const body = (await response.json()) as { stargazers_count?: unknown };
		return typeof body.stargazers_count === "number"
			? body.stargazers_count
			: null;
	} catch {
		// A slow or unreachable API must never break a page.
		return null;
	}
}

/**
 * The repository's star count, read on the server and shared through the
 * edge cache, so GitHub's unauthenticated rate limit is asked about once a
 * day for everyone, not once per visitor. Returns null when GitHub does not
 * answer, and the header then shows the link without a number.
 */
export const getStars = createServerFn({ method: "GET" }).handler(async () => {
	const cache = edgeCache();
	const key = new Request(CACHE_KEY);

	try {
		const hit = await cache?.match(key);
		if (hit) return ((await hit.json()) as { stars: number | null }).stars;
	} catch {
		// A broken cache falls through to a live read.
	}

	const stars = await readFromGitHub();

	try {
		await cache?.put(
			key,
			new Response(JSON.stringify({ stars }), {
				headers: {
					"content-type": "application/json",
					"cache-control": `public, max-age=${stars === null ? MISSED_SECONDS : FOUND_SECONDS}`,
				},
			}),
		);
	} catch {
		// Not being able to store the answer only costs a later lookup.
	}
	return stars;
});

/** Fresh for a day in the browser too: the count is not worth refreshing often. */
export const starsQuery = queryOptions({
	queryKey: ["github", "stars"],
	queryFn: () => getStars(),
	staleTime: DAY,
});
