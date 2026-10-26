import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { SegmentedControl } from "@passui/solid/segmented-control"
import { TextField } from "@passui/solid/text-field"

export function LabeledContentWide() {
    const [theme, setTheme] = createSignal("system")
    const [nickname, setNickname] = createSignal("Aiko")
    return (
        <div class="w-full max-w-md">
            <Section title="Profile">
                <LabeledContent label="Appearance" wide>
                    <SegmentedControl
                        label="Appearance"
                        value={theme()}
                        onChange={setTheme}
                        options={[
                            {
                                value: "system",
                                label: "System",
                            },
                            {
                                value: "light",
                                label: "Light",
                            },
                            { value: "dark", label: "Dark" },
                        ]}
                    />
                </LabeledContent>
                <LabeledContent label="Nickname" stacked>
                    <TextField
                        label="Nickname"
                        value={nickname()}
                        onInput={(event) =>
                            setNickname(
                                event.currentTarget.value
                            )
                        }
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
