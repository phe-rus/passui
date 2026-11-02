import { MotionConfig } from "motion/react"
import { useAccentCycle } from "../use-accent-cycle"
import { Bento } from "./bento"
import { Changelog } from "./changelog"
import { ClosingCta } from "./closing-cta"
import { Hero } from "./hero"
import { PlaygroundTeaser } from "./playground-teaser"
import { Reveal } from "./reveal"
import { ShowcaseMarquee } from "./showcase-marquee"

/** The marketing home page: Passui demonstrating itself. */
export function Landing() {
    const cycle = useAccentCycle()
    return (
        <MotionConfig reducedMotion="user">
            <Hero cycle={cycle} />
            {/* a white sheet that rises over the hero */}
            <div className="relative -mt-12 flex flex-col gap-24 rounded-t-[2.5rem] bg-background pt-16 pb-24 md:-mt-16 md:gap-32 md:rounded-t-[3rem] md:pt-24">
                <Reveal>
                    <ShowcaseMarquee />
                </Reveal>
                <Bento cycle={cycle} />
                <Reveal>
                    <PlaygroundTeaser />
                </Reveal>
                <Reveal>
                    <Changelog />
                </Reveal>
                <Reveal>
                    <ClosingCta />
                </Reveal>
            </div>
        </MotionConfig>
    )
}
