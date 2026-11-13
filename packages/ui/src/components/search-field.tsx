"use client";

import { SearchIcon } from "@passui/icons/search";
import { type ComponentProps, type CSSProperties, useId } from "react";
import { cx } from "../lib/cx";

export type SearchFieldSize = "sm" | "md" | "lg";
export type SearchFieldVariant = "inset" | "floating";

/** Height, icon and text in px, from the shared control scale. */
const metrics: Record<
	SearchFieldSize,
	{ h: number; icon: number; text: string }
> = {
	sm: { h: 30, icon: 13, text: "text-footnote" },
	md: { h: 34, icon: 14, text: "text-footnote" },
	lg: { h: 38, icon: 16, text: "text-subheadline" },
};

export type SearchFieldProps = Omit<ComponentProps<"input">, "size"> & {
	/** Height, icon and text, from the shared control scale. @default "md" */
	size?: SearchFieldSize;
	/**
	 * Rests as a round search button and opens into the field when focused or
	 * when it holds text. Opens to the width of its container, so size a wrapper, not the field.
	 * @default false
	 */
	collapsible?: boolean;
	/** `inset` is a quiet filled field; `floating` is a glass pill that sits above content, like iOS 26's search. @default "inset" */
	variant?: SearchFieldVariant;
};

/**
 * A search input in a full pill. It is one box whose width is its state:
 * the lens sits at a fixed inset from the left edge, which at the closed
 * width happens to centre it in the circle, so opening is the box growing
 * around a mark that stayed put. Native `type="search"`, so the clear button,
 * Escape and mobile search keyboards come with it.
 */
export function SearchField({
	size = "md",
	collapsible = false,
	variant = "inset",
	placeholder = "Search",
	className,
	id,
	...props
}: SearchFieldProps) {
	const own = useId();
	const { h, icon, text } = metrics[size];
	const inset = (h - icon) / 2;
	const style = {
		height: h,
		"--search-h": `${h}px`,
		"--search-inset": `${inset}px`,
		"--search-text-start": `${inset + icon + 8}px`,
	} as CSSProperties;
	return (
		<label
			htmlFor={id ?? own}
			data-slot="search-field"
			data-variant={variant}
			data-collapsible={collapsible || undefined}
			style={style}
			className={cx(
				"group text-label-tertiary focus-within:ring-accent/70 relative flex max-w-full min-w-0 items-center rounded-full focus-within:ring-2",
				variant === "floating" ? "glass shadow-floating" : "control-field",
				text,
				!collapsible && "w-full",
				collapsible &&
					"spring-smooth w-(--search-h) cursor-pointer overflow-hidden transition-[width,scale] focus-within:w-full has-[input:not(:placeholder-shown)]:w-full active:scale-95 focus-within:active:scale-100 motion-reduce:transition-none motion-reduce:active:scale-100",
				className,
			)}
		>
			<SearchIcon
				size={icon}
				aria-hidden="true"
				className="pointer-events-none absolute start-(--search-inset) top-1/2 -translate-y-1/2"
			/>
			<input
				id={id ?? own}
				type="search"
				placeholder={placeholder}
				aria-label={props["aria-labelledby"] ? undefined : placeholder}
				className={cx(
					"text-label placeholder:text-label-tertiary h-full min-w-0 grow bg-transparent pe-3 ps-(--search-text-start) outline-none",
					collapsible &&
						"transition-[opacity,translate] duration-300 opacity-0 -translate-x-1 group-focus-within:opacity-100 group-focus-within:translate-x-0 group-has-[input:not(:placeholder-shown)]:opacity-100 group-has-[input:not(:placeholder-shown)]:translate-x-0 motion-reduce:transition-none",
				)}
				{...props}
			/>
		</label>
	);
}
