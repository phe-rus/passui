import { Chip, TextField, Toggle, toast } from "@passui/react";
import { cn } from "@passui/react/cn";
import { IconButton } from "@passui/react/icon-button";
import {
	AttachIcon,
	NextTrackIcon,
	PauseIcon,
	PlayIcon,
	PreviousTrackIcon,
	UploadIcon,
} from "@passui/react/icons";
import { Button } from "@passui/react/legacy/button";
import {
	ProfileImage,
	ProfileImageFallback,
} from "@passui/react/profile-image";
import { ProgressView } from "@passui/react/progress-view";
import { type ReactNode, useState } from "react";

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
				"bg-elevated text-label rounded-[1.75rem] p-4 shadow-[0_2px_6px_rgb(0_0_0/0.05),0_22px_44px_-22px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.04] transition-colors duration-700",
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
				"bg-accent-soft relative overflow-hidden rounded-[1.25rem] transition-colors duration-700",
				className,
			)}
		>
			<span className="bg-accent/80 absolute -top-6 -right-4 size-28 rounded-full transition-colors duration-700" />
			<span className="bg-accent-text/25 absolute -bottom-10 -left-6 size-36 rounded-full transition-colors duration-700" />
			<span className="bg-elevated/80 absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full" />
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
				<span className="text-headline font-semibold" aria-live="polite">
					{tracks[track]}
				</span>
				<span className="text-footnote text-label-secondary">Quiet Rooms</span>
			</div>
			<ProgressView
				label="Playback"
				value={40}
				size="sm"
				className="mx-1 [&>div:first-child]:sr-only"
			/>
			<div className="flex items-center justify-between px-3">
				<IconButton
					label="Previous"
					variant="ghost"
					size="icon-sm"
					onClick={() =>
						setTrack((value) => (value + tracks.length - 1) % tracks.length)
					}
				>
					<PreviousTrackIcon size={18} />
				</IconButton>
				<IconButton
					label={playing ? "Pause" : "Play"}
					variant="accent"
					onClick={() => setPlaying((value) => !value)}
				>
					{playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
				</IconButton>
				<IconButton
					label="Next"
					variant="ghost"
					size="icon-sm"
					onClick={() => setTrack((value) => (value + 1) % tracks.length)}
				>
					<NextTrackIcon size={18} />
				</IconButton>
			</div>
		</Panel>
	);
}

export function ComposerScene({ className }: SceneProps) {
	const [text, setText] = useState("");
	const [attached, setAttached] = useState(false);
	return (
		<Panel className={cn("flex w-72 flex-col gap-3", className)}>
			<TextField
				value={text}
				onChange={(event) => setText(event.target.value)}
				placeholder="How can I help?"
				label="Message"
				className="text-body placeholder:text-label-tertiary bg-transparent px-1 outline-none"
			/>
			{attached && <Chip tone="accent">Design notes.pdf</Chip>}
			<div className="flex items-center justify-between">
				<IconButton
					label={attached ? "Remove attachment" : "Attach sample file"}
					variant="secondary"
					size="icon-sm"
					aria-pressed={attached}
					onClick={() => setAttached((value) => !value)}
				>
					<AttachIcon size={18} />
				</IconButton>
				<IconButton
					label="Send"
					disabled={!text.trim() && !attached}
					variant="default"
					size="icon-sm"
					onClick={() => {
						setText("");
						setAttached(false);
						toast.success("Sent (just a demo)");
					}}
				>
					<UploadIcon size={18} />
				</IconButton>
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
					<span className="text-headline font-semibold">Sun lamp</span>
					<span className="text-footnote text-label-secondary">
						Warm light, all day
					</span>
				</div>
				<span className="text-headline font-semibold tabular-nums">$129</span>
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
				<span className="text-headline font-semibold">Points</span>
				<span className="text-footnote text-label-secondary tabular-nums">
					6 of 8
				</span>
			</div>
			<div className="flex gap-1 px-1">
				{Array.from({ length: 8 }, (_, index) => (
					<span
						key={index}
						className={cn(
							"h-2 flex-1 rounded-full transition-colors duration-700",
							index < 6 ? "bg-accent" : "bg-fill",
						)}
					/>
				))}
			</div>
			<div className="flex items-center gap-2 px-1">
				<div className="flex -space-x-1.5">
					{["AK", "MS", "JT"].map((initials) => (
						<ProfileImage
							key={initials}
							className="ring-elevated size-8 ring-2"
						>
							<ProfileImageFallback>{initials}</ProfileImageFallback>
						</ProfileImage>
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
			<Chip tone="accent">Limited time</Chip>
		</span>
	);
}

export function ShippingToggle({ className }: SceneProps) {
	const [on, setOn] = useState(true);
	return (
		<span
			className={cn(
				"bg-elevated/80 inline-flex rounded-full px-3 py-1.5 shadow-sm ring-1 ring-black/[0.04] backdrop-blur",
				className,
			)}
		>
			<Toggle
				style="checkbox"
				label="Free shipping"
				checked={on}
				onChange={setOn}
			/>
		</span>
	);
}
