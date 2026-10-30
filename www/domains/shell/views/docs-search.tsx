import { SearchIcon } from "@passui/react/icons"
import {
    SearchList,
    SearchListField,
    SearchListResults,
    SearchListGroup,
    SearchListItem,
    SearchListEmpty,
} from "@passui/react/search-list"
import { Sheet } from "@passui/react/sheet"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
    catalogGroups,
    getCatalog,
} from "@/domains/catalog/get-catalog"
import { componentTitle } from "@/domains/catalog/navigation"
import { guides } from "@/domains/guides/get-guides"
import { frameworkPath } from "@/domains/framework/framework"
import { useDocsFramework } from "@/domains/framework/use-docs-framework"

/** One command-style search entry in the header, shared by all docs pages. */
export function DocsSearch() {
    const [open, setOpen] = useState(false)
    const [shortcut, setShortcut] = useState("Ctrl K")
    const navigate = useNavigate()
    const framework = useDocsFramework()
    useEffect(() => {
        setShortcut(
            /Mac|iPhone|iPad/.test(navigator.platform)
                ? "⌘ K"
                : "Ctrl K"
        )
        const onKey = (event: KeyboardEvent) => {
            const target = event.target
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k" &&
                !(
                    target instanceof HTMLElement &&
                    (target.isContentEditable ||
                        target.closest(
                            "input,textarea,select"
                        ))
                )
            ) {
                event.preventDefault()
                setOpen((current) => !current)
            }
        }
        window.addEventListener("keydown", onKey)
        return () =>
            window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-keyshortcuts="Control+k Meta+k"
                aria-label="Search documentation"
                className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-fill/60 px-3 text-footnote text-label-secondary transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-accent-text lg:w-52"
            >
                <SearchIcon size={16} />
                <span className="hidden lg:inline">
                    Search docs…
                </span>
                <kbd className="ms-auto hidden rounded-md bg-background px-1.5 py-0.5 text-caption2 text-label-tertiary lg:inline">
                    {shortcut}
                </kbd>
            </button>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label="Search documentation"
                className="max-w-xl"
            >
                <SearchList className="flex min-h-0 flex-col p-3">
                    <SearchListField
                        autoFocus
                        aria-label="Search documentation"
                        placeholder="Search components and guides…"
                        className="rounded-xl border-0 bg-transparent"
                    />
                    <SearchListResults className="max-h-[min(60svh,28rem)] border-t border-separator/60">
                        <SearchListEmpty className="p-6 text-center text-footnote text-label-secondary">
                            No results found.
                        </SearchListEmpty>
                        <SearchListGroup heading="Guides">
                            {guides.map((guide) => (
                                <SearchListItem
                                    key={guide.slug}
                                    value={guide.title}
                                    keywords={[guide.summary]}
                                    onSelect={() => {
                                        setOpen(false)
                                        void navigate({
                                            to: frameworkPath(
                                                guide.path,
                                                framework
                                            ),
                                        })
                                    }}
                                >
                                    {guide.title}
                                </SearchListItem>
                            ))}
                        </SearchListGroup>
                        {catalogGroups.map((group) => (
                            <SearchListGroup
                                key={group}
                                heading={group}
                            >
                                {getCatalog()
                                    .filter(
                                        (entry) =>
                                            entry.group ===
                                            group
                                    )
                                    .map((entry) => (
                                        <SearchListItem
                                            key={
                                                entry.docs
                                                    .slug
                                            }
                                            value={componentTitle(
                                                entry
                                            )}
                                            keywords={[
                                                entry.docs
                                                    .name,
                                                entry.docs
                                                    .slug,
                                                entry.content
                                                    .summary,
                                            ]}
                                            onSelect={() => {
                                                setOpen(false)
                                                void navigate(
                                                    {
                                                        to:
                                                            framework ===
                                                            "solid"
                                                                ? "/components/solid/$slug"
                                                                : "/components/react/$slug",
                                                        params: {
                                                            slug: entry
                                                                .docs
                                                                .slug,
                                                        },
                                                    }
                                                )
                                            }}
                                        >
                                            <span>
                                                {componentTitle(
                                                    entry
                                                )}
                                            </span>
                                        </SearchListItem>
                                    ))}
                            </SearchListGroup>
                        ))}
                    </SearchListResults>
                    <p className="px-3 pt-3 text-caption2 text-label-tertiary">
                        ↑ ↓ to navigate · Enter to open · Esc
                        to close
                    </p>
                </SearchList>
            </Sheet>
        </>
    )
}
