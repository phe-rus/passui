import {
    NextTrackIcon,
    PauseIcon,
    PreviousTrackIcon,
} from "@passui/react/icons"

import { Ambient } from "@passui/react/ambient"
import { IconButton } from "@passui/react/icon-button"

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
                <span className="text-headline font-semibold text-label">
                    Morning Light
                </span>
                <span className="text-footnote text-label-secondary">
                    Kenji Mori
                </span>
            </div>
            <div className="flex items-center gap-2">
                <IconButton label="Previous" variant="ghost">
                    <PreviousTrackIcon size={22} />
                </IconButton>
                <IconButton
                    label="Pause"
                    variant="secondary"
                    size="icon-lg"
                >
                    <PauseIcon size={24} />
                </IconButton>
                <IconButton label="Next" variant="ghost">
                    <NextTrackIcon size={22} />
                </IconButton>
            </div>
        </Ambient>
    )
}
