import { SearchIcon } from "@passui/react/icons"
import { Button } from "@passui/react/button"
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
import { catalogGroups, getCatalog } from "@/domains/catalog/get-catalog"
import { componentTitle } from "@/domains/catalog/navigation"
import { guides } from "@/domains/guides/get-guides"

/** One command-style search entry in the header, shared by all docs pages. */
export function DocsSearch() {
    const [open, setOpen] = useState(false)
    const [shortcut, setShortcut] = useState("Ctrl K")
    const navigate = useNavigate()
    useEffect(() => {
        setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K")
        const onKey = (event: KeyboardEvent) => {
            const target = event.target
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k" &&
                !(
                    target instanceof HTMLElement &&
                    (target.isContentEditable || target.closest("input,textarea,select"))
                )
            ) {
                event.preventDefault()
                setOpen((current) => !current)
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <>
            <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-keyshortcuts="Control+k Meta+k"
                aria-label="Search documentation"
                className="shrink-0 justify-start lg:w-52"
            >
                <SearchIcon size={16} />
                <span className="hidden lg:inline">Search docs…</span>
                <kbd className="ms-auto hidden rounded-full border border-separator/70 bg-paper/70 px-2 py-0.5 font-mono text-caption2 leading-none text-label-secondary lg:inline">
                    {shortcut}
                </kbd>
            </Button>
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
                            {guides
                                .filter((guide) => guide.slug !== "components")
                                .map((guide) => (
                                    <SearchListItem
                                        key={guide.slug}
                                        value={guide.title}
                                        keywords={[guide.summary]}
                                        onSelect={() => {
                                            setOpen(false)
                                            void navigate({
                                                to: guide.path,
                                            })
                                        }}
                                    >
                                        {guide.title}
                                    </SearchListItem>
                                ))}
                        </SearchListGroup>
                        {catalogGroups.map((group) => (
                            <SearchListGroup key={group} heading={group}>
                                {getCatalog()
                                    .filter((entry) => entry.group === group)
                                    .map((entry) => (
                                        <SearchListItem
                                            key={entry.docs.slug}
                                            value={componentTitle(entry)}
                                            keywords={[
                                                entry.group,
                                                entry.docs.name,
                                                entry.docs.slug,
                                                entry.content.summary,
                                            ]}
                                            onSelect={() => {
                                                setOpen(false)
                                                void navigate({
                                                    to: "/components/react/$slug",
                                                    params: {
                                                        slug: entry.docs.slug,
                                                    },
                                                })
                                            }}
                                        >
                                            <span>{componentTitle(entry)}</span>
                                        </SearchListItem>
                                    ))}
                            </SearchListGroup>
                        ))}
                    </SearchListResults>
                    <p className="px-3 pt-3 text-caption2 text-label-tertiary">
                        ↑ ↓ to navigate · Enter to open · Esc to close
                    </p>
                </SearchList>
            </Sheet>
        </>
    )
}
