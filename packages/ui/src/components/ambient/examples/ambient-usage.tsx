import { Ambient } from "@passui/react/ambient"

export function AmbientUsage() {
    return (
        <Ambient
            src="/avatars/aiko.svg"
            className="flex flex-col items-center gap-3 py-10"
        >
            <img
                src="/avatars/aiko.svg"
                alt=""
                className="size-20 rounded-full"
            />
            <p className="text-headline font-semibold text-label">
                Aiko Kamado
            </p>
        </Ambient>
    )
}
