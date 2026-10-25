import { StatusIndicator } from "@passui/react"

const devices = [
    {
        name: "MacBook Pro",
        state: "saved",
        detail: "Up to date",
    },
    {
        name: "iPhone",
        state: "syncing",
        detail: "Syncing 12 notes",
    },
    {
        name: "iPad",
        state: "offline",
        detail: "Last seen yesterday",
    },
] as const

export function StatusIndicatorShowcase() {
    return (
        <ul className="m-0 flex w-full max-w-sm list-none flex-col divide-y divide-separator/60 overflow-hidden rounded-4xl bg-elevated p-0 shadow-sm ring-1 ring-separator/60">
            {devices.map((device) => (
                <li
                    key={device.name}
                    className="flex items-center justify-between px-5 py-4"
                >
                    <span className="text-subheadline font-semibold text-label">
                        {device.name}
                    </span>
                    <StatusIndicator state={device.state}>
                        {device.detail}
                    </StatusIndicator>
                </li>
            ))}
        </ul>
    )
}
