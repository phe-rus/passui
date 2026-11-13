import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@passui/react/empty";

export function EmptySearch() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No matches</EmptyTitle>
				<EmptyDescription>
					Try a shorter phrase or a different component name.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
