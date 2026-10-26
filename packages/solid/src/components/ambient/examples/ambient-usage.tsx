import { Ambient } from "@passui/solid/ambient"

export function AmbientUsage() {
    return (
        <Ambient
            src="/avatars/aiko.svg"
            class="flex w-full max-w-sm flex-col items-center gap-3 py-10 text-center"
        >
            <img
                src="/avatars/aiko.svg"
                alt="Portrait of Aiko"
                class="size-20 rounded-full"
            />
            <p class="text-headline font-semibold text-label">
                Aiko Kamado
            </p>
            <p class="text-footnote text-label-secondary">
                Every image brings its own atmosphere.
            </p>
        </Ambient>
    )
}
