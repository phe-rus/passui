import {
	BookIcon,
	DownloadIcon,
	LayoutIcon,
	SparkleIcon,
	ThemingIcon,
	TypesetIcon,
} from "@passui/react/icons";
import type { Guide, GuideSlug } from "../types";

/** Getting started, in sidebar order. */
export const guides: readonly Guide[] = [
	{
		slug: "introduction",
		title: "Introduction",
		summary: "What Passui is, what it's made of, and the ideas behind it.",
		path: "/docs/introduction",
		icon: BookIcon,
	},
	{
		slug: "installation",
		title: "Installation",
		summary:
			"Set up any React app with the Passui CLI, create a starter, or install manually.",
		path: "/docs/installation",
		icon: DownloadIcon,
	},
	{
		slug: "theming",
		title: "Theming",
		summary:
			"Light and dark, seven accents, platform looks, and the color roles behind them.",
		path: "/docs/theming",
		icon: ThemingIcon,
	},
	{
		slug: "typeset",
		title: "Typeset",
		summary:
			"Text styles named as SwiftUI names them, and the typeset utility for long-form writing.",
		path: "/docs/typeset",
		icon: TypesetIcon,
	},
	{
		slug: "skills",
		title: "Skills",
		summary:
			"Give AI agents Passui's rules and components: a skill, llms.txt and Markdown for every page.",
		path: "/docs/skills",
		icon: SparkleIcon,
	},
	{
		slug: "components",
		title: "Components",
		summary:
			"Every control, grouped by what it does, each with a live playground.",
		path: "/components",
		icon: LayoutIcon,
	},
];

export function getGuide(slug: string) {
	return guides.find(
		(guide): guide is Guide & { slug: GuideSlug } =>
			guide.slug === slug && guide.slug !== "components",
	);
}

/** The guides before and after this one, in sidebar order. */
export function getGuideNeighbours(slug: string) {
	const index = guides.findIndex((guide) => guide.slug === slug);
	return {
		previous: index > 0 ? guides[index - 1] : undefined,
		next: index >= 0 ? guides[index + 1] : undefined,
	};
}
