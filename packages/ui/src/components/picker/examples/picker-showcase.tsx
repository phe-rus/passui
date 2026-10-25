import {
    LabeledContent,
    Picker,
    Section,
} from "@passui/react"
import { useState } from "react"

export function PickerShowcase() {
    const [language, setLanguage] = useState("en")
    const [region, setRegion] = useState("ke")
    const [calendar, setCalendar] = useState("gregorian")

    return (
        <div className="w-full max-w-sm">
            <Section
                title="Language and region"
                footer="Dates, numbers and currency follow your region."
            >
                <LabeledContent label="Language">
                    <Picker
                        label="Language"
                        value={language}
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
                        value={region}
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
                        value={calendar}
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
