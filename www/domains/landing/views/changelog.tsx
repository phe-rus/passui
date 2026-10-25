import { cn } from "@passui/react/cn"
import { changelog } from "../content/changelog"

const dateFormat = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
})

export function Changelog() {
    const [latest, ...earlier] = changelog
    return (
        <section
            id="changelog"
            aria-labelledby="changelog-title"
            className="mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col gap-8 px-4 md:px-6"
        >
            <h2
                id="changelog-title"
                className="text-[clamp(2rem,4vw,2.6rem)] font-bold tracking-tight text-label"
            >
                What's new
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
                {[latest, ...earlier].map((entry, index) => (
                    <article
                        key={entry.title}
                        className={cn(
                            "flex flex-col gap-4",
                            index === 0 &&
                                "md:col-span-2 md:row-span-2"
                        )}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-center rounded-5xl bg-accent-soft/70 transition-colors duration-700",
                                index === 0
                                    ? "aspect-[16/9] md:aspect-auto md:min-h-64 md:flex-1"
                                    : "aspect-[16/8]"
                            )}
                        >
                            <span
                                className={cn(
                                    "font-mono font-bold tracking-tight text-accent-text transition-colors duration-700",
                                    index === 0
                                        ? "text-[clamp(2.5rem,7vw,5rem)]"
                                        : "text-title"
                                )}
                            >
                                {entry.date
                                    .slice(5)
                                    .replace("-", ".")}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3
                                className={cn(
                                    "font-semibold tracking-tight text-label",
                                    index === 0
                                        ? "text-title3"
                                        : "text-headline"
                                )}
                            >
                                {entry.title}
                            </h3>
                            <p className="text-callout text-label-secondary">
                                {entry.summary}
                            </p>
                            <time
                                dateTime={entry.date}
                                className="text-footnote text-label-tertiary"
                            >
                                {dateFormat.format(
                                    new Date(entry.date)
                                )}
                            </time>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
