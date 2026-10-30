import { Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronDownIcon } from "@passui/react/icons"
import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/react/sidebar"
import { cn } from "@passui/react/cn"
import { Sheet } from "@passui/react/sheet"
import { Link, useLocation } from "@tanstack/react-router"
import {
    type ReactNode,
    useEffect,
    useId,
    useRef,
    useState,
} from "react"
import { guides } from "@/domains/guides/get-guides"
import { frameworkPath } from "@/domains/framework/framework"
import { useDocsFramework } from "@/domains/framework/use-docs-framework"
import { FrameworkSwitcher } from "@/domains/framework/views/framework-switcher"
import { catalogGroups, getCatalog } from "../get-catalog"
import { componentTitle } from "../navigation"
import type { CatalogGroup } from "../types"

type DocsLayoutProps = {
    children: ReactNode
}

/**
 * Brings the current page's row into view inside the sidebar, which
 * scrolls on its own. Only the sidebar moves, never the page.
 */
function revealActive(scroller: HTMLElement) {
    const row = scroller.querySelector<HTMLElement>(
        '[aria-current="page"]'
    )
    if (
        !row ||
        scroller.scrollHeight <= scroller.clientHeight
    )
        return
    const item = row.getBoundingClientRect()
    const box = scroller.getBoundingClientRect()
    if (item.top < box.top || item.bottom > box.bottom)
        scroller.scrollTop +=
            item.top -
            box.top -
            (box.height - item.height) / 2
}

/** Quiet navigation rows with room for long component names. */
function rowClass(active: boolean) {
    return cn(
        sidebarItemClass(active),
        "h-8 rounded-lg px-3 py-0 text-footnote"
    )
}

/** Every guide and component, by group; the sidebar and the phone sheet share it. */
function currentGroup(pathname: string) {
    const slug = pathname.match(
        /\/components\/(?:(?:react|solid)\/)?([^/]+)$/
    )?.[1]
    return getCatalog().find(
        (entry) => entry.docs.slug === slug
    )?.group
}

