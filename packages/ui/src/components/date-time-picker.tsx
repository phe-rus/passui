"use client";

import { type ReactNode, useMemo, useState } from "react";
import { formatDay, parseDay } from "../lib/calendar-month";
import { cx } from "../lib/cx";
import { Wheel } from "../lib/wheel";
import { buttonVariants } from "./button";
import { Calendar, type DateRange } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type { DateRange } from "./calendar";

interface Base {
	/** Names the button and the panel for assistive technology. */
	label: string;
	locale: string;
	/** Shown when nothing is chosen. */
	placeholder?: string;
	min?: string;
	max?: string;
	/** Minutes offered in the time columns. Default 5. */
	minuteStep?: number;
	labels: {
		previousMonth: string;
		nextMonth: string;
		hour: string;
		minute: string;
		period: string;
	};
	disabled?: boolean;
	className?: string;
}

export type DateTimePickerProps = Base &
	(
		| { mode?: "date"; value: string; onValueChange: (value: string) => void }
		| { mode: "time"; value: string; onValueChange: (value: string) => void }
		| {
				mode: "datetime";
				/** `YYYY-MM-DDTHH:MM`, or "". */
				value: string;
				onValueChange: (value: string) => void;
		  }
		| {
				mode: "range";
				value: DateRange;
				onValueChange: (value: DateRange) => void;
		  }
	);

const pad = (n: number) => String(n).padStart(2, "0");

function parseTime(value: string) {
	const match = /^(\d{2}):(\d{2})$/.exec(value);
	if (!match) return null;
	const hour = Number(match[1]);
	const minute = Number(match[2]);
	return hour < 24 && minute < 60 ? { hour, minute } : null;
}

const today = () => {
	const now = new Date();
	return formatDay({
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
	});
};

/** Hour, minute and (where the locale uses one) AM/PM wheels, like the iOS time wheels. */
function TimeWheels({
	value,
	onChange,
	locale,
	step,
	labels,
}: {
	value: string;
	onChange: (value: string) => void;
	locale: string;
	step: number;
	labels: Base["labels"];
}) {
	const time = parseTime(value) ?? { hour: 9, minute: 0 };
	const twelve =
		new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions()
			.hour12 ?? false;
	const emit = (hour: number, minute: number) =>
		onChange(`${pad(hour)}:${pad(minute)}`);
	const pm = time.hour >= 12;
	const hours = useMemo(
		() =>
			(twelve
				? Array.from({ length: 12 }, (_, i) => i + 1)
				: Array.from({ length: 24 }, (_, i) => i)
			).map((hour) => ({ value: hour, label: pad(hour) })),
		[twelve],
	);
	const minutes = useMemo(() => {
		const all = Array.from(
			{ length: Math.ceil(60 / step) },
			(_, index) => index * step,
		);
		if (!all.includes(time.minute)) all.push(time.minute);
		return all
			.sort((a, b) => a - b)
			.map((minute) => ({ value: minute, label: pad(minute) }));
	}, [step, time.minute]);
	const periods = useMemo(() => {
		const name = (hour: number) =>
			new Intl.DateTimeFormat(locale, {
				hour: "numeric",
				hour12: true,
				timeZone: "UTC",
			})
				.formatToParts(new Date(Date.UTC(2000, 0, 1, hour)))
				.find((part) => part.type === "dayPeriod")?.value ?? "";
		return [
			{ value: "am", label: name(1) },
			{ value: "pm", label: name(13) },
		];
	}, [locale]);
	return (
		<div className="flex justify-center gap-1">
			<Wheel
				label={labels.hour}
				options={hours}
				value={twelve ? time.hour % 12 || 12 : time.hour}
				onValueChange={(hour) =>
					emit(twelve ? (hour % 12) + (pm ? 12 : 0) : hour, time.minute)
				}
				className="w-16"
			/>
			<Wheel
				label={labels.minute}
				options={minutes}
				value={time.minute}
				onValueChange={(minute) => emit(time.hour, minute)}
				className="w-16"
			/>
			{twelve ? (
				<Wheel
					label={labels.period}
					options={periods}
					value={pm ? "pm" : "am"}
					onValueChange={(next) =>
						emit((time.hour % 12) + (next === "pm" ? 12 : 0), time.minute)
					}
					className="w-16"
				/>
			) : null}
		</div>
	);
}

