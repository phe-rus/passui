"use client";

import { type ComponentProps, useId, useState } from "react";
import { cx } from "../lib/cx";

/** `bar` compares values, `line` follows a trend, `area` is a line with its weight filled in. */
export type ChartType = "bar" | "line" | "area";

export interface ChartSeries {
	/** The key of the value in each data row. */
	key: string;
	/** Names the series in the tooltip and legend. */
	label: string;
	/** Any CSS colour. Defaults to the accent, then success, warning and danger. */
	color?: string;
}

export type ChartProps = Omit<ComponentProps<"div">, "children"> & {
	/** One row per point on the x axis. */
	data: Array<Record<string, string | number>>;
	/** The key holding each row's x label. */
	xKey: string;
	series: ChartSeries[];
	/** Names the chart for assistive technology. */
	label: string;
	/** @default "line" */
	type?: ChartType;
	/** Formats a value for the axis and the tooltip. */
	format?: (value: number) => string;
};

const palette = [
	"var(--color-accent)",
	"var(--color-success)",
	"var(--color-warning)",
	"var(--color-danger)",
];
const W = 480;
const H = 220;
const pad = { top: 12, right: 12, bottom: 26, left: 40 };

/** The smallest round number above `max`, so gridlines fall on friendly values. */
function niceMax(max: number) {
	if (max <= 0) return 1;
	const magnitude = 10 ** Math.floor(Math.log10(max));
	const step = [1, 2, 2.5, 5, 10].find((n) => n * magnitude >= max) ?? 10;
	return step * magnitude;
}

/**
 * A responsive SVG chart for one or more series. Bars grow and lines draw on
 * first paint, a tooltip follows the pointer to the nearest point, and a
 * hidden table carries the same numbers for screen readers.
 */
