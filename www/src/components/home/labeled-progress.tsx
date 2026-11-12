import { Progress } from "@passui/react/progress";

/** A progress bar with its label and detail above, as the showcase cards use it. */
export function LabeledProgress({
	label,
	detail,
	value,
	className,
}: {
	label: string;
	detail?: string;
	value: number;
	/** Applied to the wrapper. */
	className?: string;
	/** Kept for the cards' call sites; the bar is one height. */
	size?: "sm" | "md";
}) {
	return (
		<div className={className}>
			<div className="text-footnote text-label-secondary mb-1.5 flex justify-between">
				<span>{label}</span>
				{detail ? <span className="tabular-nums">{detail}</span> : null}
			</div>
			<Progress value={value} aria-label={label} />
		</div>
	);
}
