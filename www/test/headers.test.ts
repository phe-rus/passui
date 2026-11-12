import { expect, it } from "vitest";
import {
	contentSecurityPolicy,
	noindexHeader,
	withSiteHeaders,
} from "../src/lib/headers";

it("allows Google Fonts and nothing else off origin for fonts and styles", () => {
	const csp = contentSecurityPolicy();
	expect(csp).toContain("font-src 'self' data: https://fonts.gstatic.com");
	expect(csp).toContain(
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	);
	expect(csp).toContain("frame-ancestors 'none'");
});

it("adds the security headers to every response", () => {
	const response = withSiteHeaders(new Response("ok"));
	expect(response.headers.get("X-Frame-Options")).toBe("DENY");
	expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
	expect(response.headers.get("X-Robots-Tag")).toBeNull();
});

it("marks missing pages noindex", () => {
	const response = withSiteHeaders(new Response("missing", { status: 404 }));
	expect(response.status).toBe(404);
	expect(response.headers.get("X-Robots-Tag")).toBe(noindexHeader);
});
