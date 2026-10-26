import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Picker } from "@passui/solid/picker"
import { Section } from "@passui/solid/section"
import { Button } from "@passui/solid/button"
import { Toggle } from "@passui/solid/toggle"

export function SectionShowcase() {
    const [backup, setBackup] = createSignal(true)
    const [quality, setQuality] = createSignal("high")
    return (
        <div class="flex w-full max-w-sm flex-col gap-6">
            <Section
                title="Storage"
                footer="Backups run at night while charging."
            >
                <LabeledContent label="Back up automatically">
                    <Toggle
                        label="Back up automatically"
                        labelHidden
                        checked={backup()}
                        onChange={setBackup}
                    />
                </LabeledContent>
                <LabeledContent label="Photo quality">
                    <Picker
                        label="Photo quality"
                        value={quality()}
                        onChange={setQuality}
                        options={[
                            { value: "high", label: "High" },
                            {
                                value: "saver",
                                label: "Space saver",
                            },
                        ]}
                    />
                </LabeledContent>
                <LabeledContent
                    label="Used"
                    description="12.4 GB of 50 GB"
                >
                    <span class="text-subheadline text-label-secondary">
                        25%
                    </span>
                </LabeledContent>
            </Section>
            <Section>
                <LabeledContent
                    label="Free up space"
                    description="Removes copies already backed up."
                >
                    <Button size="sm" variant="secondary">
                        Review
                    </Button>
                </LabeledContent>
            </Section>
        </div>
    )
}
