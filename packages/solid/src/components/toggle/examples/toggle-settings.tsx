import { createSignal } from "solid-js"
import { Toggle } from "@passui/solid/toggle"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"

export function ToggleSettings() {
    const [sync, setSync] = createSignal(true)
    const [sounds, setSounds] = createSignal(false)

    return (
        <div class="w-full max-w-sm">
            <Section title="Notifications">
                <LabeledContent label="Sync across devices">
                    <Toggle
                        label="Sync"
                        labelHidden
                        checked={sync()}
                        onChange={setSync}
                    />
                </LabeledContent>
                <LabeledContent label="Sounds">
                    <Toggle
                        label="Sounds"
                        labelHidden
                        checked={sounds()}
                        onChange={setSounds}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
