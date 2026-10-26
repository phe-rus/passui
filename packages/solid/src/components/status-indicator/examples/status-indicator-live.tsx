import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { StatusIndicator } from "@passui/solid/status-indicator"

export function StatusIndicatorLive() {
    const [online, setOnline] = createSignal(true)
    return (
        <div class="flex items-center gap-4">
            <StatusIndicator
                state={online() ? "saved" : "offline"}
            >
                {online() ? "Connected" : "Disconnected"}
            </StatusIndicator>
            <Button
                size="sm"
                variant="outline"
                onClick={() => setOnline(!online())}
            >
                Toggle connection
            </Button>
        </div>
    )
}
