import { createSignal } from "solid-js"
import { IconButton } from "@passui/solid/icon-button"
import {
    NextIcon,
    PauseIcon,
    PlayIcon,
    PreviousIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function IconButtonPlayer() {
    const [playing, setPlaying] = createSignal(false)
    return (
        <div class="flex items-center gap-3">
            <IconButton label="Previous" variant="ghost">
                <Hugeicon icon={PreviousIcon} size={20} />
            </IconButton>
            <IconButton
                label={playing() ? "Pause" : "Play"}
                variant="accent"
                size="icon-lg"
                onClick={() => setPlaying(!playing())}
            >
                <Hugeicon
                    icon={playing() ? PauseIcon : PlayIcon}
                    size={22}
                />
            </IconButton>
            <IconButton label="Next" variant="ghost">
                <Hugeicon icon={NextIcon} size={20} />
            </IconButton>
        </div>
    )
}
