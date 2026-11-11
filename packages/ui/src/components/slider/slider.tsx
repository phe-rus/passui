import { type ComponentProps, useId } from "react";
import { cn } from "../../lib/class-names";
import { clampRange } from "../../lib/range-value";

export type SliderSize = "sm" | "md" | "lg";

const labelSizes: Record<SliderSize, string> = {
	sm: "text-footnote font-semibold text-label",
	md: "text-subheadline font-semibold text-label",
	lg: "text-body font-semibold text-label",
};
const inputHeights: Record<SliderSize, string> = {
	sm: "h-9",
	md: "h-11",
	lg: "h-13",
};
const descriptionSizes: Record<SliderSize, string> = {
	sm: "text-caption2 text-label-secondary",
	md: "text-footnote text-label-secondary",
	lg: "text-subheadline text-label-secondary",
};
// Track height, thumb size, and the webkit thumb's -mt offset (derived from
// (thumb - track) / 2: md (20-6)/2=7, sm (16-4)/2=6, lg (24-8)/2=8).
const webkitTrack: Record<SliderSize, string> = {
	sm: "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-separator",
	md: "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-separator",
	lg: "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-separator",
};
const webkitThumb: Record<SliderSize, string> = {
	sm: "[&::-webkit-slider-thumb]:-mt-[6px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:bg-elevated [&::-webkit-slider-thumb]:shadow-sm",
	md: "[&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:bg-elevated [&::-webkit-slider-thumb]:shadow-sm",
	lg: "[&::-webkit-slider-thumb]:-mt-[8px] [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:bg-elevated [&::-webkit-slider-thumb]:shadow-sm",
};
const mozTrack: Record<SliderSize, string> = {
	sm: "[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-separator",
	md: "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-separator",
	lg: "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-separator",
};
const mozProgress: Record<SliderSize, string> = {
	sm: "[&::-moz-range-progress]:h-1 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-accent",
	md: "[&::-moz-range-progress]:h-1.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-accent",
	lg: "[&::-moz-range-progress]:h-2 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-accent",
};
const mozThumb: Record<SliderSize, string> = {
	sm: "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:bg-elevated",
	md: "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:bg-elevated",
	lg: "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:bg-elevated",
};

export interface SliderProps
	extends Omit<
		ComponentProps<"input">,
		| "type"
		| "value"
		| "defaultValue"
		| "onChange"
		| "min"
		| "max"
		| "step"
		| "size"
	> {
	value: number;
	onChange: (value: number) => void;
	label: string;
	min?: number;
	max?: number;
	step?: number;
	description?: string;
	/** Provides a localized, spoken description of the current value. */
	formatValue?: (value: number) => string;
	/** Track height, thumb size and label/description text scale. @default "md" */
	size?: SliderSize;
}

/** Native keyboard, touch and pointer behavior with Passui's control treatment. */
export function Slider({
	value,
	onChange,
	label,
	min = 0,
	max = 100,
	step = 1,
	description,
	formatValue,
	size = "md",
	id: suppliedId,
	className,
	disabled,
	...props
}: SliderProps) {
	const generatedId = useId();
	const id = suppliedId ?? generatedId;
	const upper = Math.max(min, max);
	const current = clampRange(value, min, upper);

	return (
		<div
			className={cn("flex min-w-0 flex-col gap-2", disabled && "opacity-45")}
		>
			<label htmlFor={id} className={labelSizes[size]}>
				{label}
			</label>
			<input
				{...props}
				id={id}
				type="range"
				min={min}
				max={upper}
				step={step > 0 ? step : 1}
				value={current}
				disabled={disabled || upper === min}
				aria-valuetext={formatValue?.(current)}
				aria-describedby={description ? `${id}-description` : undefined}
				onChange={(event) => onChange(Number(event.currentTarget.value))}
				className={cn(
					"accent-accent w-full min-w-0 cursor-pointer appearance-none bg-transparent",
					inputHeights[size],
					"focus-visible:outline-accent-text focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2",
					webkitTrack[size],
					webkitThumb[size],
					mozTrack[size],
					mozProgress[size],
					mozThumb[size],
					className,
				)}
			/>
			{description && (
				<p id={`${id}-description`} className={descriptionSizes[size]}>
					{description}
				</p>
			)}
		</div>
	);
}
