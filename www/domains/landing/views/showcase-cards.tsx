import {
    Button,
    Chip,
    LabeledContent,
    SearchField,
    SegmentedControl,
    StatusIndicator,
    TextField,
    Toggle,
    toast,
} from "@passui/react"
import { cn } from "@passui/react/cn"
import { StatTile } from "@passui/react/stat-tile"
import { type ReactNode, useState } from "react"
import { accentNames } from "@/domains/settings"
import { getThemeStyle } from "../get-theme-style"
import type {
    ShowcaseCardBodyProps,
    ShowcaseTheme,
} from "../types"

type ShowcaseCardProps = {
    theme: ShowcaseTheme
    title: string
    children: ReactNode
}

/** One frame for every card, so a row reads as a set. */
export function ShowcaseCard({
    theme,
    title,
    children,
}: ShowcaseCardProps) {
    return (
        <div
            data-theme={theme.scheme}
            style={getThemeStyle(theme)}
            className="flex h-64 w-72 shrink-0 flex-col gap-4 rounded-4xl bg-elevated p-5 text-label shadow-[0_1px_2px_rgb(0_0_0/0.05),0_4px_12px_-6px_rgb(0_0_0/0.08)] ring-1 ring-separator/70"
        >
            <div className="flex items-center justify-between gap-3">
                <span className="truncate text-headline font-semibold">
                    {title}
                </span>
                <Chip tone="accent">
                    {accentNames[theme.accent]}
                </Chip>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-3">
                {children}
            </div>
        </div>
    )
}

function SignIn({ theme }: ShowcaseCardBodyProps) {
    const [pending, setPending] = useState(false)
    return (
        <ShowcaseCard theme={theme} title="Welcome back">
            <TextField
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
            />
            <Button
                variant="accent"
                isPending={pending}
                onClick={() => {
                    setPending(true)
                    window.setTimeout(() => {
                        setPending(false)
                        toast.success(
                            "Signed in (just a demo)"
                        )
                    }, 900)
                }}
            >
                Continue
            </Button>
        </ShowcaseCard>
    )
}

function Settings({ theme }: ShowcaseCardBodyProps) {
    const [sync, setSync] = useState(true)
    const [sound, setSound] = useState(false)
    const [size, setSize] = useState<"s" | "m" | "l">("m")
    return (
        <ShowcaseCard theme={theme} title="Settings">
            <LabeledContent label="Sync">
                <Toggle
                    checked={sync}
                    onChange={setSync}
                    label="Sync"
                    labelHidden
                />
            </LabeledContent>
            <LabeledContent label="Sounds">
                <Toggle
                    checked={sound}
                    onChange={setSound}
                    label="Sounds"
                    labelHidden
                />
            </LabeledContent>
            <SegmentedControl
                value={size}
                onChange={setSize}
                label="Text size"
                options={[
                    { value: "s", label: "Small" },
                    { value: "m", label: "Medium" },
                    { value: "l", label: "Large" },
                ]}
            />
        </ShowcaseCard>
    )
}

function Stats({ theme }: ShowcaseCardBodyProps) {
    return (
        <ShowcaseCard theme={theme} title="This week">
            <StatTile
                label="Active people"
                value={1284}
                caption="Up 12% on last week"
            />
            <StatusIndicator state="saved">
                All changes synced
            </StatusIndicator>
        </ShowcaseCard>
    )
}

function Upload({ theme }: ShowcaseCardBodyProps) {
    return (
        <ShowcaseCard theme={theme} title="Uploading">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-footnote text-label-secondary">
                    <span>launch-video.mp4</span>
                    <span className="tabular-nums">68%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-fill">
                    <div className="h-full w-[68%] rounded-full bg-accent" />
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    className="flex-1"
                >
                    Pause
                </Button>
                <Button variant="ghost" className="flex-1">
                    Cancel
                </Button>
            </div>
        </ShowcaseCard>
    )
}

function Profile({ theme }: ShowcaseCardBodyProps) {
    const [following, setFollowing] = useState(false)
    return (
        <ShowcaseCard theme={theme} title="Profile">
            <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-headline font-bold text-accent-text">
                    AK
                </span>
                <div className="flex min-w-0 flex-col">
                    <span className="truncate text-subheadline font-semibold">
                        Aiko Kamado
                    </span>
                    <span className="truncate text-footnote text-label-secondary">
                        Product designer
                    </span>
                </div>
            </div>
            <Button
                variant={following ? "secondary" : "accent"}
                onClick={() =>
                    setFollowing((value) => !value)
                }
            >
                {following ? "Following" : "Follow"}
            </Button>
        </ShowcaseCard>
    )
}

function Search({ theme }: ShowcaseCardBodyProps) {
    return (
        <ShowcaseCard theme={theme} title="Search">
            <SearchField
                placeholder="Find a file"
                aria-label="Find a file"
            />
            <ul className="m-0 flex list-none flex-col gap-1 p-0 text-subheadline">
                {["Brand guide", "Q4 roadmap"].map(
                    (item, index) => (
                        <li
                            key={item}
                            className={cn(
                                "rounded-xl px-3 py-2",
                                index === 0 &&
                                    "bg-accent-soft text-accent-text"
                            )}
                        >
                            {item}
                        </li>
                    )
                )}
            </ul>
        </ShowcaseCard>
    )
}

function Confirm({ theme }: ShowcaseCardBodyProps) {
    return (
        <ShowcaseCard theme={theme} title="Delete draft?">
            <p className="text-callout text-label-secondary">
                This draft and its comments will be removed
                for everyone.
            </p>
            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    className="flex-1"
                >
                    Keep
                </Button>
                <Button
                    variant="destructive"
                    className="flex-1"
                >
                    Delete
                </Button>
            </div>
        </ShowcaseCard>
    )
}

/** The first marquee row; the second row has its own cards. */
export const showcaseRowOne = [
    SignIn,
    Settings,
    Stats,
    Upload,
    Profile,
    Search,
    Confirm,
] as const
