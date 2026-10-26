import { createSignal } from "solid-js"
import { SegmentedControl } from "@passui/solid/segmented-control"

export function SegmentedControlViews() {
    const [view, setView] = createSignal("grid")
    return (
        <div class="grid w-full max-w-sm gap-3">
            <SegmentedControl
                label="Layout"
                value={view()}
                onChange={setView}
                options={[
                    { value: "grid", label: "Grid" },
                    { value: "list", label: "List" },
                ]}
            />
            <p class="rounded-xl bg-fill p-3 text-footnote">
                {view() === "grid"
                    ? "Grid layout"
                    : "List layout"}{" "}
                selected
            </p>
        </div>
    )
}
