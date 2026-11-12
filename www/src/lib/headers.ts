/** Response headers for the docs site, kept apart from the Worker entry so each policy is readable and testable. */

/** Hosts the page legitimately loads from. Fonts come from Google, everything else from this origin. */
const sources = {
	styles: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
	fonts: ["'self'", "data:", "https://fonts.gstatic.com"],
	images: ["'self'", "data:", "https:"],
	// TanStack Start hydrates through inline scripts.
	scripts: ["'self'", "'unsafe-inline'"],
} as const;

/** The site's Content-Security-Policy as one header value. */
export function contentSecurityPolicy() {
	return [
		"default-src 'self'",
		`script-src ${sources.scripts.join(" ")}`,
		`style-src ${sources.styles.join(" ")}`,
		`font-src ${sources.fonts.join(" ")}`,
		`img-src ${sources.images.join(" ")}`,
		"connect-src 'self'",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"object-src 'none'",
	].join("; ");
}

/** Headers every HTML and API response carries. */
export const securityHeaders = {
	"Content-Security-Policy": contentSecurityPolicy(),
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
} as const;

/** Missing pages must not be indexed, whatever the router rendered. */
export const noindexHeader = "noindex, nofollow";

/** Copies a response with the site's headers applied, marking 404s noindex. */
export function withSiteHeaders(response: Response) {
	const headers = new Headers(response.headers);
	for (const [name, value] of Object.entries(securityHeaders))
		headers.set(name, value);
	if (response.status === 404) headers.set("X-Robots-Tag", noindexHeader);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
