"use client";

import { CheckIcon } from "@passui/icons/check";
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
