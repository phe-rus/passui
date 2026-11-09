import type { PropsWithChildren, ReactNode } from "react"
import { cn } from "../../lib/class-names"

type ViewControllerProps = PropsWithChildren<{
    heading: ReactNode
    className?: string
}>

type HeadingProps = {
    title: ReactNode
    description?: ReactNode
    action?: ReactNode
    size?: keyof typeof titleSizes
}

const titleSizes = {
    default: "text-large-title leading-large-title",
    // sign in style screens: centered, tighter, like a system sheet
    compact: "text-title leading-title font-semibold tracking-tight",
} as const

export function ViewController({ heading, className, children }: ViewControllerProps) {
    return (
        <article
            className={cn(
                "container mx-auto flex flex-col",
                "w-full gap-0 py-12 md:max-w-3xl",
                className
            )}
        >
            {heading}
            <div className="mt-8 flex flex-col gap-6">{children}</div>
        </article>
    )
}

function Heading({ title, description, action, size = "default" }: HeadingProps) {
    const centered = size === "compact"
    return (
        <>
            <div
                className={cn(
                    "flex flex-wrap items-center gap-3",
                    centered && "justify-center text-center"
                )}
            >
                <h1 className={cn("min-w-0 wrap-anywhere", titleSizes[size])}>{title}</h1>
                {action}
            </div>
            {description && (
                <p
                    className={cn(
                        "mt-0 max-w-prose text-subheadline leading-relaxed text-label-secondary",
                        centered && "text-center"
                    )}
                >
                    {description}
                </p>
            )}
        </>
    )
}

ViewController.Heading = Heading
