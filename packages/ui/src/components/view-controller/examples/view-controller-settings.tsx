import { LabeledContent, Section } from "@passui/react"
import { ViewController } from "@passui/react/view-controller"

export function ViewControllerSettings() {
    return (
        <div className="w-full max-w-lg rounded-4xl bg-background px-6 shadow-sm ring-1 ring-separator/60">
            <ViewController
                className="py-8"
                heading={
                    <ViewController.Heading
                        title="Personal info"
                        description="Your name and how to reach you."
                    />
                }
            >
                <Section title="Basics">
                    <LabeledContent label="Name">
                        <span className="text-subheadline text-label-secondary">
                            Aiko Kamado
                        </span>
                    </LabeledContent>
                    <LabeledContent label="Birthday">
                        <span className="text-subheadline text-label-secondary">
                            21 July
                        </span>
                    </LabeledContent>
                </Section>
            </ViewController>
        </div>
    )
}
