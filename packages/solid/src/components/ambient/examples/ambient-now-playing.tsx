/** @jsxImportSource solid-js */
import { Ambient } from "@passui/solid/ambient"
import { createSignal } from "solid-js"

export function AmbientNowPlaying() {
    const [playing, setPlaying] = createSignal(false)

    return (
        <Ambient
            src="/avatars/mira.svg"
            class="flex w-full max-w-xs flex-col items-center gap-3 py-6 text-center"
        >
            <img
                src="/avatars/mira.svg"
                alt="Cover artwork for Golden Hour"
                class="size-28 rounded-2xl shadow-lg"
            />
            <div>
                <h3 class="text-headline font-semibold text-label">
                    Golden Hour
                </h3>
                <p class="text-footnote text-label-secondary">
                    A quieter playlist
                </p>
            </div>
            <button
                type="button"
                aria-label={playing() ? "Pause playback" : "Start playback"}
                aria-pressed={playing()}
                onClick={() => setPlaying((current) => !current)}
                class="rounded-full bg-accent px-5 py-2 text-subheadline font-semibold text-white transition-transform active:scale-95"
            >
                {playing() ? "Pause" : "Play"}
            </button>
        </Ambient>
    )
}
