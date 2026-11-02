import { AspectRatio } from "@passui/react/aspect-ratio"
export function AspectRatioUsage() {
    return (
        <AspectRatio ratio={4 / 3} className="max-w-xs rounded-3xl bg-fill">
            <div className="absolute inset-0 grid place-items-center text-subheadline text-label-secondary">
                4 / 3
            </div>
        </AspectRatio>
    )
}
