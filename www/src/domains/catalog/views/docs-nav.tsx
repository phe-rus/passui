import { SidebarItemContent, SidebarSection, sidebarItemClass } from "@passui/react/sidebar"
import { Link, useLocation } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import { guides } from "@/domains/guides/get-guides"
import { getNavigationCatalog } from "../get-navigation"
import { componentTitle } from "../navigation"

/**
 * Brings the current page's row into view inside the sidebar, which
 * scrolls on its own. Only the sidebar moves, never the page.
 */
export function revealActive(scroller: HTMLElement) {
    const row = scroller.querySelector<HTMLElement>('[aria-current="page"]')
    if (!row || scroller.scrollHeight <= scroller.clientHeight) return
    const item = row.getBoundingClientRect()
    const box = scroller.getBoundingClientRect()
    if (item.top < box.top || item.bottom > box.bottom)
        scroller.scrollTop += item.top - box.top - (box.height - item.height) / 2
}

/** One alphabetical list, shared by the desktop rail and phone sheet. */
export function DocsNav() {
    const pathname = useLocation({ select: (location) => location.pathname })
    const navigation = useRef<HTMLElement>(null)
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const scroller = navigation.current?.closest<HTMLElement>("[data-docs-scroller]")
            if (pathname && scroller) revealActive(scroller)
        })
        return () => cancelAnimationFrame(frame)
    }, [pathname])
    return (
        <nav ref={navigation} aria-label="Docs" className="flex flex-col gap-6">
            <SidebarSection title="Getting started">
                <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                    {guides
                        .filter((guide) => guide.slug !== "components")
                        .map((guide) => (
                            <li key={guide.slug}>
                                <Link
                                    to={guide.path}
                                    activeOptions={{ exact: true, includeSearch: false }}
                                    activeProps={{ className: sidebarItemClass(true, "compact") }}
                                    inactiveProps={{
                                        className: sidebarItemClass(false, "compact"),
                                    }}
                                >
                                    <SidebarItemContent>{guide.title}</SidebarItemContent>
                                </Link>
                            </li>
                        ))}
                </ul>
            </SidebarSection>
            <SidebarSection title="Components">
                <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
                    {getNavigationCatalog().map((entry) => (
                        <li key={entry.docs.slug}>
                            <Link
                                to="/components/react/$slug"
                                params={{ slug: entry.docs.slug }}
                                activeOptions={{ includeSearch: false }}
                                activeProps={{ className: sidebarItemClass(true, "compact") }}
                                inactiveProps={{ className: sidebarItemClass(false, "compact") }}
                            >
                                <SidebarItemContent>{componentTitle(entry)}</SidebarItemContent>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SidebarSection>
        </nav>
    )
}
