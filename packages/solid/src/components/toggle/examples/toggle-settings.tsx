import { createSignal } from "solid-js"
import { Toggle } from "../toggle"

export function ToggleSettings() {
    const [notifications, setNotifications] =
        createSignal(true)
    const [sounds, setSounds] = createSignal(false)

    return (
        <div class="flex w-full max-w-sm flex-col gap-4">
            <Toggle
                label="Notifications"
                checked={notifications()}
                onChange={setNotifications}
            />
            <Toggle
                label="Play sounds"
                checked={sounds()}
                onChange={setSounds}
            />
        </div>
    )
}
