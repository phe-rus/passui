import { AspectRatio } from "@passui/react/aspect-ratio"
export function AspectRatioSquare() {
    return (
        <AspectRatio ratio={1} className="max-w-xs rounded-3xl bg-fill">
            <div className="absolute inset-0 grid place-items-center text-subheadline text-label-secondary">
                1
            </div>
        </AspectRatio>
    )
}
