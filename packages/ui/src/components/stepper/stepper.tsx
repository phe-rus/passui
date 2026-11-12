import { useId } from "react";
import { cn } from "../../lib/class-names";
import { clampRange, stepRange } from "../../lib/range-value";
import { Button, type ButtonSize } from "../button/button";
import { RollingDigit } from "./rolling-digit";

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
const buttonSizes: Record<StepperSize, { size: ButtonSize; cls: string }> = {
	sm: {
		size: "icon-sm",
		cls: "size-7 rounded-none text-subheadline text-accent-text [@media(pointer:coarse)]:size-10",
	},
	md: {
		size: "icon",
		cls: "size-8 rounded-none text-title3 text-accent-text [@media(pointer:coarse)]:size-11",
	},
	lg: {
		size: "icon-lg",
		cls: "size-9 rounded-none text-title2 text-accent-text [@media(pointer:coarse)]:size-12",
	},
};

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
			className={cn(
				"flex min-w-0 items-center justify-between gap-3",
				className,
			)}
		>
			<span id={id} className={labelText[size]}>
				{label}
			</span>
			<div className="flex shrink-0 items-center gap-3">
				<output
					aria-live="polite"
					aria-labelledby={id}
					className={outputText[size]}
				>
					<span aria-hidden="true" className="inline-flex items-center">
						{Array.from(displayed).map((character) => {
							if (!/[0-9]/.test(character))
								return <span key={`sep-${character}`}>{character}</span>;
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
				<div className="divide-separator bg-fill flex items-center divide-x overflow-hidden rounded-lg">
					<Button
						type="button"
						variant="ghost"
						size={buttonSizes[size].size}
						aria-label={labels.decrement}
						aria-describedby={id}
						disabled={disabled || decrement === current}
						onClick={() => onChange(decrement)}
						className={buttonSizes[size].cls}
					>
						−
					</Button>
					<Button
						type="button"
						variant="ghost"
						size={buttonSizes[size].size}
						aria-label={labels.increment}
						aria-describedby={id}
						disabled={disabled || increment === current}
						onClick={() => onChange(increment)}
						className={buttonSizes[size].cls}
					>
						+
					</Button>
				</div>
			</div>
		</div>
	);
}
