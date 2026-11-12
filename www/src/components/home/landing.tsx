import { Button } from "@passui/react/button";
import { MotionConfig } from "motion/react";
import { useState } from "react";
import { useAccentCycle } from "@/features/home/lib/use-accent-cycle";
import { Bento } from "./bento";
import { Changelog } from "./changelog";
import { ClosingCta } from "./closing-cta";
import { Hero } from "./hero";
import { PlaygroundTeaser } from "./playground-teaser";
import { Reveal } from "./reveal";
import { ShowcaseMarquee } from "./showcase-marquee";

/** The marketing home page: Passui demonstrating itself. */
export function Landing() {
	const [paused, setPaused] = useState(false);
	const cycle = useAccentCycle(3800, paused);
	return (
		<MotionConfig reducedMotion="user">
			<Hero cycle={cycle} paused={paused} />
			{/* a white sheet that rises over the hero */}
			<div className="bg-background relative -mt-12 flex flex-col gap-24 rounded-t-[2.5rem] pt-16 pb-24 md:-mt-16 md:gap-32 md:rounded-t-[3rem] md:pt-24">
				<Reveal>
					<div className="mx-auto mb-3 flex max-w-6xl justify-end px-4 md:px-6">
						<Button
							size="sm"
							variant="secondary"
							aria-pressed={paused}
							onClick={() => setPaused((value) => !value)}
						>
							{paused ? "Resume animations" : "Pause animations"}
						</Button>
					</div>
					<ShowcaseMarquee paused={paused} />
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
	);
}
