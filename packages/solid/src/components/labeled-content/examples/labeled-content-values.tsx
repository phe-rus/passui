import { LabeledContent } from "@passui/solid/labeled-content"
import { Chip } from "@passui/solid/chip"
import { Section } from "@passui/solid/section"

export function LabeledContentValues() {
    return (
        <div class="w-full max-w-sm">
            <Section
                title="Account"
                footer="Contact support to change your account ID."
            >
                <LabeledContent label="Account ID">
                    <span class="font-mono text-footnote text-label-secondary">
                        pass_7f3a9c
                    </span>
                </LabeledContent>
                <LabeledContent label="Plan">
                    <Chip tone="accent">Family</Chip>
                </LabeledContent>
                <LabeledContent label="Member since">
                    <span class="text-subheadline text-label-secondary">
                        March 2024
                    </span>
                </LabeledContent>
            </Section>
        </div>
    )
}
