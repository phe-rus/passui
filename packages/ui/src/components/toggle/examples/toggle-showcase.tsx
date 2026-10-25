import { LabeledContent, Section } from "@passui/react"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function ToggleShowcase() {
    const [airplane, setAirplane] = useState(false)
    const [wifi, setWifi] = useState(true)
    const [bluetooth, setBluetooth] = useState(true)
    const [focus, setFocus] = useState(false)

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Section title="Connections">
                <LabeledContent label="Airplane mode">
                    <Toggle
                        label="Airplane mode"
                        labelHidden
                        checked={airplane}
                        onChange={setAirplane}
                    />
                </LabeledContent>
                <LabeledContent
                    label="Wi-Fi"
                    description={wifi ? "Home" : "Off"}
                >
                    <Toggle
                        label="Wi-Fi"
                        labelHidden
                        checked={wifi}
                        disabled={airplane}
                        onChange={setWifi}
                    />
                </LabeledContent>
                <LabeledContent label="Bluetooth">
                    <Toggle
                        label="Bluetooth"
                        labelHidden
                        checked={bluetooth}
                        disabled={airplane}
                        onChange={setBluetooth}
                    />
                </LabeledContent>
            </Section>
            <Section
                title="Focus"
                footer="Silences calls and alerts until you turn it off."
            >
                <LabeledContent label="Do not disturb">
                    <Toggle
                        label="Do not disturb"
                        labelHidden
                        checked={focus}
                        onChange={setFocus}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
