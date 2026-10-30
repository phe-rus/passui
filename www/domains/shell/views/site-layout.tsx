import {
    ContextMenuHost,
    DialogHost,
    TooltipHost,
} from "@passui/react"
import {
    Cancel01Icon,
    Menu01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { buttonStyle } from "@passui/react/button"
import { IconButton } from "@passui/react/icon-button"
import { Sheet } from "@passui/react/sheet"
import { Toaster } from "@passui/react/toaster"
import { Link } from "@tanstack/react-router"
import { PassuiMark } from "./passui-mark"
import { DocsSearch } from "./docs-search"
import { frameworkPath } from "@/domains/framework/framework"
import { useDocsFramework } from "@/domains/framework/use-docs-framework"
import { cn } from "@passui/react/cn"
import {
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react"

function Mark() {
    return (
        <Link
            to="/"
            aria-label="Passui home"
            className="flex items-center gap-2 no-underline"
        >
            <PassuiMark />
            <span className="font-display text-title3 font-black tracking-[-0.05em] text-label">
                passui
            </span>
        </Link>
    )
}

const links = [
    { label: "Features", hash: "components" },
    { label: "Playground", hash: "playground" },
    { label: "What's new", hash: "changelog" },
] as const

type SiteLayoutProps = {
    children: ReactNode
}

/** The site's frame: a top bar, the page, and a footer. */
export function SiteLayout({ children }: SiteLayoutProps) {
    const framework = useDocsFramework()
    const top = useRef<HTMLDivElement>(null)
    const [scrolled, setScrolled] = useState(false)
    // the site's links on phones, where the bar has no room for them
    const [menuOpen, setMenuOpen] = useState(false)
    const close = () => setMenuOpen(false)

    // a marker at the very top: once it leaves view, the bar turns to glass
    useEffect(() => {
        const marker = top.current
        if (!marker) return
        const observer = new IntersectionObserver(([entry]) =>
            setScrolled(!entry.isIntersecting)
        )
        observer.observe(marker)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="flex min-h-svh shrink-0 flex-col">
            <div
                ref={top}
                aria-hidden="true"
                className="h-px"
            />
            <header
                className={cn(
                    "sticky top-0 z-40 -mt-px transition-[background-color,box-shadow,backdrop-filter] duration-300",
                    scrolled
                        ? "glass-bar shadow-[0_1px_0_rgb(0_0_0/0.06)]"
                        : "bg-transparent"
                )}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6 lg:gap-6">
                    <Mark />
                    <nav
                        aria-label="Site"
                        className="mx-auto hidden items-center gap-1 md:flex"
                    >
                        <Link
                            to={frameworkPath(
                                "/docs/introduction",
                                framework
                            )}
                            className="rounded-full px-3 py-1.5 text-subheadline text-label-secondary no-underline transition-colors hover:bg-fill/70 hover:text-label"
                        >
                            Docs
                        </Link>
                        <Link
                            to={frameworkPath(
                                "/components",
                                framework
                            )}
                            className="rounded-full px-3 py-1.5 text-subheadline text-label-secondary no-underline transition-colors hover:bg-fill/70 hover:text-label"
                        >
                            Components
                        </Link>
                        {links.map((link) => (
                            <Link
                                key={link.hash}
                                to="/"
                                hash={link.hash}
                                className="hidden rounded-full px-3 py-1.5 text-subheadline text-label-secondary no-underline transition-colors hover:bg-fill/70 hover:text-label lg:block"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="ms-auto flex items-center gap-2 md:ms-0">
                        <DocsSearch />
                        <Link
                            to={frameworkPath(
                                "/docs/installation",
                                framework
                            )}
                            className={buttonStyle({
                                size: "sm",
                            })}
                        >
                            Get started
                        </Link>
                    </div>
                    <IconButton
                        label="Menu"
                        variant="ghost"
                        size="icon-sm"
                        aria-haspopup="dialog"
                        className="md:hidden"
                        onClick={() => setMenuOpen(true)}
                    >
                        <HugeiconsIcon
                            icon={Menu01Icon}
                            size={20}
                        />
                    </IconButton>
                </div>
            </header>
            <Sheet
                open={menuOpen}
                onClose={close}
                label="Menu"
            >
                <nav
                    aria-label="Site"
                    className="flex flex-col gap-1 p-4"
                >
                    <div className="flex items-center justify-between px-3 pb-2">
                        <span className="text-headline font-semibold text-label">
                            Passui
                        </span>
                        <IconButton
                            label="Close"
                            variant="ghost"
                            size="icon-sm"
                            onClick={close}
                        >
                            <HugeiconsIcon
                                icon={Cancel01Icon}
                                size={20}
                            />
                        </IconButton>
                    </div>
                    <Link
                        to={frameworkPath(
                            "/docs/introduction",
                            framework
                        )}
                        onClick={close}
                        className="rounded-3xl px-3 py-3 text-body text-label no-underline hover:bg-fill"
                    >
                        Docs
                    </Link>
                    <Link
                        to={frameworkPath(
                            "/components",
                            framework
                        )}
                        onClick={close}
                        className="rounded-3xl px-3 py-3 text-body text-label no-underline hover:bg-fill"
                    >
                        Components
                    </Link>
                    {links.map((link) => (
                        <Link
                            key={link.hash}
                            to="/"
                            hash={link.hash}
                            onClick={close}
                            className="rounded-3xl px-3 py-3 text-body text-label no-underline hover:bg-fill"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </Sheet>
            <main className="flex flex-1 flex-col">
                {children}
            </main>
            <footer className="border-separator/60 border-t">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:px-6">
                    <Mark />
                    <nav
                        aria-label="Footer"
                        className="flex flex-wrap gap-x-5 gap-y-2 md:mx-auto"
                    >
                        <Link
                            to={frameworkPath(
                                "/components",
                                framework
                            )}
                            className="text-footnote text-label-secondary no-underline hover:text-label"
                        >
                            Components
                        </Link>
                        {links.map((link) => (
                            <Link
                                key={link.hash}
                                to="/"
                                hash={link.hash}
                                className="text-footnote text-label-secondary no-underline hover:text-label"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <span className="text-footnote text-label-tertiary">
                        © 2026 Pherus
                    </span>
                </div>
            </footer>
            <Toaster />
            <ContextMenuHost />
            <DialogHost />
            <TooltipHost />
        </div>
    )
}
