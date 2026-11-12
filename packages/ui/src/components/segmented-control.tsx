"use client";

import type { ReactNode } from "react";
import { cx } from "../lib/cx";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

export interface SegmentedOption {
	value: string;
	label: ReactNode;
	disabled?: boolean;
}

export interface SegmentedControlProps {
	options: SegmentedOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	"aria-label"?: string;
	className?: string;
}

/** Mutually exclusive choices in one pill. A single select `ToggleGroup`. */
export function SegmentedControl({
	options,
	value,
	defaultValue,
	onValueChange,
	"aria-label": ariaLabel,
	className,
}: SegmentedControlProps) {
	return (
		<ToggleGroup
			aria-label={ariaLabel}
			className={cx("w-fit", className)}
			size="sm"
			value={value === undefined ? undefined : [value]}
			defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
			deselectable={false}
			onValueChange={(next) => {
				if (next[0]) onValueChange?.(next[0]);
			}}
		>
			{options.map((o) => (
				<ToggleGroupItem key={o.value} value={o.value} disabled={o.disabled}>
					{o.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
