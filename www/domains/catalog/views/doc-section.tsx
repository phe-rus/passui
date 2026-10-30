import { type ReactNode, useEffect, useRef } from "react"

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
    const details = useRef<HTMLDetailsElement>(null)
    useEffect(() => {
        if (!collapsible) return
        const reveal = () => {
            if (
                window.location.hash === `#${id}` &&
                details.current
            )
                details.current.open = true
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
                aria-label={title}
                className="scroll-mt-24"
            >
                <details
                    ref={details}
                    className="rounded-3xl ring-1 ring-separator/60"
                >
                    <summary className="cursor-pointer px-5 py-4 text-headline font-semibold text-label focus-visible:outline-2 focus-visible:outline-accent-text">
                        {title}
                    </summary>
                    <div className="flex flex-col gap-4 px-5 pb-5">
                        {description && (
                            <p className="text-callout text-label-secondary">
                                {description}
                            </p>
                        )}
                        {children}
                    </div>
                </details>
            </section>
        )
    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className="flex scroll-mt-24 flex-col gap-4"
        >
            <div className="flex flex-col gap-1.5">
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
                    <p className="max-w-2xl text-callout text-label-secondary">
                        {description}
                    </p>
                )}
            </div>
            {children}
        </section>
    )
}
