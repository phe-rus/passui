import { Button } from "@passui/react/button";
import { Marker } from "@passui/react/marker";

export function MarkerRow() {
	return (
		<Marker
			variant="row"
			className="w-full max-w-sm"
			action={
				<Button size="xs" variant="secondary">
					Undo
				</Button>
			}
		>
			Moved to Archive
		</Marker>
	);
}
