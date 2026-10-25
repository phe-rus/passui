import {
    LabeledContent,
    Section,
    SwatchPicker,
} from "@passui/react"
import { Button } from "@passui/react/button"
import { Sheet } from "@passui/react/sheet"
import { useState } from "react"

const accents = [
    {
        value: "blush",
        label: "Blush",
        color: "#f2d4d7",
        ink: "#9e3b4f",
    },
    {
        value: "sage",
        label: "Sage",
        color: "#d6e6d3",
        ink: "#3f6b45",
    },
    {
        value: "ocean",
        label: "Ocean",
        color: "#d3e3f2",
        ink: "#2f5f8f",
    },
]

export function SheetShowcase() {
    const [open, setOpen] = useState(false)
    const [accent, setAccent] = useState("blush")

    return (
        <div className="w-full max-w-sm">
            <Section title="Appearance">
                <LabeledContent label="Accent color">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        {
                            accents.find(
                                (a) => a.value === accent
                            )?.label
                        }
                    </Button>
                </LabeledContent>
            </Section>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label="Accent color"
            >
                <div className="flex flex-col gap-5 p-6">
                    <h2 className="text-title3 font-semibold text-label">
                        Accent color
                    </h2>
                    <SwatchPicker
                        label="Accent color"
                        options={accents}
                        value={accent}
                        onChange={setAccent}
                    />
                    <Button onClick={() => setOpen(false)}>
                        Done
                    </Button>
                </div>
            </Sheet>
        </div>
    )
}