/** One chip that opens its own panel, the way the iOS compact date picker does. */
function Chip({
	label,
	shown,
	placeholder,
	disabled,
	className,
	children,
}: {
	label: string;
	shown: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	children: (close: () => void) => ReactNode;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Popover open={open} onOpenChange={(details) => setOpen(details.open)}>
			<PopoverTrigger
				disabled={disabled}
				aria-label={label}
				className={cx(
					buttonVariants({
						variant: "secondary",
						className: "justify-between gap-3 font-medium",
					}),
					!shown && "text-label-tertiary",
					className,
				)}
			>
				{shown || placeholder || label}
			</PopoverTrigger>
			<PopoverContent aria-label={label} className="w-auto">
				{children(() => setOpen(false))}
			</PopoverContent>
		</Popover>
	);
}

/**
 * One picker for dates, times, both together, and ranges, the way Apple's
 * compact DatePicker works: a chip for the date, a chip for the time, each
 * opening its own panel. The date panel is a calendar whose month title opens
 * month and year wheels, so a far date is one flick and not a hundred taps.
 * The time panel is hour, minute and period wheels. Values are plain strings
 * (`YYYY-MM-DD`, `HH:MM`, `YYYY-MM-DDTHH:MM`) or a `{ from, to }` range, so
 * they go straight to a form or an API.
 */
export function DateTimePicker(props: DateTimePickerProps) {
	const { label, locale, placeholder, min, max, labels, disabled, className } =
		props;
	const dayFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeZone: "UTC",
	});
	const timeFormat = new Intl.DateTimeFormat(locale, {
		timeStyle: "short",
		timeZone: "UTC",
	});
	const showDay = (value: string) => {
		const day = parseDay(value.slice(0, 10));
		return day
			? dayFormat.format(new Date(Date.UTC(day.year, day.month - 1, day.day)))
			: "";
	};
	const showTime = (value: string) => {
		const time = parseTime(value);
		return time
			? timeFormat.format(
					new Date(Date.UTC(2000, 0, 1, time.hour, time.minute)),
				)
			: "";
	};
	const step = props.minuteStep ?? 5;

	if (props.mode === "range") {
		const { from, to } = props.value;
		return (
			<Chip
				label={label}
				shown={from ? `${showDay(from)}${to ? ` – ${showDay(to)}` : " –"}` : ""}
				placeholder={placeholder}
				disabled={disabled}
				className={className}
			>
				{(close) => (
					<Calendar
						mode="range"
						label={label}
						locale={locale}
						min={min}
						max={max}
						labels={labels}
						value={props.value}
						onValueChange={(next) => {
							props.onValueChange(next);
							if (next.to) close();
						}}
					/>
				)}
			</Chip>
		);
	}

	if (props.mode === "time") {
		return (
			<Chip
				label={label}
				shown={showTime(props.value)}
				placeholder={placeholder}
				disabled={disabled}
				className={className}
			>
				{() => (
					<TimeWheels
						value={props.value}
						onChange={props.onValueChange}
						locale={locale}
						step={step}
						labels={labels}
					/>
				)}
			</Chip>
		);
	}

	if (props.mode === "datetime") {
		const [date = "", time = ""] = props.value.split("T");
		return (
			<div
				data-slot="date-time-picker"
				className={cx("inline-flex flex-wrap gap-1.5", className)}
			>
				<Chip
					label={label}
					shown={showDay(date)}
					placeholder={placeholder}
					disabled={disabled}
				>
					{(close) => (
						<Calendar
							label={label}
							locale={locale}
							min={min}
							max={max}
							labels={labels}
							value={date}
							onValueChange={(next) => {
								props.onValueChange(`${next}T${time || "09:00"}`);
								close();
							}}
						/>
					)}
				</Chip>
				<Chip
					label={labels.hour}
					shown={showTime(time)}
					placeholder={showTime("09:00")}
					disabled={disabled}
				>
					{() => (
						<TimeWheels
							value={time}
							onChange={(next) =>
								props.onValueChange(`${date || today()}T${next}`)
							}
							locale={locale}
							step={step}
							labels={labels}
						/>
					)}
				</Chip>
			</div>
		);
	}

	return (
		<Chip
			label={label}
			shown={showDay(props.value)}
			placeholder={placeholder}
			disabled={disabled}
			className={className}
		>
			{(close) => (
				<Calendar
					label={label}
					locale={locale}
					min={min}
					max={max}
					labels={labels}
					value={props.value}
					onValueChange={(next) => {
						(props as { onValueChange: (value: string) => void }).onValueChange(
							next,
						);
						close();
					}}
				/>
			)}
		</Chip>
	);
}
