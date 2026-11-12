import { expect, it } from "vitest";
import {
	contentSecurityPolicy,
	noindexHeader,
	securityHeaders,
} from "../src/lib/headers";

it("allows nothing off origin for scripts, styles and fonts", () => {
	const csp = contentSecurityPolicy();
	expect(csp).toContain("font-src 'self' data:");
	expect(csp).toContain("style-src 'self' 'unsafe-inline'");
	expect(csp).not.toContain("googleapis");
	expect(csp).toContain("frame-ancestors 'none'");
});

it("carries the security headers every response needs", () => {
	expect(securityHeaders["X-Frame-Options"]).toBe("DENY");
	expect(securityHeaders["X-Content-Type-Options"]).toBe("nosniff");
	expect(securityHeaders["Content-Security-Policy"]).toContain(
		"object-src 'none'",
	);
});

it("marks missing pages noindex", () => {
	expect(noindexHeader).toBe("noindex, nofollow");
});
