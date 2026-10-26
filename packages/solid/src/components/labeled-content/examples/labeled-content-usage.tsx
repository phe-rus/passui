import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Toggle } from "@passui/solid/toggle"

export function LabeledContentUsage() {
    const [previews, setPreviews] = createSignal(true)
    return (
        <div class="w-full max-w-sm rounded-3xl border border-separator/60 bg-elevated">
            <LabeledContent
                label="Show previews"
                description="Shows the first lines of each note."
            >
                <Toggle
                    label="Show previews"
                    labelHidden
                    checked={previews()}
                    onChange={setPreviews}
                />
            </LabeledContent>
        </div>
    )
}
