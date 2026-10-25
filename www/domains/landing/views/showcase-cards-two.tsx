import {
    NextIcon,
    PauseIcon,
    PlayIcon,
    PreviousIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Button,
    Chip,
    SegmentedControl,
    StatusIndicator,
    Toggle,
    toast,
} from "@passui/react"
import { cn } from "@passui/react/cn"
import { IconButton } from "@passui/react/icon-button"
import { useState } from "react"
import type { ShowcaseCardBodyProps } from "../types"
import { ShowcaseCard } from "./showcase-cards"

function Billing({ theme }: ShowcaseCardBodyProps) {
    const [period, setPeriod] = useState<"month" | "year">(
        "year"
    )
    return (
        <ShowcaseCard theme={theme} title="Pro plan">
            <SegmentedControl
                value={period}
                onChange={setPeriod}
                label="Billing period"
                options={[
                    { value: "month", label: "Monthly" },
                    { value: "year", label: "Yearly" },
                ]}
            />
            <div className="flex items-baseline gap-1">
                <span className="text-title font-bold tabular-nums">
                    {period === "year" ? "$8" : "$10"}
                </span>
                <span className="text-footnote text-label-secondary">
                    per month
                </span>
            </div>
            <Button variant="accent">Upgrade</Button>
        </ShowcaseCard>
    )
}

function Checklist({ theme }: ShowcaseCardBodyProps) {
    const [done, setDone] = useState([true, false, false])
    const items = ["Pick a palette", "Review copy", "Ship it"]
    return (
        <ShowcaseCard theme={theme} title="Launch list">
            {items.map((item, index) => (
                <Toggle
                    key={item}
                    style="checkbox"
                    label={item}
                    checked={done[index]}
                    onChange={(checked) =>
                        setDone((current) =>
                            current.map((value, at) =>
                                at === index ? checked : value
                            )
                        )
                    }
                />
            ))}
        </ShowcaseCard>
    )
}

function Tags({ theme }: ShowcaseCardBodyProps) {
    return (
        <ShowcaseCard theme={theme} title="Tags">
            <div className="flex flex-wrap gap-2">
                <Chip tone="accent">Design</Chip>
                <Chip tone="neutral">Research</Chip>
                <Chip tone="accent">Launch</Chip>
                <Chip tone="neutral">Q4</Chip>
                <Chip tone="neutral">Mobile</Chip>
            </div>
            <Button variant="outline">Add a tag</Button>
        </ShowcaseCard>
    )
}

function Player({ theme }: ShowcaseCardBodyProps) {
    const [playing, setPlaying] = useState(true)
    return (
        <ShowcaseCard theme={theme} title="Now playing">
            <div className="flex flex-col">
                <span className="text-subheadline font-semibold">
                    Morning light
                </span>
                <span className="text-footnote text-label-secondary">
                    Quiet Rooms
                </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-fill">
                <div className="h-full w-2/5 rounded-full bg-accent" />
            </div>
            <div className="flex items-center justify-center gap-3">
                <IconButton label="Previous" variant="ghost">
                    <HugeiconsIcon
                        icon={PreviousIcon}
                        size={20}
                    />
                </IconButton>
                <IconButton
                    label={playing ? "Pause" : "Play"}
                    variant="accent"
                    size="icon-lg"
                    onClick={() =>
                        setPlaying((value) => !value)
                    }
                >
                    <HugeiconsIcon
                        icon={playing ? PauseIcon : PlayIcon}
                        size={22}
                    />
                </IconButton>
                <IconButton label="Next" variant="ghost">
                    <HugeiconsIcon
                        icon={NextIcon}
                        size={20}
                    />
                </IconButton>
            </div>
        </ShowcaseCard>
    )
}

function Storage({ theme }: ShowcaseCardBodyProps) {
    const parts = [
        {
            label: "Photos",
            share: "w-[42%]",
            tone: "bg-accent",
        },
        {
            label: "Docs",
            share: "w-[18%]",
            tone: "bg-accent/55",
        },
        {
            label: "Other",
            share: "w-[12%]",
            tone: "bg-label-tertiary",
        },
    ]
    return (
        <ShowcaseCard theme={theme} title="Storage">
            <div className="flex items-baseline justify-between">
                <span className="text-title3 font-bold tabular-nums">
                    72 GB
                </span>
                <span className="text-footnote text-label-secondary">
                    of 100 GB
                </span>
            </div>
            <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-fill">
                {parts.map((part) => (
                    <div
                        key={part.label}
                        className={cn(
                            "h-full",
                            part.share,
                            part.tone
                        )}
                    />
                ))}
            </div>
            <div className="flex gap-3 text-footnote text-label-secondary">
                {parts.map((part) => (
                    <span
                        key={part.label}
                        className="flex items-center gap-1.5"
                    >
                        <span
                            className={cn(
                                "size-2 rounded-full",
                                part.tone
                            )}
                        />
                        {part.label}
                    </span>
                ))}
            </div>
        </ShowcaseCard>
    )
}

function VerifyCode({ theme }: ShowcaseCardBodyProps) {
    return (
        <ShowcaseCard theme={theme} title="Enter the code">
            <div className="flex justify-between gap-1.5">
                {["4", "8", "1", "5", "", ""].map(
                    (digit, index) => (
                        <span
                            key={index}
                            className={cn(
                                "flex h-11 w-9 items-center justify-center rounded-xl bg-fill text-headline font-semibold tabular-nums",
                                index === 4 &&
                                    "ring-2 ring-accent"
                            )}
                        >
                            {digit}
                        </span>
                    )
                )}
            </div>
            <Button
                variant="accent"
                onClick={() =>
                    toast.success("Verified (just a demo)")
                }
            >
                Verify
            </Button>
        </ShowcaseCard>
    )
}

function Devices({ theme }: ShowcaseCardBodyProps) {
    return (
        <ShowcaseCard theme={theme} title="Devices">
            <StatusIndicator state="saved">
                MacBook · up to date
            </StatusIndicator>
            <StatusIndicator state="syncing">
                iPhone · syncing
            </StatusIndicator>
            <StatusIndicator state="offline">
                iPad · offline
            </StatusIndicator>
        </ShowcaseCard>
    )
}

/** The second marquee row: none of these appear in the first. */
export const showcaseRowTwo = [
    Billing,
    Checklist,
    Tags,
    Player,
    Storage,
    VerifyCode,
    Devices,
] as const
