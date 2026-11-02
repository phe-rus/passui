import { useState } from "react"
import { Accordion } from "@passui/react/accordion"

export function AccordionShowcase() {
    const [value, setValue] = useState<string | null>("appearance")
    return (
        <Accordion
            className="max-w-lg"
            value={value}
            onValueChange={setValue}
            items={[
                {
                    value: "appearance",
                    title: "Appearance",
                    description: "Choose how the app looks",
                    content: (
                        <p className="text-footnote text-label-secondary">
                            System appearance follows your device.
                        </p>
                    ),
                },
                {
                    value: "privacy",
                    title: "Privacy",
                    description: "Manage your preferences",
                    content: (
                        <p className="text-footnote text-label-secondary">
                            Your choices stay on this device.
                        </p>
                    ),
                },
            ]}
        />
    )
}
