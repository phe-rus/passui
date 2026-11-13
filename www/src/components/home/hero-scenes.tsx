import { AttachIcon } from "@passui/icons/attach";
import { NextTrackIcon } from "@passui/icons/next-track";
import { PauseIcon } from "@passui/icons/pause";
import { PlayIcon } from "@passui/icons/play";
import { PreviousTrackIcon } from "@passui/icons/previous-track";
import { UploadIcon } from "@passui/icons/upload";
import { toast } from "@passui/react";
import { Avatar, AvatarFallback } from "@passui/react/avatar";
import { Badge } from "@passui/react/badge";
import { Button } from "@passui/react/button";
import { Checkbox } from "@passui/react/checkbox";
import { cn } from "@passui/react/cn";
import { Input } from "@passui/react/input";
import { type ReactNode, useState } from "react";
import { LabeledProgress } from "./labeled-progress";

type SceneProps = {
	className?: string;
};

type PanelProps = {
	className?: string;
	children: ReactNode;
};

/** The shared surface: every scene sits on the same paper. */
function Panel({ className, children }: PanelProps) {
	return (
		<div
			className={cn(
				"bg-elevated text-label rounded-[1.75rem] p-4 shadow-[0_2px_6px_rgb(0_0_0/0.05),0_22px_44px_-22px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.04] transition-colors duration-500",
				className,
			)}
		>
			{children}
		</div>
	);
}

/** Abstract artwork in the accent: no image files, follows the theme. */
function Artwork({ className }: SceneProps) {
	return (
		<div
			className={cn(
				"bg-accent-soft relative overflow-hidden rounded-[1.25rem] transition-colors duration-500",
				className,
			)}
		>
			<span className="bg-accent/80 absolute -top-6 -right-4 size-28 rounded-full transition-colors duration-500" />
			<span className="bg-accent-text/25 absolute -bottom-10 -left-6 size-36 rounded-full transition-colors duration-500" />
			<span className="bg-elevated absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full" />
		</div>
	);
}

export function PlayerScene({ className }: SceneProps) {
	const [playing, setPlaying] = useState(true);
	const [track, setTrack] = useState(0);
	const tracks = ["Morning light", "Sea glass", "Quiet hours"];
	return (
		<Panel className={cn("flex w-64 flex-col gap-3", className)}>
			<Artwork className="h-40" />
			<div className="flex flex-col px-1">
				<span className="text-headline font-medium" aria-live="polite">
					{tracks[track]}
				</span>
				<span className="text-footnote text-label-secondary">Quiet Rooms</span>
			</div>
			<LabeledProgress label="Playback" value={40} size="sm" className="mx-1" />
			<div className="flex items-center justify-between px-3">
				<Button
					aria-label="Previous"
					variant="ghost"
					size="icon-sm"
					onClick={() =>
						setTrack((value) => (value + tracks.length - 1) % tracks.length)
					}
				>
					<PreviousTrackIcon size={18} />
				</Button>
				<Button
					size="icon"
					aria-label={playing ? "Pause" : "Play"}
					variant="accent"
					onClick={() => setPlaying((value) => !value)}
				>
					{playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
				</Button>
				<Button
					aria-label="Next"
					variant="ghost"
					size="icon-sm"
					onClick={() => setTrack((value) => (value + 1) % tracks.length)}
				>
					<NextTrackIcon size={18} />
				</Button>
			</div>
		</Panel>
	);
}

export function ComposerScene({ className }: SceneProps) {
	const [text, setText] = useState("");
	const [attached, setAttached] = useState(false);
	return (
		<Panel className={cn("flex w-72 flex-col gap-3", className)}>
			<Input
				value={text}
				onChange={(event) => setText(event.target.value)}
				placeholder="How can I help?"
				aria-label="Message"
				className="text-body placeholder:text-label-tertiary bg-transparent px-1 outline-none"
			/>
			{attached && <Badge>Design notes.pdf</Badge>}
			<div className="flex items-center justify-between">
				<Button
					aria-label={attached ? "Remove attachment" : "Attach sample file"}
					variant="secondary"
					size="icon-sm"
					aria-pressed={attached}
					onClick={() => setAttached((value) => !value)}
				>
					<AttachIcon size={18} />
				</Button>
				<Button
					aria-label="Send"
					disabled={!text.trim() && !attached}
					variant="default"
					size="icon-sm"
					onClick={() => {
						setText("");
						setAttached(false);
						toast.success({ title: "Sent (just a demo)" });
					}}
				>
					<UploadIcon size={18} />
				</Button>
			</div>
		</Panel>
	);
}

export function ProductScene({ className }: SceneProps) {
	const [added, setAdded] = useState(false);
	return (
		<Panel className={cn("flex w-60 flex-col gap-3", className)}>
			<Artwork className="h-44" />
			<div className="flex items-start justify-between gap-2 px-1">
				<div className="flex flex-col">
					<span className="text-headline font-medium">Sun lamp</span>
					<span className="text-footnote text-label-secondary">
						Warm light, all day
					</span>
				</div>
				<span className="text-headline font-medium tabular-nums">$129</span>
			</div>
			<Button
				variant={added ? "secondary" : "accent"}
				onClick={() => setAdded((value) => !value)}
			>
				{added ? "In your bag" : "Add to bag"}
			</Button>
		</Panel>
	);
}

export function RewardsScene({ className }: SceneProps) {
	return (
		<Panel className={cn("flex w-64 flex-col gap-3", className)}>
			<div className="flex items-baseline justify-between px-1">
				<span className="text-headline font-medium">Points</span>
				<span className="text-footnote text-label-secondary tabular-nums">
					6 of 8
				</span>
			</div>
			<div className="flex gap-1 px-1">
				{Array.from({ length: 8 }, (_, index) => (
					<span
						key={index}
						className={cn(
							"h-2 flex-1 rounded-full transition-colors duration-500",
							index < 6 ? "bg-accent" : "bg-fill",
						)}
					/>
				))}
			</div>
			<div className="flex items-center gap-2 px-1">
				<div className="flex -space-x-1.5">
					{["AK", "MS", "JT"].map((initials) => (
						<Avatar key={initials} className="ring-elevated size-8 ring-2">
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
					))}
				</div>
				<span className="text-footnote text-label-secondary">
					Aiko and 2 friends joined
				</span>
			</div>
		</Panel>
	);
}

export function OfferChip({ className }: SceneProps) {
	return (
		<span className={cn("inline-flex", className)}>
			<Badge>Limited time</Badge>
		</span>
	);
}

export function ShippingToggle({ className }: SceneProps) {
	const [on, setOn] = useState(true);
	return (
		<span
			className={cn(
				"bg-elevated inline-flex rounded-full px-3 py-1.5 shadow-sm ring-1 ring-black/[0.04]",
				className,
			)}
		>
			<Checkbox
				aria-label="Free shipping"
				checked={on}
				onCheckedChange={(v) => setOn(v === true)}
			/>
		</span>
	);
}
