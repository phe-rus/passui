"use client";

import { CheckIcon } from "@passui/icons/check";
import { type AccentId, accents } from "@passui/tokens/accent";
import { useEffect, useState } from "react";
import { cx } from "../lib/cx";
import { RadioGroup, RadioGroupItem } from "./radio-group";

export interface SwatchPickerOption<T extends string> {
	value: T;
	label: string;
	/** Swatch background color. */
	color: string;
	/** Color of the selected checkmark. */
	ink: string;
}

export type SwatchPickerSize = "sm" | "md" | "lg";

const swatchSizes: Record<SwatchPickerSize, string> = {
	sm: "size-6",
	md: "size-8",
	lg: "size-10",
};
const checkSizes: Record<SwatchPickerSize, number> = {
	sm: 13,
	md: 16,
	lg: 19,
};
const captionText: Record<SwatchPickerSize, string> = {
	sm: "text-caption2",
	md: "text-caption2",
	lg: "text-caption",
};
const fieldsetGaps: Record<SwatchPickerSize, string> = {
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
};
const labelGaps: Record<SwatchPickerSize, string> = {
	sm: "gap-1",
	md: "gap-1.5",
	lg: "gap-2",
};

export interface SwatchPickerProps<T extends string> {
	value: T;
	options: ReadonlyArray<SwatchPickerOption<T>>;
	onChange: (value: T) => void;
	/** Accessible name for the group. */
	label: string;
	/** Custom classes for the swatch container. */
	className?: string;
	/** Swatch diameter, check icon and caption scale. @default "md" */
	size?: SwatchPickerSize;
}

/** Colour swatches with a check on the chosen one, built on `RadioGroup` so keyboard and form behaviour match. */
export function SwatchPicker<T extends string>({
	value,
	options,
	onChange,
	label,
	className,
	size = "md",
}: SwatchPickerProps<T>) {
	return (
		<RadioGroup
			aria-label={label}
			value={value}
			onValueChange={(next) => {
				if (!next) return;
				onChange(next as T);
			}}
			className={className}
		>
			<div className={cx("flex flex-wrap", fieldsetGaps[size])}>
				{options.map((option) => {
					const selected = option.value === value;
					return (
						<RadioGroupItem
							key={option.value}
							value={option.value}
							bare
							className={cx("flex flex-col items-center", labelGaps[size])}
						>
							<span
								className={cx(
									"ring-offset-elevated duration-fast group-focus-within:ring-accent flex items-center justify-center rounded-full ring-offset-1 transition-[box-shadow,transform] group-focus-within:ring-2 group-active:scale-95",
									swatchSizes[size],
									selected
										? "ring-label/70 ring-[1.5px]"
										: "group-hover:ring-separator ring-0 group-hover:ring-[1.5px]",
								)}
								style={{ background: option.color }}
							>
								{selected && (
									<span className="passui-swatch-check">
										<CheckIcon
											size={checkSizes[size]}
											strokeWidth={2.6}
											style={{ color: option.ink }}
										/>
									</span>
								)}
							</span>
							<span
								className={cx(
									captionText[size],
									selected ? "text-label font-semibold" : "text-label-tertiary",
								)}
							>
								{option.label}
							</span>
						</RadioGroupItem>
					);
				})}
			</div>
		</RadioGroup>
	);
}

export interface AccentPickerProps {
	/** Accessible name for the group. */
	label: string;
	/** The element that carries `data-accent`. Defaults to `<html>`, so every control follows. */
	target?: HTMLElement | null;
	/** Controlled accent. Leave out to let the picker own it. */
	value?: AccentId;
	onChange?: (value: AccentId) => void;
	/** Remembers the choice in localStorage under this key. Pass `false` to skip. @default "passui-accent" */
	storageKey?: string | false;
	/** Translated names for the accents. Falls back to the token names. */
	names?: Partial<Record<AccentId, string>>;
	size?: SwatchPickerSize;
	className?: string;
}

/**
 * Passui's seven accents as a swatch picker that retints the app. Choosing
 * one sets `data-accent` on the root, so buttons, switches, sliders, focus
 * rings, selection and the window ground all follow, and it survives a reload.
 */
export function AccentPicker({
	label,
	target,
	value,
	onChange,
	storageKey = "passui-accent",
	names,
	size,
	className,
}: AccentPickerProps) {
	const [own, setOwn] = useState<AccentId>("blush");
	const current = value ?? own;

	// Read the saved or current accent after mount, so server and browser agree on first paint.
	// biome-ignore lint/correctness/useExhaustiveDependencies: only the first mount adopts the stored choice.
	useEffect(() => {
		if (value) return;
		const root = target ?? document.documentElement;
		let saved: string | null = null;
		try {
			saved = storageKey ? localStorage.getItem(storageKey) : null;
		} catch {
			/* storage blocked */
		}
		const found = saved ?? root.dataset.accent;
		if (found && found in accents) setOwn(found as AccentId);
	}, []);

	useEffect(() => {
		(target ?? document.documentElement).dataset.accent = current;
	}, [current, target]);

	const options = Object.values(accents).map((accent) => ({
		value: accent.id,
		label: names?.[accent.id] ?? accent.name,
		color: accent.swatch,
		ink: accent.light.accentText,
	}));
	return (
		<SwatchPicker
			label={label}
			options={options}
			value={current}
			size={size}
			className={className}
			onChange={(next) => {
				setOwn(next);
				try {
					if (storageKey) localStorage.setItem(storageKey, next);
				} catch {
					/* storage blocked */
				}
				onChange?.(next);
			}}
		/>
	);
}
