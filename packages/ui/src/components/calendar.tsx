"use client";

import { ChevronLeftIcon } from "@passui/icons/chevron-left";
import { ChevronRightIcon } from "@passui/icons/chevron-right";
import { type KeyboardEvent, useId, useMemo, useRef, useState } from "react";
import {
	addDays,
	addMonths,
	type CalendarDay,
	firstWeekday,
	formatDay,
	monthGrid,
	parseDay,
	withinBounds,
} from "../lib/calendar-month";
import { cx } from "../lib/cx";

/** A chosen span of days, as `YYYY-MM-DD`. `to` is empty while the span is open. */
export interface DateRange {
	from: string;
	to: string;
}

interface CalendarBase {
	/** Names the grid for assistive technology. */
	label: string;
	locale: string;
	/** Earliest and latest selectable day, as `YYYY-MM-DD`. */
	min?: string;
	max?: string;
	labels: { previousMonth: string; nextMonth: string };
	className?: string;
}

export type CalendarProps = CalendarBase &
	(
		| {
				mode?: "single";
				/** `YYYY-MM-DD`, or "" when nothing is chosen. */
				value: string;
				onValueChange: (value: string) => void;
		  }
		| {
				mode: "range";
				value: DateRange;
				onValueChange: (value: DateRange) => void;
		  }
	);

const today = (): CalendarDay => {
	const now = new Date();
	return {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
	};
};

const cell =
	"relative mx-auto flex size-8.5 items-center justify-center rounded-full text-footnote tabular-nums outline-none transition-colors duration-(--duration-fast) focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none";

/**
 * An inline month calendar for one day or a range, on the locale's own week.
 * Arrow keys move by day and week, Page Up and Page Down by month, Home and
 * End to the week's edges.
 */
export function Calendar(props: CalendarProps) {
	const { label, locale, min, max, labels, className } = props;
	const range = props.mode === "range";
	const selected = range ? props.value.from : props.value;
	const to = range ? props.value.to : "";
	const start = parseDay(selected) ?? today();
	const [focus, setFocus] = useState<CalendarDay>(start);
	const [hover, setHover] = useState("");
	const grid = useRef<HTMLDivElement>(null);
	const headingId = useId();
	const first = firstWeekday(locale);
	const days = useMemo(
		() => monthGrid(focus.year, focus.month, first),
		[focus.year, focus.month, first],
	);
	const monthTitle = new Intl.DateTimeFormat(locale, {
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(Date.UTC(focus.year, focus.month - 1, 1)));
	const weekdays = Array.from({ length: 7 }, (_, index) =>
		new Intl.DateTimeFormat(locale, {
			weekday: "short",
			timeZone: "UTC",
		}).format(new Date(Date.UTC(2024, 0, ((first - 1 + index) % 7) + 1))),
	);
	const todayValue = formatDay(today());

	/** Position of a day within its week, 0 for the locale's first day. */
	const weekIndex = (day: CalendarDay) =>
		((new Date(Date.UTC(day.year, day.month - 1, day.day)).getUTCDay() || 7) -
			first +
			7) %
		7;

	const move = (next: CalendarDay) => {
		setFocus(next);
		requestAnimationFrame(() =>
			grid.current
				?.querySelector<HTMLElement>(`[data-day="${formatDay(next)}"]`)
				?.focus(),
		);
	};

	const pick = (value: string) => {
		if (!withinBounds(value, min, max)) return;
		if (props.mode !== "range") {
			props.onValueChange(value);
			return;
		}
		const open = props.value.from && !props.value.to;
		if (!open) props.onValueChange({ from: value, to: "" });
		else if (value < props.value.from)
			props.onValueChange({ from: value, to: "" });
		else props.onValueChange({ from: props.value.from, to: value });
	};

	const onKeyDown = (event: KeyboardEvent) => {
		const next = (() => {
			switch (event.key) {
				case "ArrowLeft":
					return addDays(focus, -1);
				case "ArrowRight":
					return addDays(focus, 1);
				case "ArrowUp":
					return addDays(focus, -7);
				case "ArrowDown":
					return addDays(focus, 7);
				case "PageUp":
					return addMonths(focus, -1);
				case "PageDown":
					return addMonths(focus, 1);
				case "Home":
					return addDays(focus, -weekIndex(focus));
				case "End":
					return addDays(focus, 6 - weekIndex(focus));
				default:
					return null;
			}
		})();
		if (!next) return;
		event.preventDefault();
		move(next);
	};

	const edge = range && props.value.from && !props.value.to ? hover : to;

	return (
		<div data-slot="calendar" className={cx("w-[17.5rem]", className)}>
			<div className="mb-2 flex items-center justify-between">
				<button
					type="button"
					aria-label={labels.previousMonth}
					onClick={() => setFocus(addMonths(focus, -1))}
					className="text-label-secondary hover:bg-fill/80 hover:text-label focus-visible:ring-accent/70 flex size-7.5 items-center justify-center rounded-full outline-none focus-visible:ring-2"
				>
					<ChevronLeftIcon size={14} />
				</button>
				<div
					id={headingId}
					aria-live="polite"
					className="text-footnote text-label font-semibold"
				>
					{monthTitle}
				</div>
				<button
					type="button"
					aria-label={labels.nextMonth}
					onClick={() => setFocus(addMonths(focus, 1))}
					className="text-label-secondary hover:bg-fill/80 hover:text-label focus-visible:ring-accent/70 flex size-7.5 items-center justify-center rounded-full outline-none focus-visible:ring-2"
				>
					<ChevronRightIcon size={14} />
				</button>
			</div>
			<div ref={grid} onMouseLeave={() => setHover("")}>
				<table
					aria-labelledby={headingId}
					aria-label={label}
					onKeyDown={onKeyDown}
					className="w-full table-fixed border-collapse"
				>
					<thead>
						<tr>
							{weekdays.map((name) => (
								<th
									key={name}
									scope="col"
									className="text-caption text-label-tertiary py-1 text-center font-medium"
								>
									{name}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 6 }, (_, week) => (
							<tr key={week}>
								{days.slice(week * 7, week * 7 + 7).map((day) => {
									const value = formatDay(day);
									const isStart = value === selected;
									const isEnd = range && value === to;
									const inSpan =
										range &&
										!!selected &&
										!!edge &&
										value > selected &&
										value < edge;
									const blocked = !withinBounds(value, min, max);
									return (
										<td
											key={value}
											className={cx("p-0", inSpan && "bg-accent-soft/70")}
										>
											<button
												type="button"
												data-day={value}
												data-today={value === todayValue || undefined}
												aria-pressed={isStart || isEnd}
												data-selected={isStart || isEnd || undefined}
												data-outside={!day.inMonth || undefined}
												tabIndex={
													day.year === focus.year &&
													day.month === focus.month &&
													day.day === focus.day
														? 0
														: -1
												}
												disabled={blocked}
												onClick={() => pick(value)}
												onFocus={() => setFocus(day)}
												onMouseEnter={() => setHover(value)}
												className={cx(
													cell,
													!day.inMonth && "text-label-tertiary",
													day.inMonth && "text-label",
													value === todayValue &&
														"text-accent-text font-semibold",
													!(isStart || isEnd) && "hover:bg-fill/80",
													(isStart || isEnd) &&
														"bg-accent text-on-accent font-semibold",
												)}
											>
												{day.day}
											</button>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
