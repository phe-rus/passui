import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { Toggle } from "@passui/solid/toggle"

export function ToggleShowcase() {
    const [airplane, setAirplane] = createSignal(false)
    const [wifi, setWifi] = createSignal(true)
    const [bluetooth, setBluetooth] = createSignal(true)
    const [focus, setFocus] = createSignal(false)
    return (
        <div class="flex w-full max-w-sm flex-col gap-6">
            <Section title="Connections">
                <LabeledContent label="Airplane mode">
                    <Toggle
                        label="Airplane mode"
                        labelHidden
                        checked={airplane()}
                        onChange={setAirplane}
                    />
                </LabeledContent>
                <LabeledContent
                    label="Wi-Fi"
                    description={wifi() ? "Home" : "Off"}
                >
                    <Toggle
                        label="Wi-Fi"
                        labelHidden
                        checked={wifi()}
                        disabled={airplane()}
                        onChange={setWifi}
                    />
                </LabeledContent>
                <LabeledContent label="Bluetooth">
                    <Toggle
                        label="Bluetooth"
                        labelHidden
                        checked={bluetooth()}
                        disabled={airplane()}
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
                        checked={focus()}
                        onChange={setFocus}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
