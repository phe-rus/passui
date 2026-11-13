import { type ComponentProps, createElement, type ElementType } from "react";
import { cx } from "../lib/cx";

/** Apple's Dynamic Type styles, from the smallest caption to a screen title. */
export type TextSize =
	| "caption2"
	| "caption"
	| "footnote"
	| "subheadline"
	| "callout"
	| "body"
	| "headline"
	| "title3"
	| "title2"
	| "title"
	| "large-title";

/** The theme role that colors the text. */
export type TextTone =
	| "default"
	| "secondary"
	| "tertiary"
	| "accent"
	| "success"
	| "warning"
	| "danger";

export type TextWeight = "normal" | "medium" | "semibold" | "bold";

const sizes: Record<TextSize, string> = {
	caption2: "text-caption2 leading-caption2",
	caption: "text-caption leading-caption",
	footnote: "text-footnote leading-footnote",
	subheadline: "text-subheadline leading-subheadline",
	callout: "text-callout leading-callout",
	body: "text-body leading-body",
	headline: "text-headline leading-headline",
	title3: "text-title3 leading-title3",
	title2: "text-title2 leading-title2",
	title: "text-title leading-title",
	"large-title": "text-large-title leading-large-title",
};

const tones: Record<TextTone, string> = {
	default: "text-label",
	secondary: "text-label-secondary",
	tertiary: "text-label-tertiary",
	accent: "text-accent-text",
	success: "text-success",
	warning: "text-warning",
	danger: "text-danger",
};

const weights: Record<TextWeight, string> = {
	normal: "font-normal",
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold",
};

export type TextElement =
	| "p"
	| "span"
	| "div"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "strong"
	| "em"
	| "small";

export type TextProps = Omit<ComponentProps<"p">, "color"> & {
	/** The element to render, so a heading keeps its place in the outline. @default "p" */
	as?: TextElement;
	/** A Dynamic Type style. @default "subheadline" */
	size?: TextSize;
	/** The theme role that colors it. @default "default" */
	tone?: TextTone;
	/** @default "normal" */
	weight?: TextWeight;
	/** Cuts it to one line with an ellipsis. @default false */
	truncate?: boolean;
};

/**
 * Text set in the theme's type scale and roles, so words on a page follow the
 * app's text size and colors without raw sizes or hex values. Pick the element
 * with `as`; the style and the element are separate choices.
 */
export function Text({
	as = "p",
	size = "subheadline",
	tone = "default",
	weight = "normal",
	truncate,
	className,
	...props
}: TextProps) {
	return createElement(as as ElementType, {
		"data-slot": "text",
		className: cx(
			"m-0",
			sizes[size],
			tones[tone],
			weights[weight],
			truncate && "truncate",
			className,
		),
		...props,
	});
}
