import { Ambient } from "@passui/react/ambient"
import { Button } from "@passui/react/button"

export function AmbientShowcase() {
    return (
        <Ambient
            src="/avatars/mira.svg"
            className="flex w-full max-w-sm flex-col items-center gap-4 py-12 text-center"
        >
            <img
                src="/avatars/mira.svg"
                alt=""
                className="size-28 rounded-full shadow-sm"
            />
            <div className="flex flex-col gap-1">
                <h2 className="text-title2 font-bold text-label">
                    Mira Patel
                </h2>
                <p className="text-callout text-label-secondary">
                    Support lead, Lisbon
                </p>
            </div>
            <div className="flex gap-2">
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
