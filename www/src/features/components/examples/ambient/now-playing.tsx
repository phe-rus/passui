import { NextTrackIcon } from "@passui/icons/next-track";
import { PauseIcon } from "@passui/icons/pause";
import { PreviousTrackIcon } from "@passui/icons/previous-track";
import { Ambient } from "@passui/react/ambient";
import { Button } from "@passui/react/button";

export function AmbientNowPlaying() {
	return (
		<Ambient
			src="/avatars/kenji.svg"
			className="flex w-full max-w-xs flex-col items-center gap-4 py-10 text-center"
		>
			<img
				src="/avatars/kenji.svg"
				alt=""
				className="size-40 rounded-4xl shadow-sm"
			/>
			<div className="flex flex-col">
				<span className="text-headline text-label font-semibold">
					Morning Light
				</span>
				<span className="text-footnote text-label-secondary">Kenji Mori</span>
			</div>
			<div className="flex items-center gap-2">
				<Button size="icon" aria-label="Previous" variant="ghost">
					<PreviousTrackIcon size={22} />
				</Button>
				<Button aria-label="Pause" variant="secondary" size="icon-lg">
					<PauseIcon size={24} />
				</Button>
				<Button size="icon" aria-label="Next" variant="ghost">
					<NextTrackIcon size={22} />
				</Button>
			</div>
		</Ambient>
	);
}
