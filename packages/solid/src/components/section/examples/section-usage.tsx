import { Section } from "@passui/solid/section"
import { LabeledContent } from "@passui/solid/labeled-content"

export function SectionUsage() {
    return (
        <div class="w-full max-w-sm">
            <Section
                title="Account"
                footer="Your name appears on shared notes."
            >
                <LabeledContent label="Name">
                    Aiko Kamado
                </LabeledContent>
                <LabeledContent label="Email">
                    aiko@example.com
                </LabeledContent>
            </Section>
        </div>
    )
}