export function Chart({
	data,
	xKey,
	series,
	label,
	type = "line",
	format = (value) => value.toLocaleString(),
	className,
	...props
}: ChartProps) {
	const id = useId();
	const [hover, setHover] = useState<number | null>(null);
	const top = niceMax(
		Math.max(
			...data.flatMap((row) => series.map((s) => Number(row[s.key]) || 0)),
		),
	);
	const innerW = W - pad.left - pad.right;
	const innerH = H - pad.top - pad.bottom;
	const band = innerW / Math.max(data.length, 1);
	const x = (index: number) =>
		type === "bar"
			? pad.left + band * index + band / 2
			: pad.left +
				(data.length === 1 ? innerW / 2 : (innerW * index) / (data.length - 1));
	const y = (value: number) => pad.top + innerH - (value / top) * innerH;
	const color = (index: number) =>
		series[index]?.color ?? palette[index % palette.length];
	const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * top);
	const barW = Math.min(28, (band / series.length) * 0.7);

	const move = (event: React.PointerEvent<SVGSVGElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const at = ((event.clientX - rect.left) / rect.width) * W;
		const index =
			type === "bar"
				? Math.floor((at - pad.left) / band)
				: Math.round(((at - pad.left) / innerW) * (data.length - 1));
		setHover(Math.min(Math.max(index, 0), data.length - 1));
	};

	return (
		<div
			data-slot="chart"
			className={cx("relative flex w-full flex-col gap-2", className)}
			{...props}
		>
			<svg
				viewBox={`0 0 ${W} ${H}`}
				role="img"
				aria-label={label}
				className="h-auto w-full touch-pan-y overflow-visible"
				onPointerMove={move}
				onPointerLeave={() => setHover(null)}
			>
				<defs>
					{series.map((s, index) => (
						<linearGradient
							key={s.key}
							id={`${id}-${s.key}`}
							x1="0"
							x2="0"
							y1="0"
							y2="1"
						>
							<stop offset="0" stopColor={color(index)} stopOpacity="0.35" />
							<stop offset="1" stopColor={color(index)} stopOpacity="0" />
						</linearGradient>
					))}
				</defs>
				{ticks.map((tick) => (
					<g key={tick}>
						<line
							x1={pad.left}
							x2={W - pad.right}
							y1={y(tick)}
							y2={y(tick)}
							stroke="var(--color-separator)"
							strokeOpacity={tick === 0 ? 1 : 0.5}
							strokeDasharray={tick === 0 ? undefined : "3 4"}
						/>
						<text
							x={pad.left - 8}
							y={y(tick)}
							textAnchor="end"
							dominantBaseline="middle"
							className="fill-label-tertiary text-[10px]"
						>
							{format(tick)}
						</text>
					</g>
				))}
				{data.map((row, index) => (
					<text
						key={String(row[xKey])}
						x={x(index)}
						y={H - 8}
						textAnchor="middle"
						className="fill-label-tertiary text-[10px]"
					>
						{row[xKey]}
					</text>
				))}
				{hover !== null ? (
					<line
						x1={x(hover)}
						x2={x(hover)}
						y1={pad.top}
						y2={pad.top + innerH}
						stroke="var(--color-label-tertiary)"
						strokeOpacity="0.5"
					/>
				) : null}
				{series.map((s, si) => {
					const points = data.map(
						(row, index) => [x(index), y(Number(row[s.key]) || 0)] as const,
					);
					if (type === "bar")
						return (
							<g key={s.key}>
								{points.map(([px, py], index) => (
									<rect
										// biome-ignore lint/suspicious/noArrayIndexKey: fixed order
										key={index}
										x={px - (barW * series.length) / 2 + si * barW}
										y={py}
										width={barW - 2}
										height={pad.top + innerH - py}
										rx={4}
										fill={color(si)}
										opacity={hover === null || hover === index ? 1 : 0.45}
										className="spring-smooth origin-bottom transition-opacity motion-reduce:animate-none"
										style={{
											transformBox: "fill-box",
											animation: `passui-grow var(--spring-smooth-duration) var(--spring-smooth) ${index * 40}ms backwards`,
										}}
									/>
								))}
							</g>
						);
					const line = points
						.map(([px, py], index) => `${index ? "L" : "M"}${px},${py}`)
						.join(" ");
					const first = points[0];
					const last = points[points.length - 1];
					return (
						<g key={s.key}>
							{type === "area" && first && last ? (
								<path
									d={`${line} L${last[0]},${pad.top + innerH} L${first[0]},${pad.top + innerH} Z`}
									fill={`url(#${id}-${s.key})`}
									className="motion-reduce:animate-none"
									style={{
										animation: "passui-fade-in 700ms ease-out backwards",
									}}
								/>
							) : null}
							<path
								d={line}
								fill="none"
								stroke={color(si)}
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								pathLength={1}
								strokeDasharray={1}
								className="motion-reduce:animate-none"
								style={{
									animation: "passui-draw 900ms var(--ease-standard) forwards",
								}}
							/>
							{hover !== null && points[hover] ? (
								<circle
									cx={points[hover][0]}
									cy={points[hover][1]}
									r="4.5"
									fill="var(--color-background)"
									stroke={color(si)}
									strokeWidth="2.5"
								/>
							) : null}
						</g>
					);
				})}
			</svg>
			{hover !== null && data[hover] ? (
				<div
					role="presentation"
					className="liquid-glass-dense squircle text-caption text-label pointer-events-none absolute top-0 z-10 -translate-x-1/2 px-2.5 py-1.5 [--squircle-radius:0.75rem]"
					style={{ left: `${(x(hover) / W) * 100}%` }}
				>
					<div className="text-label-secondary font-medium">
						{data[hover][xKey]}
					</div>
					{series.map((s, index) => (
						<div key={s.key} className="flex items-center gap-1.5">
							<span
								className="size-2 rounded-full"
								style={{ background: color(index) }}
							/>
							<span className="text-label-secondary">{s.label}</span>
							<span className="ms-auto ps-3 font-semibold tabular-nums">
								{format(Number(data[hover][s.key]) || 0)}
							</span>
						</div>
					))}
				</div>
			) : null}
			{series.length > 1 ? (
				<ul className="text-caption text-label-secondary m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
					{series.map((s, index) => (
						<li key={s.key} className="flex items-center gap-1.5">
							<span
								className="size-2 rounded-full"
								style={{ background: color(index) }}
							/>
							{s.label}
						</li>
					))}
				</ul>
			) : null}
			<table className="sr-only">
				<caption>{label}</caption>
				<thead>
					<tr>
						<th scope="col">{xKey}</th>
						{series.map((s) => (
							<th key={s.key} scope="col">
								{s.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row) => (
						<tr key={String(row[xKey])}>
							<th scope="row">{row[xKey]}</th>
							{series.map((s) => (
								<td key={s.key}>{row[s.key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
