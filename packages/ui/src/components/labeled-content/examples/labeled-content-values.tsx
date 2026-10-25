import { Chip, LabeledContent, Section } from "@passui/react"

export function LabeledContentValues() {
    return (
        <div className="w-full max-w-sm">
            <Section
                title="Account"
                footer="Contact support to change your account ID."
            >
                <LabeledContent label="Account ID">
                    <span className="font-mono text-footnote text-label-secondary">
                        pass_7f3a9c
                    </span>
                </LabeledContent>
                <LabeledContent label="Plan">
                    <Chip tone="accent">Family</Chip>
                </LabeledContent>
                <LabeledContent label="Member since">
                    <span className="text-subheadline text-label-secondary">
                        March 2024
                    </span>
                </LabeledContent>
            </Section>
        </div>
    )
}
