import { Button } from "@passui/react/button";
import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useState } from "react";
import { Bento } from "@/components/home/bento";
import { Changelog } from "@/components/home/changelog";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { PlaygroundTeaser } from "@/components/home/playground-teaser";
import { Reveal } from "@/components/home/reveal";
import { ShowcaseMarquee } from "@/components/home/showcase-marquee";
import { useAccentCycle } from "@/features/home/lib/use-accent-cycle";
import { getPageHead } from "@/features/seo/lib/seo";

export const Route = createFileRoute("/(marketing)/")({
	head: () =>
		getPageHead(
			"/",
			"Passui · Native controls for the web",
			"Native React controls on Zag.js with an Apple 2026 look. Import one component and pay only for it.",
		),
	component: RouteComponent,
});

function RouteComponent() {
	const [paused, setPaused] = useState(false);
	const cycle = useAccentCycle(3800, paused);
	return (
		<MotionConfig reducedMotion="user">
			<Hero cycle={cycle} />
			{/* a sheet that rises over the hero */}
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
