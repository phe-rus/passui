import { StatusIndicator } from "@passui/solid/status-indicator"

export function StatusIndicatorStates() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-6">
            <StatusIndicator state="saved">
                Saved
            </StatusIndicator>
            <StatusIndicator state="syncing">
                Syncing
            </StatusIndicator>
            <StatusIndicator state="offline">
                Offline
            </StatusIndicator>
        </div>
    )
}
