import { createSignal } from "solid-js"
import { Section } from "@passui/solid/section"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Toggle } from "@passui/solid/toggle"

export function SectionGroups() {
    const [passkeys, setPasskeys] = createSignal(true)
    const [twoStep, setTwoStep] = createSignal(true)
    return (
        <div class="flex w-full max-w-sm flex-col gap-6">
            <Section title="Sign in">
                <LabeledContent label="Passkeys">
                    <Toggle
                        label="Passkeys"
                        labelHidden
                        checked={passkeys()}
                        onChange={setPasskeys}
                    />
                </LabeledContent>
                <LabeledContent label="Two-step verification">
                    <Toggle
                        label="Two-step verification"
                        labelHidden
                        checked={twoStep()}
                        onChange={setTwoStep}
                    />
                </LabeledContent>
            </Section>
            <Section
                title="Recovery"
                footer="Used only if you lose access to every device."
            >
                <LabeledContent label="Recovery email">
                    <span class="text-subheadline text-label-secondary">
                        a•••@example.com
                    </span>
                </LabeledContent>
            </Section>
        </div>
    )
}
