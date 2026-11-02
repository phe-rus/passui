import { useState } from "react"
import { AspectRatio } from "@passui/react/aspect-ratio"
import { SegmentedControl } from "@passui/react/segmented-control"

export function AspectRatioShowcase() {
    const [format, setFormat] = useState<"landscape" | "square" | "portrait">("landscape")
    const ratio = { landscape: 4 / 3, square: 1, portrait: 3 / 4 }[format]
    // Equal area: 75% of the stage, held three ways. Width and height
    // change, never scale; the corner remains a rounded crop, not a stretch.
    return (
        <div className="flex w-full max-w-72 flex-col gap-4">
            <div className="grid aspect-square w-full place-items-center">
                <AspectRatio
                    ratio={ratio}
                    style={{
                        width: `${Math.sqrt(0.75 * ratio) * 100}%`,
                        height: `${Math.sqrt(0.75 / ratio) * 100}%`,
                    }}
                    className="rounded-3xl bg-fill transition-[width,height] duration-500 ease-out motion-reduce:transition-none"
                >
                    <img
                        src="/avatars/aiko.svg"
                        alt="Portrait cropped to the selected format"
                        className="object-cover"
                    />
                </AspectRatio>
            </div>
            <SegmentedControl
                label="Crop format"
                value={format}
                onChange={setFormat}
                options={[
                    { value: "landscape", label: "4:3" },
                    { value: "square", label: "1:1" },
                    { value: "portrait", label: "3:4" },
                ]}
            />
        </div>
    )
}
