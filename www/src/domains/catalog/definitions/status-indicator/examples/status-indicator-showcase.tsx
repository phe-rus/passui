import { StatusIndicator } from "@passui/react";

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
] as const;

export function StatusIndicatorShowcase() {
	return (
		<ul className="divide-separator/60 bg-elevated ring-separator/60 m-0 flex w-full max-w-sm list-none flex-col divide-y overflow-hidden rounded-4xl p-0 shadow-sm ring-1">
			{devices.map((device) => (
				<li
					key={device.name}
					className="flex items-center justify-between px-5 py-4"
				>
					<span className="text-subheadline text-label font-semibold">
						{device.name}
					</span>
					<StatusIndicator state={device.state}>
						{device.detail}
					</StatusIndicator>
				</li>
			))}
		</ul>
	);
}
