import { Button } from "@passui/react/button"
import { cn } from "@passui/react/cn"
import { ChevronDownIcon } from "@passui/react/icons"
import { InlineDisclosure } from "@passui/react/inline-disclosure"
import { type ReactNode, useEffect, useState } from "react"

type DocSectionProps = {
    id: string
    title: string
    description?: string
    /** Example headings sit one step below the page's sections. */
    level?: 2 | 3
    children: ReactNode
    /** Keeps reference material available without expanding every section. */
    collapsible?: boolean
}

/** A titled part of a component page, reachable from On this page. */
export function DocSection({
    id,
    title,
    description,
    level = 2,
    children,
    collapsible = false,
}: DocSectionProps) {
    const Heading = level === 2 ? "h2" : "h3"
    const [expanded, setExpanded] = useState(false)
    useEffect(() => {
        if (!collapsible) return
        const reveal = () => {
            if (window.location.hash === `#${id}`)
                setExpanded(true)
        }
        reveal()
        window.addEventListener("hashchange", reveal)
        return () =>
            window.removeEventListener("hashchange", reveal)
    }, [collapsible, id])
    if (collapsible)
        return (
            <section
                id={id}
                aria-labelledby={`${id}-title`}
                className="scroll-mt-24"
            >
                <div className="flex flex-col gap-2">
                    <Heading id={`${id}-title`}>
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-expanded={expanded}
                            aria-controls={`${id}-content`}
                            onClick={() =>
                                setExpanded((value) => !value)
                            }
                            className="w-full px-0 [&>span]:w-full [&>span]:justify-between"
                        >
                            {title}
                            <ChevronDownIcon
                                size={16}
                                className={cn(
                                    "transition-transform duration-fast motion-reduce:transition-none",
                                    expanded && "rotate-180"
                                )}
                            />
                        </Button>
                    </Heading>
                    <div id={`${id}-content`}>
                        <InlineDisclosure open={expanded}>
                            <div className="flex flex-col gap-5">
                                {description && (
                                    <p>{description}</p>
                                )}
                                {children}
                            </div>
                        </InlineDisclosure>
                    </div>
                </div>
            </section>
        )
    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className="flex scroll-mt-24 flex-col gap-5"
        >
            <div className="flex flex-col gap-2">
                <Heading
                    id={`${id}-title`}
                    className={
                        level === 2
                            ? "font-brand text-title2 font-extrabold tracking-tight text-label"
                            : "text-title3 font-semibold tracking-tight text-label"
                    }
                >
                    <a
                        href={`#${id}`}
                        className="text-inherit no-underline hover:underline"
                    >
                        {title}
                    </a>
                </Heading>
                {description && (
                    <p className="max-w-2xl">{description}</p>
                )}
            </div>
            {children}
        </section>
    )
}
