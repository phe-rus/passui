import { registry } from "@/features/catalog/registry";
import { guides } from "@/features/docs/lib/get-guides";
import { pageUrl, siteOrigin } from "./site";

const escapeXml = (value: string) =>
	value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function getSitemapPaths() {
	return [
		...new Set([
			"/",
			"/templates",
			"/themes",
			"/playground",
			...guides.map((guide) => guide.path),
			"/docs/components",
			...registry.map((doc) => `/docs/components/${doc.slug}`),
		]),
	];
}

export function getSitemap() {
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...getSitemapPaths().map(
			(p) => `  <url><loc>${escapeXml(pageUrl(p))}</loc></url>`,
		),
		"</urlset>",
	].join("\n");
}

export const getRobots = () =>
	`User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;

export const discoveryHeaders = {
	"Cache-Control": "public, max-age=3600",
	"X-Content-Type-Options": "nosniff",
};
