import { Marker } from "@passui/react/marker";

export function MarkerUsage() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<Marker variant="divider">Today</Marker>
			<Marker>Maya joined the conversation</Marker>
			<Marker
				variant="status"
				icon={<span className="bg-success size-1.5 rounded-full" />}
			>
				Online
			</Marker>
		</div>
	);
}
