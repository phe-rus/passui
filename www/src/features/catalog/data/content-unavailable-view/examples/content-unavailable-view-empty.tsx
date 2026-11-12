import { ContentUnavailableView } from "@passui/react/content-unavailable-view";

export function ContentUnavailableViewEmpty() {
	return (
		<ContentUnavailableView
			title="No saved items"
			description="Items you save will appear here."
		/>
	);
}
