import {
    LabeledContent,
    Picker,
    Section,
} from "@passui/react"
import { useState } from "react"

export function PickerDetails() {
    const [region, setRegion] = useState("eu")

    return (
        <div className="w-full max-w-sm">
            <Section
                title="Data"
                footer="Where your account's data is stored."
            >
                <LabeledContent label="Region">
                    <Picker
                        label="Region"
                        value={region}
                        onChange={setRegion}
                        options={[
                            {
                                value: "eu",
                                label: "Europe",
                                detail: "Frankfurt",
                            },
                            {
                                value: "us",
                                label: "United States",
                                detail: "Virginia",
                            },
                            {
                                value: "ap",
                                label: "Asia Pacific",
                                detail: "Tokyo",
                            },
                        ]}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
