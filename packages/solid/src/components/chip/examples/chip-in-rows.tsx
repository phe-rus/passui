import { Chip } from "@passui/solid/chip"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"

export function ChipInRows() {
    return (
        <div class="w-full max-w-sm">
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
