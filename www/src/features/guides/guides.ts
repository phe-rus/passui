export type GuideSlug =
	| "introduction"
	| "installation"
	| "theming"
	| "typeset"
	| "skills";

export interface Guide {
	slug: GuideSlug;
	title: string;
	summary: string;
	path: string;
}

/** Getting started, in sidebar order. */
export const guides: readonly Guide[] = [
	{
		slug: "introduction",
		title: "Introduction",
		summary: "What Passui is, what it is made of, and the ideas behind it.",
		path: "/docs/introduction",
	},
	{
		slug: "installation",
		title: "Installation",
		summary:
			"Set up any React app with the Passui CLI, create a starter, or install manually.",
		path: "/docs/installation",
	},
	{
		slug: "theming",
		title: "Theming",
		summary:
			"Light and dark, seven accents, platform looks, and the colour roles behind them.",
		path: "/docs/theming",
	},
	{
		slug: "typeset",
		title: "Typeset",
		summary:
			"Text styles named as SwiftUI names them, and the typeset utility for long form writing.",
		path: "/docs/typeset",
	},
	{
		slug: "skills",
		title: "Skills",
		summary:
			"Give AI agents Passui's rules and components: a skill, llms.txt and Markdown for every page.",
		path: "/docs/skills",
	},
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
