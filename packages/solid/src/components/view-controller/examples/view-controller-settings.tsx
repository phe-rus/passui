import { ViewController } from "@passui/solid/view-controller"
import { Section } from "@passui/solid/section"
import { LabeledContent } from "@passui/solid/labeled-content"

export function ViewControllerSettings() {
    return (
        <div class="w-full max-w-lg rounded-4xl bg-background px-6 shadow-sm ring-1 ring-separator/60">
            <ViewController
                class="py-8"
                heading={
                    <ViewController.Heading
                        title="Personal info"
                        description="Your name and how to reach you."
                    />
                }
            >
                <Section title="Basics">
                    <LabeledContent label="Name">
                        <span class="text-subheadline text-label-secondary">
                            Aiko Kamado
                        </span>
                    </LabeledContent>
                    <LabeledContent label="Birthday">
                        <span class="text-subheadline text-label-secondary">
                            21 July
                        </span>
                    </LabeledContent>
                </Section>
            </ViewController>
        </div>
    )
}
