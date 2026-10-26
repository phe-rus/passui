import { pageUrl, siteOrigin } from "./site"

export function getPageHead(
    path: string,
    title: string,
    description: string
) {
    const url = pageUrl(path)
    const image = `${siteOrigin}/favicon.png`
    const pathname = new URL(url).pathname
    const solid =
        pathname.startsWith("/solid/") ||
        pathname.startsWith("/components/solid/")
    const section =
        pathname.startsWith("/components/") ||
        pathname.startsWith("/solid/components/")
            ? {
                  name: "Components",
                  path: "/components",
              }
            : null
    const crumbs = [
        { name: "Passui", path: "/" },
        ...(solid
            ? [
                  {
                      name: "SolidJS",
                      path: "/solid/docs/introduction",
                  },
              ]
            : []),
        ...(section && section.path !== pathname
            ? [section]
            : []),
        ...(pathname !== "/"
            ? [
                  {
                      name: title.replace(/ · Passui$/, ""),
                      path: pathname,
                  },
              ]
            : []),
    ]
    return {
        meta: [
            { title },
            { name: "description", content: description },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "Passui" },
            { property: "og:locale", content: "en_US" },
            { property: "og:title", content: title },
            {
                property: "og:description",
                content: description,
            },
            { property: "og:url", content: url },
            { property: "og:image", content: image },
            {
                property: "og:image:alt",
                content: "Passui logo",
            },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:title", content: title },
            {
                name: "twitter:description",
                content: description,
            },
            { name: "twitter:image", content: image },
            {
                name: "twitter:image:alt",
                content: "Passui logo",
            },
        ],
        links: [{ rel: "canonical", href: url }],
        scripts: [
            {
                type: "application/ld+json",
                children: JSON.stringify({
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
                            isPartOf: {
                                "@id": `${siteOrigin}/#website`,
                            },
                        },
                        {
                            "@type": "BreadcrumbList",
                            itemListElement: crumbs.map(
                                (crumb, index) => ({
                                    "@type": "ListItem",
                                    position: index + 1,
                                    name: crumb.name,
                                    item: pageUrl(crumb.path),
                                })
                            ),
                        },
                        ...(pathname === "/"
                            ? [
                                  {
                                      "@type":
                                          "SoftwareSourceCode",
                                      name: "Passui",
                                      description,
                                      url,
                                      codeRepository:
                                          "https://github.com/phe-rus/passui",
                                      programmingLanguage:
                                          "TypeScript",
                                      license:
                                          "https://github.com/phe-rus/passui/blob/main/LICENSE",
                                  },
                              ]
                            : []),
                    ],
                }).replace(/</g, "\\u003c"),
            },
        ],
    }
}
