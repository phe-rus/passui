import {
    LabeledContent,
    Section,
    SegmentedControl,
} from "@passui/react"
import { TextField } from "@passui/react/text-field"
import { useState } from "react"

export function LabeledContentShowcase() {
    const [density, setDensity] = useState("comfortable")
    const [signature, setSignature] = useState(
        "Sent from Passui"
    )

    return (
        <div className="w-full max-w-md">
            <Section title="Mail">
                <LabeledContent
                    label="Density"
                    description="How much fits on screen."
                    wide
                >
                    <SegmentedControl
                        label="Density"
                        value={density}
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
                        value={signature}
                        onChange={(event) =>
                            setSignature(event.target.value)
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
