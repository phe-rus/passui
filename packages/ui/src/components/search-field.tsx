"use client";

import { SearchIcon } from "@passui/icons/search";
import type { ComponentProps } from "react";
import { cx } from "../lib/cx";

export type SearchFieldSize = "sm" | "md" | "lg";

const pill: Record<SearchFieldSize, string> = {
	sm: "h-7.5 gap-1.5 px-3 text-footnote",
	md: "h-8.5 gap-2 px-3.5 text-footnote",
	lg: "h-9.5 gap-2.5 px-4 text-subheadline",
};

/** The width a collapsed field keeps: a round button the size of the control. */
const collapsed: Record<SearchFieldSize, string> = {
	sm: "w-7.5",
	md: "w-8.5",
	lg: "w-9.5",
};

const icons: Record<SearchFieldSize, number> = { sm: 13, md: 14, lg: 16 };

export type SearchFieldProps = Omit<ComponentProps<"input">, "size"> & {
	/** Height, icon and text, from the shared control scale. @default "md" */
	size?: SearchFieldSize;
	/**
	 * Rests as a round search button and opens into the field when focused or
	 * when it holds text. Needs a `width` class on the field to open to.
	 * @default false
	 */
	collapsible?: boolean;
};

/**
 * A search input in a full pill. Native `type="search"`, so the clear button,
 * Escape and mobile search keyboards come with it. It can rest as a round
 * button and open on focus, in CSS only.
 */
export function SearchField({
	size = "md",
	collapsible = false,
	placeholder = "Search",
	className,
	...props
}: SearchFieldProps) {
	return (
		<label
			data-slot="search-field"
			data-collapsible={collapsible || undefined}
			className={cx(
				"control-field group flex max-w-full items-center rounded-full text-label-tertiary focus-within:ring-2 focus-within:ring-accent/70",
				pill[size],
				!collapsible && "w-full",
				collapsible &&
					cx(
						"spring-smooth justify-start overflow-hidden transition-[width] motion-reduce:transition-none",
						collapsed[size],
						"focus-within:w-full has-[input:not(:placeholder-shown)]:w-full",
					),
				className,
			)}
		>
			<SearchIcon size={icons[size]} aria-hidden="true" className="shrink-0" />
			<input
				type="search"
				placeholder={placeholder}
				aria-label={props["aria-labelledby"] ? undefined : placeholder}
				className={cx(
					"min-w-0 grow bg-transparent text-label outline-none placeholder:text-label-tertiary",
					collapsible &&
						"opacity-0 transition-opacity group-focus-within:opacity-100 group-has-[input:not(:placeholder-shown)]:opacity-100",
				)}
				{...props}
			/>
		</label>
	);
}
