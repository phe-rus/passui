import {
    ArrowUp02Icon,
    NextIcon,
    PauseIcon,
    PlayIcon,
    PlusSignIcon,
    PreviousIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button, Chip, Toggle, toast } from "@passui/react"
import { cn } from "@passui/react/cn"
import { IconButton } from "@passui/react/icon-button"
import { type ReactNode, useState } from "react"

type SceneProps = {
    className?: string
}

type PanelProps = {
    className?: string
    children: ReactNode
}

/** The shared surface: every scene sits on the same paper. */
function Panel({ className, children }: PanelProps) {
    return (
        <div
            className={cn(
                "rounded-[1.75rem] bg-elevated p-4 text-label shadow-[0_2px_6px_rgb(0_0_0/0.05),0_22px_44px_-22px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.04] transition-colors duration-700",
                className
            )}
        >
            {children}
        </div>
    )
}

/** Abstract artwork in the accent: no image files, follows the theme. */
function Artwork({ className }: SceneProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[1.25rem] bg-accent-soft transition-colors duration-700",
                className
            )}
        >
            <span className="absolute -top-6 -right-4 size-28 rounded-full bg-accent/80 transition-colors duration-700" />
            <span className="absolute -bottom-10 -left-6 size-36 rounded-full bg-accent-text/25 transition-colors duration-700" />
            <span className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-elevated/80" />
        </div>
    )
}

export function PlayerScene({ className }: SceneProps) {
    const [playing, setPlaying] = useState(true)
    return (
        <Panel
            className={cn(
                "flex w-64 flex-col gap-3",
                className
            )}
        >
            <Artwork className="h-40" />
            <div className="flex flex-col px-1">
                <span className="text-headline font-semibold">
                    Morning light
                </span>
                <span className="text-footnote text-label-secondary">
                    Quiet Rooms
                </span>
            </div>
            <div className="mx-1 h-1 overflow-hidden rounded-full bg-fill">
                <div className="h-full w-2/5 rounded-full bg-accent transition-colors duration-700" />
            </div>
            <div className="flex items-center justify-between px-3">
                <IconButton
                    label="Previous"
                    variant="ghost"
                    size="icon-sm"
                >
                    <HugeiconsIcon
                        icon={PreviousIcon}
                        size={18}
                    />
                </IconButton>
                <IconButton
                    label={playing ? "Pause" : "Play"}
                    variant="accent"
                    onClick={() =>
                        setPlaying((value) => !value)
                    }
                >
                    <HugeiconsIcon
                        icon={playing ? PauseIcon : PlayIcon}
                        size={20}
                    />
                </IconButton>
                <IconButton
                    label="Next"
                    variant="ghost"
                    size="icon-sm"
                >
                    <HugeiconsIcon
                        icon={NextIcon}
                        size={18}
                    />
                </IconButton>
            </div>
        </Panel>
    )
}

export function ComposerScene({ className }: SceneProps) {
    const [text, setText] = useState("")
    return (
        <Panel
            className={cn(
                "flex w-72 flex-col gap-3",
                className
            )}
        >
            <input
                value={text}
                onChange={(event) =>
                    setText(event.target.value)
                }
                placeholder="How can I help?"
                aria-label="Message"
                className="bg-transparent px-1 text-body outline-none placeholder:text-label-tertiary"
            />
            <div className="flex items-center justify-between">
                <IconButton
                    label="Attach"
                    variant="secondary"
                    size="icon-sm"
                >
                    <HugeiconsIcon
                        icon={PlusSignIcon}
                        size={18}
                    />
                </IconButton>
                <IconButton
                    label="Send"
                    variant="default"
                    size="icon-sm"
                    onClick={() => {
                        setText("")
                        toast.success("Sent (just a demo)")
                    }}
                >
                    <HugeiconsIcon
                        icon={ArrowUp02Icon}
                        size={18}
                    />
                </IconButton>
            </div>
        </Panel>
    )
}

export function ProductScene({ className }: SceneProps) {
    const [added, setAdded] = useState(false)
    return (
        <Panel
            className={cn(
                "flex w-60 flex-col gap-3",
                className
            )}
        >
            <Artwork className="h-44" />
            <div className="flex items-start justify-between gap-2 px-1">
                <div className="flex flex-col">
                    <span className="text-headline font-semibold">
                        Sun lamp
                    </span>
                    <span className="text-footnote text-label-secondary">
                        Warm light, all day
                    </span>
                </div>
                <span className="text-headline font-semibold tabular-nums">
                    $129
                </span>
            </div>
            <Button
                variant={added ? "secondary" : "accent"}
                onClick={() => setAdded((value) => !value)}
            >
                {added ? "In your bag" : "Add to bag"}
            </Button>
        </Panel>
    )
}

export function RewardsScene({ className }: SceneProps) {
    return (
        <Panel
            className={cn(
                "flex w-64 flex-col gap-3",
                className
            )}
        >
            <div className="flex items-baseline justify-between px-1">
                <span className="text-headline font-semibold">
                    Points
                </span>
                <span className="text-footnote text-label-secondary tabular-nums">
                    6 of 8
                </span>
            </div>
            <div className="flex gap-1 px-1">
                {Array.from({ length: 8 }, (_, index) => (
                    <span
                        key={index}
                        className={cn(
                            "h-2 flex-1 rounded-full transition-colors duration-700",
                            index < 6
                                ? "bg-accent"
                                : "bg-fill"
                        )}
                    />
                ))}
            </div>
            <div className="flex items-center gap-2 px-1">
                <div className="flex -space-x-1.5">
                    {["AK", "MS", "JT"].map((initials) => (
                        <span
                            key={initials}
                            className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-caption2 font-bold text-accent-text ring-2 ring-elevated transition-colors duration-700"
                        >
                            {initials}
                        </span>
                    ))}
                </div>
                <span className="text-footnote text-label-secondary">
                    Aiko and 2 friends joined
                </span>
            </div>
        </Panel>
    )
}

export function OfferChip({ className }: SceneProps) {
    return (
        <span className={cn("inline-flex", className)}>
            <Chip tone="accent">Limited time</Chip>
        </span>
    )
}

export function ShippingToggle({ className }: SceneProps) {
    const [on, setOn] = useState(true)
    return (
        <span
            className={cn(
                "inline-flex rounded-full bg-elevated/80 px-3 py-1.5 shadow-sm ring-1 ring-black/[0.04] backdrop-blur",
                className
            )}
        >
            <Toggle
                style="checkbox"
                label="Free shipping"
                checked={on}
                onChange={setOn}
            />
        </span>
    )
}
