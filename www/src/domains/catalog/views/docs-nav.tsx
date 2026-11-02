import { Accordion } from "@passui/react/accordion"
import { SidebarItemContent, SidebarSection, sidebarItemClass } from "@passui/react/sidebar"
import { cn } from "@passui/react/cn"
import { Link, useLocation } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { guides } from "@/domains/guides/get-guides"
import { catalogGroups, getCatalog } from "../get-catalog"
import { componentTitle } from "../navigation"
import type { CatalogGroup } from "../types"

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

/** Quiet navigation rows with room for long component names. */
function rowClass(active: boolean) {
    return cn(sidebarItemClass(active), "h-8 rounded-lg px-3 py-0 text-footnote")
}

/** Every guide and component, by group; the sidebar and the phone sheet share it. */
function currentGroup(pathname: string) {
    const slug = pathname.match(/\/components\/(?:(?:react|solid)\/)?([^/]+)$/)?.[1]
    return getCatalog().find((entry) => entry.docs.slug === slug)?.group
}

export function DocsNav() {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const navigation = useRef<HTMLElement>(null)
    const [expanded, setExpanded] = useState<CatalogGroup | null | undefined>(undefined)
    const catalog = getCatalog()
    const activeGroup = currentGroup(pathname)

    useEffect(() => {
        let saved: CatalogGroup | null = null
        try {
            const stored = localStorage.getItem("passui-docs-group-v3")
            if (stored && catalogGroups.includes(stored as CatalogGroup))
                saved = stored as CatalogGroup
        } catch {
            /* Navigation also works when storage is unavailable. */
        }
        const active = currentGroup(pathname)
        setExpanded(active ?? saved)
    }, [pathname])

    useEffect(() => {
        if (activeGroup && (expanded ?? activeGroup) !== activeGroup) return
        const frame = requestAnimationFrame(() => {
            const scroller = navigation.current?.closest<HTMLElement>("[data-docs-scroller]")
            if (scroller) revealActive(scroller)
        })
        return () => cancelAnimationFrame(frame)
    }, [activeGroup, expanded])

    function toggle(group: CatalogGroup | null) {
        setExpanded(group)
        try {
            if (group) localStorage.setItem("passui-docs-group-v3", group)
            else localStorage.removeItem("passui-docs-group-v3")
        } catch {
            /* Keep the current session usable. */
        }
    }

    const groups = catalogGroups
        .map((group) => ({
            group,
            entries: catalog.filter((entry) => entry.group === group),
        }))
        .filter(({ entries }) => entries.length > 0)

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
                                    activeProps={{ className: rowClass(true) }}
                                    inactiveProps={{ className: rowClass(false) }}
                                >
                                    {({ isActive }) => (
                                        <SidebarItemContent
                                            active={isActive}
                                            icon={<guide.icon size={16} />}
                                        >
                                            {guide.title}
                                        </SidebarItemContent>
                                    )}
                                </Link>
                            </li>
                        ))}
                </ul>
            </SidebarSection>
            <SidebarSection title="Components">
                <Accordion
                    value={expanded ?? activeGroup ?? null}
                    onValueChange={(group) => toggle(group as CatalogGroup | null)}
                    className="overflow-hidden rounded-xl"
                    items={groups.map(({ group, entries }) => ({
                        value: group,
                        title: group,
                        content: (
                            <ul className="m-0 ms-1 flex list-none flex-col gap-0.5 border-s border-separator/60 p-0 ps-1">
                                {entries.map((entry) => (
                                    <li key={entry.docs.slug}>
                                        <Link
                                            to="/components/react/$slug"
                                            params={{ slug: entry.docs.slug }}
                                            activeOptions={{ includeSearch: false }}
                                            activeProps={{ className: rowClass(true) }}
                                            inactiveProps={{ className: rowClass(false) }}
                                        >
                                            {({ isActive }) => (
                                                <SidebarItemContent
                                                    active={isActive}
                                                    icon={<entry.icon size={16} />}
                                                >
                                                    {componentTitle(entry)}
                                                </SidebarItemContent>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ),
                    }))}
                />
            </SidebarSection>
        </nav>
    )
}
