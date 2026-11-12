"use client";

import { type ReactNode, useState } from "react";
import { parseDay } from "../lib/calendar-month";
import { cx } from "../lib/cx";
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

const column =
	"no-scrollbar flex max-h-56 flex-col gap-px overflow-y-auto px-1 py-1";
const item =
	"text-footnote text-label hover:bg-fill/80 focus-visible:ring-accent/70 data-[on]:bg-accent data-[on]:text-on-accent flex h-7.5 min-w-11 items-center justify-center rounded-lg tabular-nums outline-none focus-visible:ring-2 data-[on]:font-semibold";

function TimeColumns({
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
	const period = (hour: number) =>
		new Intl.DateTimeFormat(locale, {
			hour: "numeric",
			hour12: true,
			timeZone: "UTC",
		})
			.formatToParts(new Date(Date.UTC(2000, 0, 1, hour)))
			.find((part) => part.type === "dayPeriod")?.value ?? "";
	const emit = (hour: number, minute: number) =>
		onChange(`${pad(hour)}:${pad(minute)}`);
	const hours = twelve
		? Array.from({ length: 12 }, (_, index) => (index === 0 ? 12 : index))
		: Array.from({ length: 24 }, (_, index) => index);
	const shownHour = twelve ? time.hour % 12 || 12 : time.hour;
	const pm = time.hour >= 12;
	const minutes = Array.from(
		{ length: Math.ceil(60 / step) },
		(_, index) => index * step,
	);
	if (!minutes.includes(time.minute)) minutes.push(time.minute);
	minutes.sort((a, b) => a - b);
	const setHour = (hour: number) =>
		emit(twelve ? (hour % 12) + (pm ? 12 : 0) : hour, time.minute);
	return (
		<div className="flex justify-center gap-1">
			<div role="listbox" aria-label={labels.hour} className={column}>
				{hours.map((hour) => (
					<button
						key={hour}
						type="button"
						role="option"
						aria-selected={hour === shownHour}
						data-on={hour === shownHour || undefined}
						onClick={() => setHour(hour)}
						className={item}
					>
						{pad(hour)}
					</button>
				))}
			</div>
			<div role="listbox" aria-label={labels.minute} className={column}>
				{minutes.map((minute) => (
					<button
						key={minute}
						type="button"
						role="option"
						aria-selected={minute === time.minute}
						data-on={minute === time.minute || undefined}
						onClick={() => emit(time.hour, minute)}
						className={item}
					>
						{pad(minute)}
					</button>
				))}
			</div>
			{twelve ? (
				<div role="listbox" aria-label={labels.period} className={column}>
					{[false, true].map((isPm) => (
						<button
							key={String(isPm)}
							type="button"
							role="option"
							aria-selected={isPm === pm}
							data-on={isPm === pm || undefined}
							onClick={() =>
								emit((time.hour % 12) + (isPm ? 12 : 0), time.minute)
							}
							className={item}
						>
							{period(isPm ? 13 : 1)}
						</button>
					))}
				</div>
			) : null}
		</div>
	);
}

/**
 * One picker for dates, times, both together, and ranges, in the style of
 * SwiftUI's compact DatePicker: a button that opens a calendar, time
 * columns or both. Values are plain strings (`YYYY-MM-DD`, `HH:MM`,
 * `YYYY-MM-DDTHH:MM`) or a `{ from, to }` range, so they go straight to a
 * form or an API.
 */
export function DateTimePicker(props: DateTimePickerProps) {
	const { label, locale, placeholder, min, max, labels, disabled, className } =
		props;
	const [open, setOpen] = useState(false);
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

	let shown = "";
	let body: ReactNode;
	if (props.mode === "range") {
		const { from, to } = props.value;
		shown = from ? `${showDay(from)}${to ? ` – ${showDay(to)}` : " –"}` : "";
		body = (
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
					if (next.to) setOpen(false);
				}}
			/>
		);
	} else if (props.mode === "time") {
		shown = showTime(props.value);
		body = (
			<TimeColumns
				value={props.value}
				onChange={props.onValueChange}
				locale={locale}
				step={props.minuteStep ?? 5}
				labels={labels}
			/>
		);
	} else if (props.mode === "datetime") {
		const [date = "", time = ""] = props.value.split("T");
		shown = date ? `${showDay(date)}${time ? `, ${showTime(time)}` : ""}` : "";
		body = (
			<div className="flex flex-col items-center gap-3">
				<Calendar
					label={label}
					locale={locale}
					min={min}
					max={max}
					labels={labels}
					value={date}
					onValueChange={(next) =>
						props.onValueChange(`${next}T${time || "09:00"}`)
					}
				/>
				<div className="border-separator/60 w-full border-t pt-2">
					<TimeColumns
						value={time}
						onChange={(next) => props.onValueChange(`${date}T${next}`)}
						locale={locale}
						step={props.minuteStep ?? 5}
						labels={labels}
					/>
				</div>
			</div>
		);
	} else {
		shown = showDay(props.value);
		body = (
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
					setOpen(false);
				}}
			/>
		);
	}

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
				{body}
			</PopoverContent>
		</Popover>
	);
}
