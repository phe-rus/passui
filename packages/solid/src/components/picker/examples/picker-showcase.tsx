import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Picker } from "@passui/solid/picker"
import { Section } from "@passui/solid/section"

export function PickerShowcase() {
    const [language, setLanguage] = createSignal("en")
    const [region, setRegion] = createSignal("ke")
    const [calendar, setCalendar] = createSignal("gregorian")
    return (
        <div class="w-full max-w-sm">
            <Section
                title="Language and region"
                footer="Dates, numbers and currency follow your region."
            >
                <LabeledContent label="Language">
                    <Picker
                        label="Language"
                        value={language()}
                        onChange={setLanguage}
                        options={[
                            { value: "en", label: "English" },
                            {
                                value: "fr",
                                label: "Français",
                            },
                            { value: "zh", label: "中文" },
                        ]}
                    />
                </LabeledContent>
                <LabeledContent label="Region">
                    <Picker
                        label="Region"
                        value={region()}
                        onChange={setRegion}
                        options={[
                            { value: "ke", label: "Kenya" },
                            { value: "fr", label: "France" },
                            { value: "jp", label: "Japan" },
                        ]}
                    />
                </LabeledContent>
                <LabeledContent label="Calendar">
                    <Picker
                        label="Calendar"
                        value={calendar()}
                        onChange={setCalendar}
                        options={[
                            {
                                value: "gregorian",
                                label: "Gregorian",
                            },
                            {
                                value: "japanese",
                                label: "Japanese",
                            },
                        ]}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
