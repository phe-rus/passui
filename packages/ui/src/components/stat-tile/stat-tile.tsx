import type { ReactNode } from "react"
import { cn } from "../../lib/class-names"

export type StatTileTone = "critical"

export interface StatTileProps {
    label: string
    value: number
    /** A quiet line under the number, like "3 signed in now". */
    caption?: ReactNode
    /** Turns the number red once it's above zero. */
    tone?: StatTileTone
    /** Makes the tile a toggle, e.g. a filter. */
    onClick?: () => void
    active?: boolean
}

/** One number with its label, optionally a toggle. */
export function StatTile({ label, value, caption, tone, onClick, active = false }: StatTileProps) {
    const body = (
        <>
            <span className="text-label-secondary">{label}</span>
            <span className={cn("tabular-nums", tone === "critical" && value > 0 && "text-danger")}>
                {value.toLocaleString("en-US")}
            </span>
            {caption && <span className="text-label-secondary">{caption}</span>}
        </>
    )
    const className =
        "flex min-w-0 flex-col gap-2 rounded-2xl border border-separator/35 bg-elevated p-4 text-left shadow-xs"

    if (!onClick) return <div className={className}>{body}</div>
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                className,
                "ring-1 ring-transparent transition-colors hover:bg-fill/60",
                active && "bg-fill/70 ring-label/15"
            )}
        >
            {body}
        </button>
    )
}
