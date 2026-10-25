import {
    NextIcon,
    PauseIcon,
    PlayIcon,
    PreviousIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { IconButton } from "@passui/react/icon-button"
import { useState } from "react"

export function IconButtonPlayer() {
    const [playing, setPlaying] = useState(false)

    return (
        <div className="flex items-center gap-3">
            <IconButton label="Previous" variant="ghost">
                <HugeiconsIcon
                    icon={PreviousIcon}
                    size={20}
                />
            </IconButton>
            <IconButton
                label={playing ? "Pause" : "Play"}
                variant="accent"
                size="icon-lg"
                onClick={() => setPlaying((value) => !value)}
            >
                <HugeiconsIcon
                    icon={playing ? PauseIcon : PlayIcon}
                    size={22}
                />
            </IconButton>
            <IconButton label="Next" variant="ghost">
                <HugeiconsIcon icon={NextIcon} size={20} />
            </IconButton>
        </div>
    )
}
