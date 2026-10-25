export const siteOrigin = "https://passui.pherus.org"

/** Settings change the playground, never the identity of a docs page. */
export function pageUrl(path: string) {
    const pathname = path.split(/[?#]/)[0].replace(/\/+$/, "")
    return `${siteOrigin}${pathname || "/"}`
}
