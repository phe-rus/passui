import { Button } from "@passui/react/button"
import { SidebarIcon } from "@passui/react/icons"
import { Sheet } from "@passui/react/sheet"
import { useLocation } from "@tanstack/react-router"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { guides } from "@/domains/guides/get-guides"
import { getNavigationCatalog } from "../get-navigation"
import { componentTitle } from "../navigation"
import { DocsNav, revealActive } from "./docs-nav"

type DocsLayoutProps = { children: ReactNode }

/** The page being read, for the phone bar: a guide or a component. */
function currentTitle(pathname: string) {
    pathname = pathname.replace(/^\/components\/react\//, "/components/")
    const guide = guides.find((item) => item.path === pathname)
    if (guide) return guide.title
    const slug = pathname.split("/components/")[1]
    return (() => {
        const entry = getNavigationCatalog().find((entry) => entry.docs.slug === slug)
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
        if (pathname && aside.current) revealActive(aside.current)
        setOpen(false)
    }, [pathname])

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 pt-4 pb-16 md:flex-row md:px-6 md:pt-8">
            <Button
                variant="ghost"
                size="sm"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="glass-bar sticky top-16 z-30 -mx-4 w-[calc(100%+2rem)] rounded-none px-4 md:hidden [&>span]:w-full [&>span]:justify-between"
            >
                <SidebarIcon size={18} />
                <span className="min-w-0 flex-1 truncate">{currentTitle(pathname)}</span>
                <span>Browse</span>
            </Button>
            <Sheet open={open} onClose={() => setOpen(false)} label="Docs">
                <div data-docs-scroller className="min-h-0 flex-1 overflow-y-auto p-4">
                    <DocsNav />
                </div>
            </Sheet>
            <aside
                ref={aside}
                data-docs-scroller
                className="hidden md:sticky md:top-24 md:block md:h-[calc(100svh-7rem)] md:w-52 md:shrink-0 md:overflow-y-auto md:pe-4 lg:w-56"
            >
                <DocsNav />
            </aside>
            <div className="flex min-w-0 flex-1 flex-col gap-5">{children}</div>
        </div>
    )
}
