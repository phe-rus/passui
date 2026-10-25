import {
    LabeledContent,
    Picker,
    Section,
} from "@passui/react"
import { Button } from "@passui/react/button"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function SectionShowcase() {
    const [backup, setBackup] = useState(true)
    const [quality, setQuality] = useState("high")

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Section
                title="Storage"
                footer="Backups run at night while charging."
            >
                <LabeledContent label="Back up automatically">
                    <Toggle
                        label="Back up automatically"
                        labelHidden
                        checked={backup}
                        onChange={setBackup}
                    />
                </LabeledContent>
                <LabeledContent label="Photo quality">
                    <Picker
                        label="Photo quality"
                        value={quality}
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
                    <span className="text-subheadline text-label-secondary">
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
