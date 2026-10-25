import {
    Button,
    spring,
    Chip,
    SearchField,
    SwatchPicker,
    Toggle,
} from "@passui/react"
import { cn } from "@passui/react/cn"
import { accents } from "@passui/react/tokens"
import { motion } from "motion/react"
import { type ReactNode, useState } from "react"
import { accentNames } from "@/domains/settings"
import type { AccentCycle } from "../types"
import { accentOrder } from "../use-accent-cycle"

type TileProps = {
    title: string
    body: string
    className?: string
    /** Seconds to wait, so the tiles arrive one after another. */
    delay?: number
    children: ReactNode
}

type BentoProps = {
    cycle: AccentCycle
}

function Tile({
    title,
    body,
    className,
    delay = 0,
    children,
}: TileProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...spring.smooth, delay }}
            className={cn(
                "flex flex-col gap-6 overflow-hidden rounded-5xl bg-accent-soft/70 p-7 transition-colors duration-700 md:p-9",
                className
            )}
        >
            <div className="flex flex-col gap-2">
                <h3 className="text-title3 font-semibold tracking-tight text-label">
                    {title}
                </h3>
                <p className="max-w-sm text-callout text-label-secondary">
                    {body}
                </p>
            </div>
            <div className="mt-auto">{children}</div>
        </motion.article>
    )
}

function ComponentsDemo() {
    const [on, setOn] = useState(true)
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
                <Chip tone="accent">Accent</Chip>
                <Chip tone="neutral">Neutral</Chip>
                <Toggle
                    checked={on}
                    onChange={setOn}
                    label="Demo toggle"
                    labelHidden
                />
            </div>
            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    className="flex-1"
                >
                    Secondary
                </Button>
                <Button className="flex-1">Primary</Button>
            </div>
            <SearchField
                placeholder="Search"
                aria-label="Search"
            />
        </div>
    )
}

function PlatformDemo() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <figure className="flex flex-col gap-2">
                <div className="relative h-28 overflow-hidden rounded-3xl bg-background ring-1 ring-separator/60">
                    <div className="glass absolute inset-x-3 bottom-3 flex h-9 items-center justify-around rounded-full">
                        <span className="size-2 rounded-full bg-accent" />
                        <span className="size-2 rounded-full bg-label-tertiary" />
                        <span className="size-2 rounded-full bg-label-tertiary" />
                    </div>
                </div>
                <figcaption className="text-footnote text-label-secondary">
                    Apple: a floating glass capsule
                </figcaption>
            </figure>
            <figure className="flex flex-col gap-2">
                <div className="relative h-28 overflow-hidden rounded-3xl bg-background ring-1 ring-separator/60">
                    <div className="absolute inset-x-0 bottom-0 flex h-11 items-center justify-around border-separator/60 border-t bg-elevated">
                        <span className="h-5 w-10 rounded-full bg-accent-soft" />
                        <span className="size-2 rounded-full bg-label-tertiary" />
                        <span className="size-2 rounded-full bg-label-tertiary" />
                    </div>
                </div>
                <figcaption className="text-footnote text-label-secondary">
                    Android: a flush, solid bar
                </figcaption>
            </figure>
        </div>
    )
}

function TokensDemo() {
    return (
        <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-large-title font-bold text-label">
                    Title
                </span>
                <span className="text-headline font-semibold text-label">
                    Headline
                </span>
                <span className="text-body text-label-secondary">
                    Body
                </span>
                <span className="text-footnote text-label-tertiary">
                    Footnote
                </span>
            </div>
            <div className="flex items-end gap-2">
                {[
                    "rounded-md",
                    "rounded-2xl",
                    "rounded-4xl",
                ].map((radius) => (
                    <span
                        key={radius}
                        className={cn(
                            "size-12 bg-accent transition-colors duration-700",
                            radius
                        )}
                    />
                ))}
            </div>
        </div>
    )
}

export function Bento({ cycle }: BentoProps) {
    return (
        <section
            id="components"
            aria-labelledby="bento-title"
            className="mx-auto grid w-full max-w-6xl scroll-mt-24 gap-5 px-4 md:grid-cols-3 md:px-6"
        >
            <div className="flex flex-col gap-4 md:row-span-1 md:py-4">
                <h2
                    id="bento-title"
                    className="text-[clamp(2rem,4vw,2.6rem)] leading-[1.08] font-bold tracking-tight text-label"
                >
                    Feels native.
                    <br />
                    Looks like you.
                    <br />
                    Works everywhere.
                </h2>
                <p className="max-w-sm text-body text-label-secondary">
                    Controls with the care of a native app,
                    colors you can make your own, and
                    conventions each platform's people already
                    know.
                </p>
            </div>
            <Tile
                delay={0.08}
                title="Thirty native components"
                body="Buttons, toggles, pickers, sheets and more, written as readable React with light, dark and Reduce Motion built in."
            >
                <ComponentsDemo />
            </Tile>
            <Tile
                delay={0.16}
                title="Seven accents, light and dark"
                body="Pick one and the whole page follows. Every pairing is checked for contrast."
            >
                <SwatchPicker
                    value={cycle.accent}
                    onChange={cycle.select}
                    label="Accent color"
                    options={accentOrder.map((id) => ({
                        value: id,
                        label: accentNames[id],
                        color: accents[id].swatch,
                        ink: accents[id].light.accentText,
                    }))}
                />
            </Tile>
            <Tile
                className="md:col-span-2"
                delay={0.24}
                title="At home on every platform"
                body="Apple devices get glass; Android keeps the flush, solid bars its people expect. Set once, before the first paint."
            >
                <PlatformDemo />
            </Tile>
            <Tile
                delay={0.32}
                title="Tokens, not one-off values"
                body="Dynamic Type sizes, concentric radii and springs, named as SwiftUI names them."
            >
                <TokensDemo />
            </Tile>
        </section>
    )
}
