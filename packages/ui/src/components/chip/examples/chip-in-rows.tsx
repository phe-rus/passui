import { Chip, LabeledContent, Section } from "@passui/react"

export function ChipInRows() {
    return (
        <div className="w-full max-w-sm">
            <Section title="Shared with">
                <LabeledContent label="Aiko Kamado">
                    <Chip tone="accent">Owner</Chip>
                </LabeledContent>
                <LabeledContent label="Kenji Mori">
                    <Chip tone="family">Family</Chip>
                </LabeledContent>
                <LabeledContent label="Anyone with the link">
                    <Chip tone="public">Public</Chip>
                </LabeledContent>
            </Section>
        </div>
    )
}
