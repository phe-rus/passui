import { Marker } from "@passui/react/marker";

export function MarkerStatuses() {
	return (
		<div className="flex flex-col gap-3">
			<Marker
				variant="status"
				icon={<span className="bg-success size-1.5 rounded-full" />}
			>
				Online
			</Marker>
			<Marker
				variant="status"
				icon={<span className="bg-warning size-1.5 rounded-full" />}
			>
				Away
			</Marker>
		</div>
	);
}
