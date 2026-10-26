import { Ambient } from "@passui/solid/ambient"

export function AmbientUsage() {
    return (
        <Ambient
            src="/avatars/aiko.svg"
            class="flex flex-col items-center gap-3 py-10"
        >
            <img
                src="/avatars/aiko.svg"
                alt=""
                class="size-20 rounded-full"
            />
            <p class="text-headline font-semibold text-label">
                Aiko Kamado
            </p>
        </Ambient>
    )
}
