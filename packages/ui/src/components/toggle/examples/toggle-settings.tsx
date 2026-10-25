import { LabeledContent, Section } from "@passui/react"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function ToggleSettings() {
    const [sync, setSync] = useState(true)
    const [sounds, setSounds] = useState(false)

    return (
        <div className="w-full max-w-sm">
            <Section title="Notifications">
                <LabeledContent label="Sync across devices">
                    <Toggle
                        label="Sync"
                        labelHidden
                        checked={sync}
                        onChange={setSync}
                    />
                </LabeledContent>
                <LabeledContent label="Sounds">
                    <Toggle
                        label="Sounds"
                        labelHidden
                        checked={sounds}
                        onChange={setSounds}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
