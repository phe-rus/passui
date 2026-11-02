import { useId, type ReactNode } from "react"
import { cn } from "../../lib/class-names"

export interface SidebarSectionProps {
    /** Visible heading for this group of navigation rows. */
    title: string
    children: ReactNode
}

export interface SidebarItemContentProps {
    icon?: ReactNode
    /** Optional trailing count. */
    count?: number
    /** Matches the router link's active state. */
    active?: boolean
    children: ReactNode
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
    const headingId = useId()
    return (
        <section aria-labelledby={headingId} className="flex flex-col gap-0.5">
            <h2
                id={headingId}
                className="px-2.5 pb-1.5 text-caption font-semibold text-label-tertiary"
            >
                {title}
            </h2>
            {children}
        </section>
    )
}

/** Classes for a sidebar row; apply to the app's router link. */
export type SidebarDensity = "regular" | "compact"

export function sidebarItemClass(active?: boolean, density: SidebarDensity = "regular"): string {
    return cn(
        "group flex w-full items-center gap-2.5 text-label no-underline transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
        density === "compact"
            ? "min-h-8 rounded-lg px-2 py-1 text-footnote [@media(pointer:coarse)]:min-h-10"
            : "rounded-2xl px-2.5 py-[7px] text-subheadline",
        active
            ? "bg-fill font-medium"
            : "font-normal text-label-secondary hover:bg-fill/70 hover:text-label"
    )
}

export function SidebarItemContent({ icon, count, active, children }: SidebarItemContentProps) {
    return (
        <>
            {icon && (
                <span
                    className={cn(
                        "flex transition-colors",
                        active ? "text-accent-text" : "text-label-secondary"
                    )}
                >
                    {icon}
                </span>
            )}
            <span className="grow truncate">{children}</span>
            {count !== undefined && (
                <span
                    className={cn(
                        "text-footnote tabular-nums",
                        active ? "text-accent-text" : "text-label-tertiary"
                    )}
                >
                    {count}
                </span>
            )}
        </>
    )
}
