import { createServerFn } from "@tanstack/react-start";

const HOUR = 60 * 60 * 1000;
let cached: { at: number; count: number | null } | undefined;

/**
 * The repository's star count, read on the server and kept for an hour so the
 * site makes at most one request an hour. Returns null when GitHub does not
 * answer, and the header then shows the link without a number.
 */
export const getStars = createServerFn({ method: "GET" }).handler(async () => {
	if (cached && Date.now() - cached.at < HOUR) return cached.count;
	let count: number | null = null;
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
		if (response.ok) {
			const body = (await response.json()) as { stargazers_count?: unknown };
			if (typeof body.stargazers_count === "number")
				count = body.stargazers_count;
		}
	} catch {
		// A slow or unreachable API must never break a page.
	}
	cached = { at: Date.now(), count };
	return count;
});
