import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@passui/react/empty";

export function EmptyUsage() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No results</EmptyTitle>
				<EmptyDescription>Try another search.</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
