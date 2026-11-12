import { cn } from "@passui/react/cn";
import type { ComponentType } from "react";
import { accentOrder } from "@/features/home/lib/use-accent-cycle";
import type {
	ShowcaseCardBodyProps,
	ShowcaseTheme,
} from "@/features/home/types";
import { showcaseRowOne } from "./showcase-cards";
import { showcaseRowTwo } from "./showcase-cards-two";

type MarqueeRowProps = {
	cards: readonly ComponentType<ShowcaseCardBodyProps>[];
	/** Shifts which accent each card wears, so the rows differ. */
	offset: number;
	reverse?: boolean;
	paused?: boolean;
};

function themeFor(index: number, offset: number): ShowcaseTheme {
	return {
		accent: accentOrder[(index + offset) % accentOrder.length],
		scheme: (index + offset) % 3 === 1 ? "dark" : "light",
	};
}

function MarqueeRow({ cards: set, offset, reverse, paused }: MarqueeRowProps) {
	const cards = set.map((Card, index) => (
		<Card key={index} theme={themeFor(index, offset)} />
	));
	return (
		<div className="group/row flex overflow-hidden py-3 motion-reduce:overflow-x-auto">
			{/* the set twice, sliding by exactly one set, loops seamlessly */}
			{[0, 1].map((copy) => (
				<div
					key={copy}
					aria-hidden={copy === 1 ? true : undefined}
					inert={copy === 1 ? true : undefined}
					className={cn(
						"flex shrink-0 gap-5 pe-5",
						"animate-[marquee_60s_linear_infinite] group-focus-within/row:[animation-play-state:paused] group-hover/row:[animation-play-state:paused]",
						paused && "[animation-play-state:paused]",
						reverse && "[animation-direction:reverse]",
						"motion-reduce:animate-none",
						copy === 1 && "motion-reduce:hidden",
					)}
				>
					{cards}
				</div>
			))}
		</div>
	);
}

/** Two rows of live components, every card in its own theme. */
export function ShowcaseMarquee({ paused = false }: { paused?: boolean }) {
	return (
		<div className="flex flex-col [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
			<MarqueeRow paused={paused} cards={showcaseRowOne} offset={0} />
			<MarqueeRow paused={paused} cards={showcaseRowTwo} offset={3} reverse />
		</div>
	);
}
