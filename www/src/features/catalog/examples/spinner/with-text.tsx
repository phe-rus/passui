import { Spinner } from "@passui/react/spinner";
import { Text } from "@passui/react/text";

export function SpinnerWithText() {
	return (
		<div className="flex items-center gap-2">
			<Spinner />
			<Text tone="secondary">Syncing your notes…</Text>
		</div>
	);
}
