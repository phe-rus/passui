import { children, Show, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import { cn } from "../../lib/class-names"
export type StatTileTone = "critical"
export interface StatTileProps {
    label: string
    value: number
    caption?: JSX.Element
    tone?: StatTileTone
    onClick?: () => void
    active?: boolean
}
export function StatTile(props: StatTileProps) {
    const caption = children(() => props.caption)
    return (
        <Dynamic
            component={props.onClick ? "button" : "div"}
            type={props.onClick ? "button" : undefined}
            aria-pressed={
                props.onClick
                    ? (props.active ?? false)
                    : undefined
            }
            onClick={props.onClick}
            class={cn(
                "flex min-w-0 flex-col gap-1 rounded-2xl border border-border/35 bg-card p-4 text-left shadow-xs",
                props.onClick &&
                    "ring-1 ring-transparent transition-colors hover:bg-muted/60",
                props.onClick &&
                    props.active &&
                    "bg-muted/70 ring-foreground/15"
            )}
        >
            <span class="text-xs text-muted-foreground">
                {props.label}
            </span>
            <span
                class={cn(
                    "text-lg font-semibold tabular-nums tracking-tight",
                    props.tone === "critical" &&
                        props.value > 0 &&
                        "text-destructive"
                )}
            >
                {props.value.toLocaleString("en-US")}
            </span>
            <Show when={caption()}>
                <span class="text-xs text-muted-foreground">
                    {caption()}
                </span>
            </Show>
        </Dynamic>
    )
}
