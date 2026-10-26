import { Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
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
    useRef,
    useState,
} from "react"
import { guides } from "@/domains/guides/get-guides"
import { frameworkPath } from "@/domains/framework/framework"
import { useDocsFramework } from "@/domains/framework/use-docs-framework"
import { FrameworkSwitcher } from "@/domains/framework/views/framework-switcher"
import { catalogGroups, getCatalog } from "../get-catalog"

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

/** One row: Button's xs size, h-8 px-3 text-caption rounded-full. */
function rowClass(active: boolean) {
    return cn(
        sidebarItemClass(active),
        "h-8 rounded-full px-3 py-0 text-caption"
    )
}

/** Every guide and component, by group; the sidebar and the phone sheet share it. */
function DocsNav() {
    const framework = useDocsFramework()
    const catalog = getCatalog()
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
            aria-label="Docs"
            className="flex flex-col gap-4"
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
            {groups.map(({ group, entries }) => (
                <SidebarSection key={group} title={group}>
                    {entries.map(({ docs, icon }) => (
                        <Link
                            key={docs.slug}
                            to={
                                framework === "solid"
                                    ? "/components/solid/$slug"
                                    : "/components/react/$slug"
                            }
                            params={{ slug: docs.slug }}
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
                                        active={isActive}
                                        icon={
                                            <HugeiconsIcon
                                                icon={icon}
                                                size={16}
                                            />
                                        }
                                    >
                                        {docs.name}
                                    </SidebarItemContent>
                                </span>
                            )}
                        </Link>
                    ))}
                </SidebarSection>
            ))}
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
    return (
        getCatalog().find((entry) => entry.docs.slug === slug)
            ?.docs.name ?? "Docs"
    )
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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-4 pb-16 md:flex-row md:gap-10 md:px-6 md:pt-10">
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
                className="hidden md:sticky md:top-24 md:block md:h-[calc(100svh-7rem)] md:w-56 md:shrink-0 md:overflow-y-auto"
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
