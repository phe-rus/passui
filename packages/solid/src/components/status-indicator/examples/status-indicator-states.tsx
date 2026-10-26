import { StatusIndicator } from "@passui/solid/status-indicator"

export function StatusIndicatorStates() {
    return (
        <div class="flex flex-col gap-3 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <StatusIndicator state="saved">
                All changes saved
            </StatusIndicator>
            <StatusIndicator state="syncing">
                Syncing 3 notes
            </StatusIndicator>
            <StatusIndicator state="offline">
                Offline. Changes save when you reconnect.
            </StatusIndicator>
        </div>
    )
}