function DocsNav() {
    const framework = useDocsFramework()
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const id = useId()
    const navigation = useRef<HTMLElement>(null)
    const [expanded, setExpanded] = useState<
        Partial<Record<CatalogGroup, boolean>>
    >({})
    const catalog = getCatalog()
    const activeGroup = currentGroup(pathname)

    useEffect(() => {
        const saved: Partial<Record<CatalogGroup, boolean>> =
            {}
        try {
            const stored: unknown = JSON.parse(
                localStorage.getItem("passui-docs-groups") ??
                    "{}"
            )
            if (stored && typeof stored === "object") {
                for (const group of catalogGroups) {
                    const value = Reflect.get(stored, group)
                    if (typeof value === "boolean")
                        saved[group] = value
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
        if (activeGroup && expanded[activeGroup] === false)
            return
        const frame = requestAnimationFrame(() => {
            const scroller =
                navigation.current?.closest("aside")
            if (scroller) revealActive(scroller)
        })
        return () => cancelAnimationFrame(frame)
    }, [activeGroup, expanded])

    function toggle(group: CatalogGroup, open: boolean) {
        const next = { ...expanded, [group]: !open }
        setExpanded(next)
        try {
            localStorage.setItem(
                "passui-docs-groups",
                JSON.stringify(next)
            )
        } catch {
            /* Keep the current session usable. */
        }
    }

    const groups = catalogGroups
        .map((group) => ({
            group,
            entries: catalog.filter(
                (entry) => entry.group === group
            ),
        }))
        .filter(({ entries }) => entries.length > 0)

    return (
        <nav
            ref={navigation}
            aria-label="Docs"
            className="flex flex-col gap-1"
        >
            <SidebarSection title="Getting started">
                {guides.map((guide) => (
                    <Link
                        key={guide.slug}
                        to={frameworkPath(
                            guide.path,
                            framework
                        )}
                        // the overview is /components, not every component page
                        activeOptions={{
                            exact: true,
                            includeSearch: false,
                        }}
                    >
                        {({ isActive }) => (
                            <span
                                className={rowClass(isActive)}
                            >
                                <SidebarItemContent
                                    active={isActive}
                                    icon={
                                        <HugeiconsIcon
                                            icon={guide.icon}
                                            size={16}
                                        />
                                    }
                                >
                                    {guide.title}
                                </SidebarItemContent>
                            </span>
                        )}
                    </Link>
                ))}
            </SidebarSection>
            {groups.map(({ group, entries }, index) => {
                const open =
                    expanded[group] ?? group === activeGroup
                const panelId = `${id}-group-${index}`
                return (
                    <div
                        key={group}
                        className="flex flex-col gap-0.5"
                    >
                        <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() =>
                                toggle(group, open)
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-start text-caption font-semibold text-label-secondary transition-colors hover:bg-fill/70 focus-visible:outline-2 focus-visible:outline-accent-text"
                        >
                            <ChevronDownIcon
                                size={13}
                                className={cn(
                                    "shrink-0 transition-transform duration-fast motion-reduce:transition-none",
                                    !open && "-rotate-90"
                                )}
                            />
                            <span className="grow">
                                {group}
                            </span>
                        </button>
                        <div
                            id={panelId}
                            hidden={!open}
                            className="ms-4 border-s border-separator/60 ps-1"
                        >
                            {entries.map(({ docs, icon }) => (
                                <Link
                                    key={docs.slug}
                                    to={
                                        framework === "solid"
                                            ? "/components/solid/$slug"
                                            : "/components/react/$slug"
                                    }
                                    params={{
                                        slug: docs.slug,
                                    }}
                                    // the address carries settings and props; match the page alone
                                    activeOptions={{
                                        includeSearch: false,
                                    }}
                                >
                                    {({ isActive }) => (
                                        <span
                                            className={rowClass(
                                                isActive
                                            )}
                                        >
                                            <SidebarItemContent
                                                active={
                                                    isActive
                                                }
                                                icon={
                                                    <HugeiconsIcon
                                                        icon={
                                                            icon
                                                        }
                                                        size={
                                                            16
                                                        }
                                                    />
                                                }
                                            >
                                                {componentTitle(
                                                    { docs }
                                                )}
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

/** The page being read, for the phone bar: a guide or a component. */
function currentTitle(pathname: string) {
    pathname = pathname.replace(
        /^\/components\/(react|solid)\//,
        "/components/"
    )
    pathname = pathname.replace(/^\/solid(?=\/)/, "")
    const guide = guides.find(
        (item) => item.path === pathname
    )
    if (guide) return guide.title
    const slug = pathname.split("/components/")[1]
    return (() => {
        const entry = getCatalog().find(
            (entry) => entry.docs.slug === slug
        )
        return entry ? componentTitle(entry) : "Docs"
    })()
}

/**
 * Docs pages: the sidebar beside the page on wider screens; on phones, a
 * bar naming the current page that opens the same list in a sheet.
 */
export function DocsLayout({ children }: DocsLayoutProps) {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const aside = useRef<HTMLElement>(null)
    const [open, setOpen] = useState(false)
    // on arrival and on every move: show the current row, close the sheet
    useEffect(() => {
        if (pathname && aside.current)
            revealActive(aside.current)
        setOpen(false)
    }, [pathname])

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-4 pb-16 md:flex-row md:gap-6 md:px-6 md:pt-8 lg:gap-8">
            <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setOpen(true)}
                className="glass-bar sticky top-16 z-30 -mx-4 flex items-center gap-2 px-4 py-2.5 text-start text-subheadline font-semibold text-label md:hidden"
            >
                <HugeiconsIcon
                    icon={Menu01Icon}
                    size={18}
                    className="text-label-secondary"
                />
                <span className="min-w-0 flex-1 truncate">
                    {currentTitle(pathname)}
                </span>
                <span className="text-footnote font-normal text-label-secondary">
                    Browse
                </span>
            </button>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label="Docs"
            >
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                    <DocsNav />
                </div>
            </Sheet>
            <aside
                ref={aside}
                className="hidden md:sticky md:top-24 md:block md:h-[calc(100svh-7rem)] md:w-64 md:shrink-0 md:overflow-y-auto md:pe-3 lg:w-72"
            >
                <DocsNav />
            </aside>
            <div className="flex min-w-0 flex-1 flex-col gap-8">
                <FrameworkSwitcher>
                    {children}
                </FrameworkSwitcher>
            </div>
        </div>
    )
}
