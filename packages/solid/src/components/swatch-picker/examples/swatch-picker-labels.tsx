import { createSignal } from "solid-js"
import { SwatchPicker } from "@passui/solid/swatch-picker"
import { Chip } from "@passui/solid/chip"

const colors = [
    {
        value: "family",
        label: "Green",
        color: "#e3f3eb",
        ink: "#24704f",
    },
    {
        value: "public",
        label: "Blue",
        color: "#e8efff",
        ink: "#2c55b8",
    },
    {
        value: "friends",
        label: "Purple",
        color: "#ede8ff",
        ink: "#5a3fc0",
    },
] as const

export function SwatchPickerLabels() {
    const [tone, setTone] =
        createSignal<(typeof colors)[number]["value"]>(
            "family"
        )
    return (
        <div class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60">
            <div class="flex items-center justify-between">
                <span class="text-subheadline font-medium text-label">
                    Tag color
                </span>
                <Chip tone={tone()}>Weekend trip</Chip>
            </div>
            <SwatchPicker
                label="Tag color"
                options={[...colors]}
                value={tone()}
                onChange={(value) =>
                    setTone(
                        value as (typeof colors)[number]["value"]
                    )
                }
            />
        </div>
    )
}
