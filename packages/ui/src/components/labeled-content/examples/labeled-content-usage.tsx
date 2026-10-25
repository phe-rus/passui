import { LabeledContent } from "@passui/react"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function LabeledContentUsage() {
    const [previews, setPreviews] = useState(true)
    return (
        <div className="w-full max-w-sm rounded-3xl border border-separator/60 bg-elevated">
            <LabeledContent
                label="Show previews"
                description="Shows the first lines of each note."
            >
                <Toggle
                    label="Show previews"
                    labelHidden
                    checked={previews}
                    onChange={setPreviews}
                />
            </LabeledContent>
        </div>
    )
}
