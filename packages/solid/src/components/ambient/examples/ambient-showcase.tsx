import { Ambient } from "@passui/solid/ambient"
import { Button } from "@passui/solid/button"

export function AmbientShowcase() {
    return (
        <Ambient
            src="/avatars/mira.svg"
            class="flex w-full max-w-sm flex-col items-center gap-4 py-12 text-center"
        >
            <img
                src="/avatars/mira.svg"
                alt=""
                class="size-28 rounded-full shadow-sm"
            />
            <div class="flex flex-col gap-1">
                <h2 class="text-title2 font-bold text-label">
                    Mira Patel
                </h2>
                <p class="text-callout text-label-secondary">
                    Support lead, Lisbon
                </p>
            </div>
            <div class="flex gap-2">
                <Button variant="accent" size="sm">
                    Message
                </Button>
                <Button variant="secondary" size="sm">
                    View profile
                </Button>
            </div>
        </Ambient>
    )
}
