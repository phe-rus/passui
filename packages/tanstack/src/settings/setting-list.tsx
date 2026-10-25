import {
    IconButton,
    type IconButtonSize,
} from "@passui/react/icon-button"
import {
    ArrowRight01Icon,
    Copy01Icon,
    Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@passui/react/cn"
import { Link } from "@tanstack/react-router"
import type { LinkProps } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { useState } from "react"

type SettingListProps = {
    id?: string
    /** h3 when the list sits inside an Area that already has the h2. */
    as?: "h2" | "h3"
    /** A Glyph beside the heading; rows themselves stay plain. */
    icon?: ReactNode
    title?: string
    description?: string
    /** Right of the heading: an Add button, or a Coming soon badge. */
    action?: ReactNode
    /** "tile": the rounded, lifted card of the account app's overview. */
    variant?: "inset" | "tile"
    children: ReactNode
    className?: string
}

type RowProps = {
    icon?: ReactNode
    title: ReactNode
    description?: ReactNode
    /** The current value, muted on the right, like "On" or an email. */
    value?: ReactNode
    trailing?: ReactNode
    to?: LinkProps["to"]
    params?: LinkProps["params"]
    hash?: string
    onClick?: () => void
    /** Show the chevron without a destination, for a preview row. */
    chevron?: boolean
    tone?: "default" | "destructive"
}

/**
 * A titled group of settings in one inset card, hairlines between rows
 * (even rows wrapped in a Preview), a soft highlight under the one you point at.
 */
export function SettingList({
    id,
    as: Heading = "h2",
    icon,
    title,
    description,
    action,
    variant = "inset",
    children,
    className,
}: SettingListProps) {
    const lines = cn(
        "[&>*+*]:border-t [&>*+*]:border-border/40",
        "[&_.setting-row+.setting-row]:border-t [&_.setting-row+.setting-row]:border-border/40"
    )

    // the account app's tile: the heading lives inside the card, on a tinted band
    if (variant === "tile")
        return (
            <section
                id={id}
                className={cn(
                    "flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-separator/70 bg-elevated shadow-sm",
                    className
                )}
            >
                {title && (
                    <div className="flex items-center gap-3 border-b border-separator/60 px-4 py-4 sm:px-5 [&>span:first-child]:size-9 [&>span:first-child_.glyph]:size-4">
                        {icon}
                        <div className="flex min-w-0 flex-1 flex-col">
                            <Heading className="text-base">
                                {title}
                            </Heading>
                            {description && (
                                <p className="text-[13px] text-muted-foreground">
                                    {description}
                                </p>
                            )}
                        </div>
                        {action}
                    </div>
                )}
                <div
                    className={cn(
                        "flex flex-col py-1 [&_.setting-row]:min-h-16 [&_.setting-row]:px-4 sm:[&_.setting-row]:px-5 [&_.setting-row_h3]:text-subheadline [&_.setting-row_p]:text-footnote",
                        lines
                    )}
                >
                    {children}
                </div>
            </section>
        )

    return (
        <section
            id={id}
            className={cn(
                "flex scroll-mt-20 flex-col gap-3",
                "[&>div:last-child]:rounded-2xl [&>div:last-child]:shadow-xs",
                "[&>div:first-child_h2]:text-subheadline [&>div:first-child_h2]:font-semibold",
                "[&>div:first-child_p]:text-footnote [&>div:first-child_p]:text-label-secondary",
                "[&_.setting-row]:min-h-16 [&_.setting-row]:px-4 [&_.setting-row]:py-3",
                "[&_.setting-row_h3]:whitespace-normal [&_.setting-row_h3]:wrap-anywhere [&_.setting-row_h3]:text-subheadline",
                "[&_.setting-row_p]:wrap-anywhere [&_.setting-row_p]:text-footnote [&_.setting-row_p]:text-label-secondary",
                "[&_.setting-row>span]:whitespace-normal [&_.setting-row>span]:wrap-anywhere",
                className
            )}
        >
            {title && (
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                        {icon}
                        <div className="min-w-0 wrap-anywhere">
                            <Heading>{title}</Heading>
                            {description && (
                                <p className="text-sm">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    {action}
                </div>
            )}
            <div
                className={cn(
                    "flex flex-col overflow-hidden rounded-xl border border-border/35 bg-card shadow-xs",
                    lines
                )}
            >
                {children}
            </div>
        </section>
    )
}

function Row({
    icon,
    title,
    description,
    value,
    trailing,
    to,
    params,
    hash,
    onClick,
    chevron,
    tone = "default",
}: RowProps) {
    const interactive = Boolean(to || onClick)
    const className = cn(
        "setting-row flex min-h-10 w-full items-center gap-3 px-3.5 py-1.5 text-left",
        interactive &&
            "cursor-pointer transition-colors hover:bg-foreground/[0.035] focus-visible:bg-foreground/[0.05] focus-visible:outline-none",
        tone === "destructive" && "[&_h3]:text-destructive"
    )
    const body = (
        <>
            {icon}
            <span className="flex min-w-0 flex-1 flex-col">
                <h3 className="truncate text-sm">{title}</h3>
                {description && (
                    <p className="text-xs">{description}</p>
                )}
            </span>
            {value && (
                <span className="max-w-[45%] truncate text-sm text-muted-foreground">
                    {value}
                </span>
            )}
            {trailing}
            {(chevron ?? interactive) && (
                <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className="size-4 shrink-0 text-muted-foreground/60"
                />
            )}
        </>
    )

    if (to) {
        return (
            <Link
                to={to}
                params={params}
                hash={hash}
                className={className}
            >
                {body}
            </Link>
        )
    }
    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={className}
            >
                {body}
            </button>
        )
    }
    return <div className={className}>{body}</div>
}

/** A row's trailing copy button; shows a tick for a moment after copying. */
function Copy({
    value,
    label = "Copy",
    size = "icon-xs",
}: {
    value: string
    label?: string
    /** Quiet and row-sized by default; any of Passui's icon sizes. */
    size?: IconButtonSize
}) {
    const [copied, setCopied] = useState(false)
    return (
        <IconButton
            variant="ghost"
            size={size}
            label={label}
            onClick={async (event) => {
                event.stopPropagation()
                await navigator.clipboard.writeText(value)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
            }}
        >
            <HugeiconsIcon
                icon={copied ? Tick02Icon : Copy01Icon}
                className="size-4"
            />
        </IconButton>
    )
}

SettingList.Row = Row
SettingList.Copy = Copy
