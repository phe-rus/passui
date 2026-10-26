import { createSignal } from "solid-js"
import { IconButton } from "@passui/solid/icon-button"

export function IconButtonPlayer() {
    const [playing, setPlaying] = createSignal(false)
    return (
        <div class="flex items-center gap-3">
            <IconButton label="Previous" variant="ghost">
                <span aria-hidden="true">⏮</span>
            </IconButton>
            <IconButton
                label={playing() ? "Pause" : "Play"}
                variant="accent"
                size="icon-lg"
                onClick={() => setPlaying(!playing())}
            >
                <span aria-hidden="true">
                    {playing() ? "Ⅱ" : "▶"}
                </span>
            </IconButton>
            <IconButton label="Next" variant="ghost">
                <span aria-hidden="true">⏭</span>
            </IconButton>
        </div>
    )
}
