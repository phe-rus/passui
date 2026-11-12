/** The docs site's response headers, kept apart from the Worker entry so each policy is readable and testable. */

/** Hosts the page loads from: this origin only, since the site ships no remote fonts or scripts. */
const sources = {
	styles: ["'self'", "'unsafe-inline'"],
	fonts: ["'self'", "data:"],
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

export const noindexHeader = "noindex, nofollow";
