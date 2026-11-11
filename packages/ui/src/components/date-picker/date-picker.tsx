import { useState } from "react";
import { TextField, type TextFieldSize } from "../text-field/text-field";
import { cn } from "../../lib/class-names";
import { dateValue } from "./date-value";

const legendText: Record<TextFieldSize, string> = {
	xs: "mb-2 text-caption font-medium",
	sm: "mb-2 text-footnote font-medium",
	md: "mb-3 text-subheadline font-medium",
	lg: "mb-3 text-body font-medium",
};
const fieldsetGap: Record<TextFieldSize, string> = {
	xs: "gap-2",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
};
const errorText: Record<TextFieldSize, string> = {
	xs: "text-caption2 text-danger",
	sm: "text-caption text-danger",
	md: "text-footnote text-danger",
	lg: "text-subheadline text-danger",
};

type DatePickerProps = {
	value: string;
	onChange: (value: string) => void;
	label: string;
	labels: {
		day: string;
		month: string;
		year: string;
		invalid: string;
	};
	locale: string;
	max?: string;
	/** Field scale passed to each TextField; matches TextField's xs|sm|md|lg. @default "md" */
	size?: TextFieldSize;
};

/** Segmented date entry suited to birthdays, without a native calendar dialog. */
export function DatePicker({
	value,
	onChange,
	label,
	labels,
	locale,
	max,
	size = "md",
}: DatePickerProps) {
	const [year, month, day] = value.split("-");
	const [parts, setParts] = useState({
		year: year ?? "",
		month: month ?? "",
		day: day ?? "",
	});
	const complete = parts.year.length === 4 && Boolean(parts.month && parts.day);
	const invalid =
		complete && !dateValue(parts.year, parts.month, parts.day, max);
	const order = new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		timeZone: "UTC",
	})
		.formatToParts(new Date("2000-01-02T00:00:00Z"))
		.filter(
			(
				part,
			): part is Intl.DateTimeFormatPart & {
				type: "year" | "month" | "day";
			} => part.type === "year" || part.type === "month" || part.type === "day",
		);
	return (
		<fieldset className={cn("flex min-w-0 flex-col", fieldsetGap[size])}>
			<legend className={legendText[size]}>{label}</legend>
			<div className={cn("grid grid-cols-3", fieldsetGap[size])}>
				{order.map(({ type }) => (
					<TextField
						key={type}
						label={labels[type]}
						inputMode="numeric"
						autoComplete={`bday-${type}`}
						maxLength={type === "year" ? 4 : 2}
						value={parts[type]}
						size={size}
						aria-invalid={invalid || undefined}
						onChange={(event) => {
							const next = {
								...parts,
								[type]: event.target.value.replace(/\D/g, ""),
							};
							setParts(next);
							onChange(dateValue(next.year, next.month, next.day, max));
						}}
					/>
				))}
			</div>
			{invalid && (
				<p role="status" className={errorText[size]}>
					{labels.invalid}
				</p>
			)}
		</fieldset>
	);
}
