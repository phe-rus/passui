import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@passui/react/empty";

export function EmptyEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No saved items</EmptyTitle>
				<EmptyDescription>Items you save will appear here.</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
