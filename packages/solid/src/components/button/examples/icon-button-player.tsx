import { createSignal } from "solid-js"
import { IconButton } from "@passui/solid/icon-button"

export function IconButtonPlayer() {
    const [playing, setPlaying] = createSignal(false)
    return (
        <div class="flex items-center gap-3">
            <IconButton
                label={playing() ? "Pause" : "Play"}
                onClick={() => setPlaying(!playing())}
            >
                <span aria-hidden="true">
                    {playing() ? "Ⅱ" : "▶"}
                </span>
            </IconButton>
            <span class="text-footnote text-label-secondary">
                {playing() ? "Now playing" : "Paused"}
            </span>
        </div>
    )
}
