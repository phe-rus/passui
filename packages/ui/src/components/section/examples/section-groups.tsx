import { LabeledContent, Section } from "@passui/react"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function SectionGroups() {
    const [passkeys, setPasskeys] = useState(true)
    const [twoStep, setTwoStep] = useState(true)

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Section title="Sign in">
                <LabeledContent label="Passkeys">
                    <Toggle
                        label="Passkeys"
                        labelHidden
                        checked={passkeys}
                        onChange={setPasskeys}
                    />
                </LabeledContent>
                <LabeledContent label="Two-step verification">
                    <Toggle
                        label="Two-step verification"
                        labelHidden
                        checked={twoStep}
                        onChange={setTwoStep}
                    />
                </LabeledContent>
            </Section>
            <Section
                title="Recovery"
                footer="Used only if you lose access to every device."
            >
                <LabeledContent label="Recovery email">
                    <span className="text-subheadline text-label-secondary">
                        a•••@example.com
                    </span>
                </LabeledContent>
            </Section>
        </div>
    )
}
