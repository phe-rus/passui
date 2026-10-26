import { createSignal } from "solid-js"
import { Picker } from "@passui/solid/picker"
import { Section } from "@passui/solid/section"
import { LabeledContent } from "@passui/solid/labeled-content"

export function PickerDetails() {
    const [region, setRegion] = createSignal("eu")
    return (
        <div class="w-full max-w-sm">
            <Section
                title="Data"
                footer="Where your account's data is stored."
            >
                <LabeledContent label="Region">
                    <Picker
                        label="Region"
                        value={region()}
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
