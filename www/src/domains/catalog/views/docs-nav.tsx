import { Button } from "@passui/react/button"
import { ChevronDownIcon } from "@passui/react/icons"
import { SidebarItemContent, SidebarSection, sidebarItemClass } from "@passui/react/sidebar"
import { cn } from "@passui/react/cn"
import { Link, useLocation } from "@tanstack/react-router"
import { useEffect, useId, useRef, useState } from "react"
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
    const id = useId()
    const navigation = useRef<HTMLElement>(null)
    const [expanded, setExpanded] = useState<Partial<Record<CatalogGroup, boolean>>>({})
    const catalog = getCatalog()
    const activeGroup = currentGroup(pathname)

    useEffect(() => {
        const saved: Partial<Record<CatalogGroup, boolean>> = {}
        try {
            const stored: unknown = JSON.parse(localStorage.getItem("passui-docs-groups") ?? "{}")
            if (stored && typeof stored === "object") {
                for (const group of catalogGroups) {
                    const value = Reflect.get(stored, group)
                    if (typeof value === "boolean") saved[group] = value
                }
            }
        } catch {
            /* Navigation also works when storage is unavailable. */
        }
        const active = currentGroup(pathname)
        if (active) saved[active] = true
        setExpanded(saved)
    }, [pathname])

    useEffect(() => {
        if (activeGroup && expanded[activeGroup] === false) return
        const frame = requestAnimationFrame(() => {
            const scroller = navigation.current?.closest("aside")
            if (scroller) revealActive(scroller)
        })
        return () => cancelAnimationFrame(frame)
    }, [activeGroup, expanded])

    function toggle(group: CatalogGroup, open: boolean) {
        const next = { ...expanded, [group]: !open }
        setExpanded(next)
        try {
            localStorage.setItem("passui-docs-groups", JSON.stringify(next))
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
        <nav ref={navigation} aria-label="Docs" className="flex flex-col gap-1">
            <SidebarSection title="Getting started">
                {guides.map((guide) => (
                    <Link
                        key={guide.slug}
                        to={guide.path}
                        // the overview is /components, not every component page
                        activeOptions={{
                            exact: true,
                            includeSearch: false,
                        }}
                    >
                        {({ isActive }) => (
                            <span className={rowClass(isActive)}>
                                <SidebarItemContent
                                    active={isActive}
                                    icon={<guide.icon size={16} />}
                                >
                                    {guide.title}
                                </SidebarItemContent>
                            </span>
                        )}
                    </Link>
                ))}
            </SidebarSection>
            {groups.map(({ group, entries }, index) => {
                const open = expanded[group] ?? true
                const panelId = `${id}-group-${index}`
                return (
                    <div key={group} className="flex flex-col gap-0.5">
                        <Button
                            variant="ghost"
                            size="xs"
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() => toggle(group, open)}
                            className="w-full justify-start rounded-lg px-2.5 text-caption font-semibold text-label-secondary [&>span]:w-full"
                        >
                            <span className="grow">{group}</span>
                            <ChevronDownIcon
                                size={13}
                                className={cn(
                                    "shrink-0 transition-transform duration-fast",
                                    "motion-reduce:transition-none",
                                    !open && "-rotate-90"
                                )}
                            />
                        </Button>
                        <div
                            id={panelId}
                            hidden={!open}
                            className="ms-4 border-s border-separator/60 ps-1"
                        >
                            {entries.map(({ docs, icon: Icon }) => (
                                <Link
                                    key={docs.slug}
                                    to="/components/react/$slug"
                                    params={{
                                        slug: docs.slug,
                                    }}
                                    // the address carries settings and props; match the page alone
                                    activeOptions={{
                                        includeSearch: false,
                                    }}
                                    className="block min-w-0"
                                >
                                    {({ isActive }) => (
                                        <span className={rowClass(isActive)}>
                                            <SidebarItemContent
                                                active={isActive}
                                                icon={<Icon size={12} />}
                                            >
                                                {componentTitle({ docs })}
                                            </SidebarItemContent>
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            })}
        </nav>
    )
}
