import { Ambient } from "@passui/solid/ambient"
import { createSignal } from "solid-js"
import { IconButton } from "@passui/solid/icon-button"

export function AmbientNowPlaying() {
    const [playing, setPlaying] = createSignal(true)

    return (
        <Ambient
            src="/avatars/kenji.svg"
            class="flex w-full max-w-xs flex-col items-center gap-4 py-10 text-center"
        >
            <img
                src="/avatars/kenji.svg"
                alt=""
                class="size-40 rounded-4xl shadow-sm"
            />
            <div class="flex flex-col">
                <span class="text-headline font-semibold text-label">
                    Morning Light
                </span>
                <span class="text-footnote text-label-secondary">
                    Kenji Mori
                </span>
            </div>
            <div class="flex items-center gap-2">
                <IconButton label="Previous" variant="ghost">
                    <span aria-hidden="true">⏮</span>
                </IconButton>
                <IconButton
                    label={playing() ? "Pause" : "Play"}
                    variant="secondary"
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
        </Ambient>
    )
}
