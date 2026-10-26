import { Section } from "@passui/solid/section"

export function SectionGroups() {
    return (
        <div class="grid w-full max-w-md gap-4">
            <Section title="Profile">
                <div class="p-4">
                    Display name and picture
                </div>
            </Section>
            <Section
                title="Privacy"
                footer="Changes save automatically"
            >
                <div class="p-4">Control what others see</div>
            </Section>
        </div>
    )
}
