import { Marker } from "@passui/react/marker";

export function MarkerDividers() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			<Marker variant="divider">Yesterday</Marker>
			<Marker variant="divider">Today</Marker>
		</div>
	);
}
