import { LabeledContent, Section } from "@passui/react"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function LabeledContentDescriptions() {
    const [alerts, setAlerts] = useState(true)
    const [digest, setDigest] = useState(false)

    return (
        <div className="w-full max-w-sm">
            <Section title="Email">
                <LabeledContent
                    label="Sign-in alerts"
                    description="When a new device signs in to your account."
                >
                    <Toggle
                        label="Sign-in alerts"
                        labelHidden
                        checked={alerts}
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
                        checked={digest}
                        onChange={setDigest}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
