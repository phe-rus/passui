import { AspectRatio } from "@passui/react/aspect-ratio"
export function AspectRatioPortrait() {
    return (
        <AspectRatio ratio={3 / 4} className="max-w-xs rounded-3xl bg-fill">
            <div className="absolute inset-0 grid place-items-center text-subheadline text-label-secondary">
                3 / 4
            </div>
        </AspectRatio>
    )
}
