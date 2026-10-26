import { createSignal } from "solid-js"
import { Toggle } from "../toggle"

export function ToggleCheckboxes() {
    const [updates, setUpdates] = createSignal(true)
    const [research, setResearch] = createSignal(false)

    return (
        <div class="flex w-full max-w-sm flex-col gap-4">
            <Toggle
                style="checkbox"
                label="Product updates"
                checked={updates()}
                onChange={setUpdates}
            />
            <Toggle
                style="checkbox"
                label="Research invitations"
                checked={research()}
                onChange={setResearch}
            />
        </div>
    )
}
