import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { SegmentedControl } from "@passui/solid/segmented-control"
import { TextField } from "@passui/solid/text-field"

export function LabeledContentShowcase() {
    const [density, setDensity] = createSignal("comfortable")
    const [signature, setSignature] = createSignal(
        "Sent from Passui"
    )
    return (
        <div class="w-full max-w-md">
            <Section title="Mail">
                <LabeledContent
                    label="Density"
                    description="How much fits on screen."
                    wide
                >
                    <SegmentedControl
                        label="Density"
                        value={density()}
                        onChange={setDensity}
                        options={[
                            {
                                value: "compact",
                                label: "Compact",
                            },
                            {
                                value: "comfortable",
                                label: "Comfortable",
                            },
                        ]}
                    />
                </LabeledContent>
                <LabeledContent label="Signature" stacked>
                    <TextField
                        label="Signature"
                        value={signature()}
                        onInput={(event) =>
                            setSignature(
                                event.currentTarget.value
                            )
                        }
                    />
                </LabeledContent>
                <LabeledContent label="Account">
                    aiko@example.com
                </LabeledContent>
            </Section>
        </div>
    )
}
