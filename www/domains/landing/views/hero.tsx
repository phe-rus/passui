import { spring } from "@passui/react"
import { buttonStyle } from "@passui/react/button"
import { cn } from "@passui/react/cn"
import { accents } from "@passui/react/tokens"
import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import type { ReactNode } from "react"
import { accentNames } from "@/domains/settings"
import type { AccentCycle } from "../types"
import { accentOrder } from "../use-accent-cycle"
import {
    ComposerScene,
    OfferChip,
    PlayerScene,
    ProductScene,
    RewardsScene,
    ShippingToggle,
} from "./hero-scenes"

type HeroProps = {
    cycle: AccentCycle
}

type FloatProps = {
    className?: string
    /** Which side it slides in from. */
    from: "left" | "right"
    delay: number
    /** Seconds for one gentle bob up and down. */
    bob: number
    children: ReactNode
}

// a dotless i: the sun takes the place of its dot
const letters = ["p", "a", "s", "s", "u", "ı"] as const

/** Slides in once, then drifts gently, like it is floating. */
function Float({
    className,
    from,
    delay,
    bob,
    children,
}: FloatProps) {
    return (
        <motion.div
            className={cn("absolute", className)}
            initial={{
                opacity: 0,
                x: from === "left" ? -80 : 80,
                y: 40,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ ...spring.smooth, delay }}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: bob,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: delay + 0.6,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

/** The wordmark's sun, rising into place over the i. */
function Sun() {
    return (
        <motion.span
            aria-hidden="true"
            initial={{ y: "0.6em", opacity: 0, scale: 0.4 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ ...spring.bouncy, delay: 0.45 }}
            className="absolute top-[0.02em] left-1/2 size-[0.24em] -translate-x-1/2 rounded-full bg-[#d16988] [@media(prefers-color-scheme:dark)]:bg-[#e8b4bb]"
        />
    )
}

export function Hero({ cycle }: HeroProps) {
    return (
        <section
            aria-labelledby="hero-title"
            className="relative isolate -mt-16 overflow-hidden bg-[color-mix(in_srgb,var(--color-accent)_24%,var(--color-background))] pt-32 pb-48 transition-colors duration-700 md:pt-36 lg:min-h-[48rem]"
            onFocus={() => cycle.hold(true)}
            onBlur={() => cycle.hold(false)}
        >
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
                <h1
                    id="hero-title"
                    aria-label="Passui"
                    className="flex font-brand text-[clamp(5rem,17vw,9.5rem)] leading-[0.9] font-extrabold tracking-[-0.055em] text-label"
                >
                    {letters.map((letter, index) => (
                        <motion.span
                            key={`${letter}-${index}`}
                            aria-hidden="true"
                            initial={{
                                opacity: 0,
                                y: 60,
                                filter: "blur(12px)",
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                            }}
                            transition={{
                                ...spring.bouncy,
                                delay: 0.08 * index,
                            }}
                            className="relative inline-block"
                        >
                            {letter}
                            {letter === "ı" && <Sun />}
                        </motion.span>
                    ))}
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        ...spring.smooth,
                        delay: 0.35,
                    }}
                    className="mt-5 text-[clamp(1.35rem,3.4vw,2.1rem)] leading-tight tracking-tight text-label"
                >
                    Native controls for the web,
                    <br />
                    <strong className="font-bold">
                        tuned to feel at home everywhere
                    </strong>
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        ...spring.smooth,
                        delay: 0.5,
                    }}
                    className="mt-8 flex flex-col items-center gap-4"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            to="/components/$slug"
                            params={{ slug: "button" }}
                            className={buttonStyle({
                                size: "lg",
                            })}
                        >
                            Get started
                        </Link>
                        <Link
                            to="/"
                            hash="components"
                            className={buttonStyle({
                                size: "lg",
                                variant: "secondary",
                            })}
                        >
                            Browse components
                        </Link>
                    </div>
                    <p className="text-footnote text-label-secondary">
                        Early preview · Built with React and
                        Tailwind CSS
                    </p>
                </motion.div>
            </div>

            {/* scenes around the edges, desktop only, like Astryx */}
            <div className="hidden lg:block">
                <Float
                    from="left"
                    delay={0.7}
                    bob={7}
                    className="top-[34%] left-[max(0.5rem,calc(50%-39rem))] z-0"
                >
                    <OfferChip className="-mb-1 ml-3" />
                    <PlayerScene className="mt-2" />
                </Float>
                <Float
                    from="left"
                    delay={0.85}
                    bob={6}
                    className="top-[70%] left-[max(15rem,calc(50%-24.5rem))] z-10"
                >
                    <ComposerScene />
                </Float>
                <Float
                    from="right"
                    delay={0.75}
                    bob={8}
                    className="top-[30%] right-[max(0.5rem,calc(50%-39rem))] z-0"
                >
                    <div className="flex justify-end">
                        <ShippingToggle className="mr-2 mb-2" />
                    </div>
                    <ProductScene />
                </Float>
                <Float
                    from="right"
                    delay={0.9}
                    bob={6.5}
                    className="top-[70%] right-[max(14rem,calc(50%-25.5rem))] z-10"
                >
                    <RewardsScene />
                </Float>
            </div>

            {/* on smaller screens, two scenes in a row */}
            <div className="no-scrollbar relative z-10 mt-12 flex justify-start gap-4 overflow-x-auto px-4 pb-2 sm:justify-center lg:hidden">
                <PlayerScene className="shrink-0" />
                <ProductScene className="shrink-0" />
            </div>

            {/* the theme indicator, like a carousel */}
            <fieldset className="absolute inset-x-0 bottom-24 z-10 flex items-center justify-center gap-2">
                <legend className="sr-only">
                    Accent color
                </legend>
                {accentOrder.map((id) => {
                    const current = id === cycle.accent
                    return (
                        <button
                            key={id}
                            type="button"
                            aria-label={accentNames[id]}
                            aria-pressed={current}
                            onClick={() => cycle.select(id)}
                            className={cn(
                                "h-2.5 cursor-pointer rounded-full ring-1 ring-black/10 transition-all duration-500",
                                current ? "w-8" : "w-2.5"
                            )}
                            style={{
                                backgroundColor:
                                    accents[id].light.accent,
                            }}
                        />
                    )
                })}
            </fieldset>
        </section>
    )
}
