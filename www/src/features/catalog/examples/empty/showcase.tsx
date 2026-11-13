import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@passui/react/empty";

export function EmptyShowcase() {
	return (
		<div className="w-full max-w-md">
			<Empty>
				<EmptyHeader>
					<EmptyTitle>No results</EmptyTitle>
					<EmptyDescription>Try another search.</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</div>
	);
}
