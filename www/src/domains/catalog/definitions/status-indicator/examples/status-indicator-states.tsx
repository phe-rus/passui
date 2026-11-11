import { StatusIndicator } from "@passui/react";

export function StatusIndicatorStates() {
	return (
		<div className="bg-elevated ring-separator/60 flex flex-col gap-3 rounded-4xl p-5 shadow-sm ring-1">
			<StatusIndicator state="saved">All changes saved</StatusIndicator>
			<StatusIndicator state="syncing">Syncing 3 notes</StatusIndicator>
			<StatusIndicator state="offline">
				Offline. Changes save when you reconnect.
			</StatusIndicator>
		</div>
	);
}
