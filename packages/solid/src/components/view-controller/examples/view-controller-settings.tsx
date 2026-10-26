import { createSignal } from "solid-js"
import { ViewController } from "@passui/solid/view-controller"
import { Toggle } from "@passui/solid/toggle"

export function ViewControllerSettings() {
    const [updates, setUpdates] = createSignal(true)
    const [summary, setSummary] = createSignal(false)
    return (
        <ViewController
            class="w-full max-w-lg py-4"
            heading={
                <ViewController.Heading
                    title="Notifications"
                    description="Choose how we contact you."
                />
            }
        >
            <div class="grid gap-3">
                <Toggle
                    label="Product updates"
                    checked={updates()}
                    onChange={setUpdates}
                />
                <Toggle
                    label="Weekly summary"
                    checked={summary()}
                    onChange={setSummary}
                />
            </div>
        </ViewController>
    )
}
