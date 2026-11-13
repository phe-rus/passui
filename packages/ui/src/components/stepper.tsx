import { MinusIcon } from "@passui/icons/minus";
import { PlusIcon } from "@passui/icons/plus";
import { type ComponentProps, useId } from "react";
import { cx } from "../lib/cx";
import { haptic } from "../lib/haptics";
import { clampRange, stepRange } from "../lib/range-value";
import { RollingDigit } from "../lib/rolling-digit";

export type StepperSize = "sm" | "md" | "lg";

const labelText: Record<StepperSize, string> = {
	sm: "min-w-0 text-footnote text-label",
	md: "min-w-0 text-subheadline text-label",
	lg: "min-w-0 text-body text-label",
};
const outputText: Record<StepperSize, string> = {
	sm: "text-footnote tabular-nums text-label",
	md: "text-subheadline tabular-nums text-label",
	lg: "text-body tabular-nums text-label",
};
/** One cell of the control: a square the size of the control's height, glyph centred by flex. */
const cellSizes: Record<StepperSize, string> = {
	sm: "h-7.5 w-9 [@media(pointer:coarse)]:h-10 [@media(pointer:coarse)]:w-11",
	md: "h-8.5 w-10 [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-12",
	lg: "h-9.5 w-11 [@media(pointer:coarse)]:h-12 [@media(pointer:coarse)]:w-13",
};
const glyphSizes: Record<StepperSize, number> = { sm: 13, md: 15, lg: 17 };

function StepButton({
	kind,
	size,
	...props
}: {
	kind: "minus" | "plus";
	size: StepperSize;
} & Omit<ComponentProps<"button">, "children">) {
	const g = glyphSizes[size];
	return (
		<button
			type="button"
			data-slot="stepper-button"
			className={cx(
				"text-accent-text spring-snappy flex items-center justify-center outline-none transition-[background-color,scale] hover:bg-accent-soft focus-visible:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-inset active:scale-90 active:bg-accent-soft disabled:pointer-events-none disabled:text-label-tertiary disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100",
				cellSizes[size],
			)}
			{...props}
		>
			{kind === "plus" ? (
				<PlusIcon size={g} strokeWidth={2} />
			) : (
				<MinusIcon size={g} strokeWidth={2} />
			)}
		</button>
	);
}

export interface StepperProps {
	value: number;
	onChange: (value: number) => void;
	label: string;
	/** Localized accessible names for each action. */
	labels: { decrement: string; increment: string };
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	className?: string;
	/** Formats the displayed value. */
	formatValue?: (value: number) => string;
	/** Label, output and +/- button scale. @default "md" */
	size?: StepperSize;
}

/** Discrete increments with disabled boundary actions and a spoken value. */
export function Stepper({
	value,
	onChange,
	label,
	labels,
	min = 0,
	max = 100,
	step = 1,
	disabled = false,
	className,
	formatValue,
	size = "md",
}: StepperProps) {
	const id = useId();
	const upper = Math.max(min, max);
	const current = clampRange(value, min, upper);
	const decrement = stepRange(current, -1, min, upper, step > 0 ? step : 1);
	const increment = stepRange(current, 1, min, upper, step > 0 ? step : 1);
	const displayed = formatValue?.(current) ?? String(current);
	const digits = displayed.replace(/[^0-9]/g, "");
	let digitIndex = 0;

	return (
		<div
			data-slot="stepper"
			className={cx(
				"flex min-w-0 items-center justify-between gap-4",
				className,
			)}
		>
			<span id={id} className={cx(labelText[size], "truncate")}>
				{label}
			</span>
			<div className="flex shrink-0 items-center gap-3">
				<output
					aria-live="polite"
					aria-labelledby={id}
					className={cx(
						outputText[size],
						"flex min-w-[2ch] items-center justify-end leading-[1.5em]",
					)}
				>
					<span
						aria-hidden="true"
						className="inline-flex items-center justify-end"
					>
						{Array.from(displayed).map((character) => {
							if (!/[0-9]/.test(character))
								return (
									<span key={`sep-${character}`} className="leading-[1.5em]">
										{character}
									</span>
								);
							const prefix = digits.slice(0, ++digitIndex);
							const place = digits.length - digitIndex;
							return (
								<RollingDigit
									key={`place-${place}`}
									count={Number(prefix)}
									place={place}
								/>
							);
						})}
					</span>
					<span className="sr-only">{displayed}</span>
				</output>
				<div
					role="group"
					aria-labelledby={id}
					className="bg-fill after:bg-separator relative flex items-stretch overflow-hidden rounded-xl after:absolute after:inset-y-2 after:left-1/2 after:w-px after:content-['']"
				>
					<StepButton
						kind="minus"
						size={size}
						aria-label={labels.decrement}
						aria-describedby={id}
						disabled={disabled || decrement === current}
						onClick={() => {
							haptic("selection");
							onChange(decrement);
						}}
					/>
					<StepButton
						kind="plus"
						size={size}
						aria-label={labels.increment}
						aria-describedby={id}
						disabled={disabled || increment === current}
						onClick={() => {
							haptic("selection");
							onChange(increment);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
