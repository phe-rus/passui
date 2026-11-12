import { NextTrackIcon } from "@passui/icons/next-track";
import { PauseIcon } from "@passui/icons/pause";
import { PlayIcon } from "@passui/icons/play";
import { PreviousTrackIcon } from "@passui/icons/previous-track";
import { SegmentedControl, toast } from "@passui/react";
import { Badge } from "@passui/react/badge";
import { Button } from "@passui/react/button";
import { Checkbox } from "@passui/react/checkbox";
import { cn } from "@passui/react/cn";
import { useState } from "react";
import type { ShowcaseCardBodyProps } from "@/features/home/types";
import { LabeledProgress } from "./labeled-progress";
import { ShowcaseCard } from "./showcase-cards";

function Billing({ theme }: ShowcaseCardBodyProps) {
	const [period, setPeriod] = useState<"month" | "year">("year");
	return (
		<ShowcaseCard theme={theme} title="Pro plan">
			<SegmentedControl
				value={period}
				onValueChange={(next) => setPeriod(next as never)}
				aria-label="Billing period"
				options={[
					{ value: "month", label: "Monthly" },
					{ value: "year", label: "Yearly" },
				]}
			/>
			<div className="flex items-baseline gap-1">
				<span className="text-title font-bold tabular-nums">
					{period === "year" ? "$8" : "$10"}
				</span>
				<span className="text-footnote text-label-secondary">per month</span>
			</div>
			<Button
				variant="accent"
				onClick={() =>
					toast.success({
						title: `Selected ${period === "year" ? "yearly" : "monthly"} plan (demo)`,
					})
				}
			>
				Upgrade
			</Button>
		</ShowcaseCard>
	);
}

function Checklist({ theme }: ShowcaseCardBodyProps) {
	const [done, setDone] = useState([true, false, false]);
	const items = ["Pick a palette", "Review copy", "Ship it"];
	return (
		<ShowcaseCard theme={theme} title="Launch list">
			{items.map((item, index) => (
				<Checkbox
					key={item}
					aria-label={item}
					checked={done[index]}
					onCheckedChange={(state) => {
						const checked = state === true;
						setDone((current) =>
							current.map((value, at) => (at === index ? checked : value)),
						);
					}}
				/>
			))}
		</ShowcaseCard>
	);
}

function Tags({ theme }: ShowcaseCardBodyProps) {
	const [added, setAdded] = useState(false);
	return (
		<ShowcaseCard theme={theme} title="Tags">
			<div className="flex flex-wrap gap-2">
				<Badge>Design</Badge>
				<Badge variant="secondary">Research</Badge>
				<Badge>Launch</Badge>
				<Badge variant="secondary">Q4</Badge>
				<Badge variant="secondary">Mobile</Badge>
				{added && <Badge>New tag</Badge>}
			</div>
			<Button variant="outline" onClick={() => setAdded((value) => !value)}>
				{added ? "Remove new tag" : "Add a tag"}
			</Button>
		</ShowcaseCard>
	);
}

function Player({ theme }: ShowcaseCardBodyProps) {
	const [playing, setPlaying] = useState(true);
	const [track, setTrack] = useState(0);
	const tracks = ["Morning light", "Sea glass", "Quiet hours"];
	return (
		<ShowcaseCard theme={theme} title="Now playing">
			<div className="flex flex-col">
				<span className="text-subheadline font-semibold" aria-live="polite">
					{tracks[track]}
				</span>
				<span className="text-footnote text-label-secondary">Quiet Rooms</span>
			</div>
			<LabeledProgress label="Playback" value={40} size="sm" className="" />
			<div className="flex items-center justify-center gap-3">
				<Button
					size="icon"
					aria-label="Previous"
					variant="ghost"
					onClick={() =>
						setTrack((value) => (value + tracks.length - 1) % tracks.length)
					}
				>
					<PreviousTrackIcon size={20} />
				</Button>
				<Button
					aria-label={playing ? "Pause" : "Play"}
					variant="accent"
					size="icon-lg"
					onClick={() => setPlaying((value) => !value)}
				>
					{playing ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
				</Button>
				<Button
					size="icon"
					aria-label="Next"
					variant="ghost"
					onClick={() => setTrack((value) => (value + 1) % tracks.length)}
				>
					<NextTrackIcon size={20} />
				</Button>
			</div>
		</ShowcaseCard>
	);
}

function Storage({ theme }: ShowcaseCardBodyProps) {
	const parts = [
		{
			label: "Photos",
			share: "w-[42%]",
			tone: "bg-accent",
		},
		{
			label: "Docs",
			share: "w-[18%]",
			tone: "bg-accent/55",
		},
		{
			label: "Other",
			share: "w-[12%]",
			tone: "bg-label-tertiary",
		},
	];
	return (
		<ShowcaseCard theme={theme} title="Storage">
			<div className="flex items-baseline justify-between">
				<span className="text-title3 font-bold tabular-nums">72 GB</span>
				<span className="text-footnote text-label-secondary">of 100 GB</span>
			</div>
			<div className="bg-fill flex h-2.5 gap-0.5 overflow-hidden rounded-full">
				{parts.map((part) => (
					<div
						key={part.label}
						className={cn("h-full", part.share, part.tone)}
					/>
				))}
			</div>
			<div className="text-footnote text-label-secondary flex gap-3">
				{parts.map((part) => (
					<span key={part.label} className="flex items-center gap-1.5">
						<span className={cn("size-2 rounded-full", part.tone)} />
						{part.label}
					</span>
				))}
			</div>
		</ShowcaseCard>
	);
}

function VerifyCode({ theme }: ShowcaseCardBodyProps) {
	return (
		<ShowcaseCard theme={theme} title="Enter the code">
			<div className="flex justify-between gap-1.5">
				{["4", "8", "1", "5", "", ""].map((digit, index) => (
					<span
						key={index}
						className={cn(
							"bg-fill text-headline flex h-11 w-9 items-center justify-center rounded-xl font-semibold tabular-nums",
							index === 4 && "ring-accent ring-2",
						)}
					>
						{digit}
					</span>
				))}
			</div>
			<Button
				variant="accent"
				onClick={() => toast.success({ title: "Verified (just a demo)" })}
			>
				Verify
			</Button>
		</ShowcaseCard>
	);
}

function Devices({ theme }: ShowcaseCardBodyProps) {
	return (
		<ShowcaseCard theme={theme} title="Devices">
			<Badge variant="success">MacBook · up to date</Badge>
			<Badge variant="success">iPhone · syncing</Badge>
			<Badge variant="success">iPad · offline</Badge>
		</ShowcaseCard>
	);
}

/** The second marquee row: none of these appear in the first. */
export const showcaseRowTwo = [
	Billing,
	Checklist,
	Tags,
	Player,
	Storage,
	VerifyCode,
	Devices,
] as const;
