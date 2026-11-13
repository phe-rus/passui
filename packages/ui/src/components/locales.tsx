"use client";

import { GlobeIcon } from "@passui/icons/globe";
import { useMemo } from "react";
import { cx } from "../lib/cx";
import { getNativeLanguageName } from "../lib/language";
import { Select } from "./select";

export type LocalesSize = "sm" | "md" | "lg";

const widths: Record<LocalesSize, string> = {
	sm: "w-36",
	md: "w-44",
	lg: "w-56",
};

export type LocalesProps<L extends string> = {
	/** Language tags to offer, such as `["en", "fr"]`. Each is named in its own language. */
	locales: readonly L[];
	locale: L;
	onSelect: (locale: L) => void;
	/** Accessible name for the control. */
	label: string;
	/** Width of the control. @default "md" */
	size?: LocalesSize;
	className?: string;
};

/**
 * A language list: the current language on a globe trigger, every choice named
 * in its own language. It sits in the page where you put it and opens like a
 * Select, so keyboard, typeahead and dismissal come from the same parts.
 */
export function Locales<L extends string>({
	locales,
	locale,
	onSelect,
	label,
	size = "md",
	className,
}: LocalesProps<L>) {
	const items = useMemo(
		() =>
			Array.from(locales, (value) => ({
				value,
				label: getNativeLanguageName(value),
			})),
		[locales],
	);
	return (
		<Select
			data-slot="locales"
			aria-label={label}
			icon={<GlobeIcon size={16} />}
			items={items}
			value={locale}
			onValueChange={(next) => {
				if (next && next !== locale) onSelect(next as L);
			}}
			className={cx(widths[size], className)}
		/>
	);
}
