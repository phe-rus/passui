import { cn } from "@passui/react/cn"
import { useEffect, useState } from "react"

export type TocItem = {
    id: string
    title: string
    children?: TocItem[]
}

type OnThisPageProps = {
    items: TocItem[]
}

function flatten(items: TocItem[]): TocItem[] {
    return items.flatMap((item) => [
        item,
        ...flatten(item.children ?? []),
    ])
}

/** The page's sections, with the one being read marked as you scroll. */
export function OnThisPage({ items }: OnThisPageProps) {
    const [active, setActive] = useState(items[0]?.id)

    // the active entry is the last section whose top has passed under
    // the sticky header; nested examples win over their parent this way
    useEffect(() => {
        const ids = flatten(items).map((item) => item.id)
        const headerOffset = 120
        function update() {
            let current = ids[0]
            for (const id of ids) {
                const top = document
                    .getElementById(id)
                    ?.getBoundingClientRect().top
                if (top !== undefined && top <= headerOffset)
                    current = id
            }
            setActive(current)
        }
        update()
        // the page scrolls inside <main>, so listen in the capture phase
        document.addEventListener("scroll", update, {
            capture: true,
            passive: true,
        })
        return () =>
            document.removeEventListener("scroll", update, {
                capture: true,
            })
    }, [items])

    function renderItems(list: TocItem[], depth: number) {
        return (
            <ul className="m-0 flex list-none flex-col p-0">
                {list.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            aria-current={
                                item.id === active
                                    ? "location"
                                    : undefined
                            }
                            className={cn(
                                "-ms-px block border-s-2 py-1 text-footnote no-underline transition-colors",
                                depth === 0 ? "ps-3" : "ps-6",
                                item.id === active
                                    ? "border-accent font-semibold text-label"
                                    : "border-transparent text-label-secondary hover:text-label"
                            )}
                        >
                            {item.title}
                        </a>
                        {item.children &&
                            renderItems(
                                item.children,
                                depth + 1
                            )}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <nav
            aria-label="On this page"
            className="flex flex-col gap-3"
        >
            <span className="text-footnote font-semibold text-label">
                On this page
            </span>
            <div className="border-separator/70 border-s">
                {renderItems(items, 0)}
            </div>
        </nav>
    )
}
