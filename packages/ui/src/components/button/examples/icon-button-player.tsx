import {
    NextTrackIcon,
    PauseIcon,
    PlayIcon,
    PreviousTrackIcon,
} from "@passui/react/icons"
import { IconButton } from "@passui/react/icon-button"
import { useState } from "react"

export function IconButtonPlayer() {
    const [playing, setPlaying] = useState(false)

    return (
        <div className="flex items-center gap-3">
            <IconButton label="Previous" variant="ghost">
                <PreviousTrackIcon />
            </IconButton>
            <IconButton
                label={playing ? "Pause" : "Play"}
                variant="accent"
                size="icon-lg"
                onClick={() => setPlaying((value) => !value)}
            >
                {playing ? (
                    <PauseIcon size={22} />
                ) : (
                    <PlayIcon size={22} />
                )}
            </IconButton>
            <IconButton label="Next" variant="ghost">
                <NextTrackIcon />
            </IconButton>
        </div>
    )
}
