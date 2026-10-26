import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { Toggle } from "@passui/solid/toggle"

export function LabeledContentDescriptions() {
    const [alerts, setAlerts] = createSignal(true)
    const [digest, setDigest] = createSignal(false)
    return (
        <div class="w-full max-w-sm">
            <Section title="Email">
                <LabeledContent
                    label="Sign-in alerts"
                    description="When a new device signs in to your account."
                >
                    <Toggle
                        label="Sign-in alerts"
                        labelHidden
                        checked={alerts()}
                        onChange={setAlerts}
                    />
                </LabeledContent>
                <LabeledContent
                    label="Weekly digest"
                    description="A summary of activity every Monday."
                >
                    <Toggle
                        label="Weekly digest"
                        labelHidden
                        checked={digest()}
                        onChange={setDigest}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
