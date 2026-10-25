import { LabeledContent, Section } from "@passui/react"

export function SectionUsage() {
    return (
        <div className="w-full max-w-sm">
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
