import { pageUrl, siteOrigin } from "./site";

const section = (pathname: string) =>
	pathname.startsWith("/docs/components/")
		? { name: "Components", path: "/docs/components" }
		: pathname.startsWith("/docs/")
			? { name: "Docs", path: "/docs/introduction" }
			: null;

/** Title, description, canonical link, social cards and JSON LD for one page. */
export function getPageHead(path: string, title: string, description: string) {
	const url = pageUrl(path);
	const image = `${siteOrigin}/favicon.png`;
	const pathname = new URL(url).pathname;
	const parent = section(pathname);
	const crumbs = [
		{ name: "Passui", path: "/" },
		...(parent && parent.path !== pathname ? [parent] : []),
		...(pathname !== "/"
			? [{ name: title.replace(/ · Passui$/, ""), path: pathname }]
			: []),
	];
	const graph = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": `${siteOrigin}/#website`,
				name: "Passui",
				url: `${siteOrigin}/`,
				inLanguage: "en",
			},
			{
				"@type": "WebPage",
				"@id": url,
				url,
				name: title,
				description,
				inLanguage: "en",
				isPartOf: { "@id": `${siteOrigin}/#website` },
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: crumbs.map((crumb, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: crumb.name,
					item: pageUrl(crumb.path),
				})),
			},
		],
	};
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "Passui" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: image },
		],
		links: [{ rel: "canonical", href: url }],
		scripts: [
			{
				type: "application/ld+json",
				// `<` is escaped so the JSON can never close its own script tag.
				children: JSON.stringify(graph).replace(/</g, "\\u003c"),
			},
		],
	};
}
