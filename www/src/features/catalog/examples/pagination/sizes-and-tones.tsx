import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@passui/react/pagination";

export function PaginationSizesAndTones() {
	return (
		<div className="flex flex-col gap-4">
			{(
				[
					["sm", "neutral"],
					["default", "accent"],
					["lg", "primary"],
				] as const
			).map(([size, tone]) => (
				<Pagination key={size} size={size} tone={tone}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#1" />
						</PaginationItem>
						{[1, 2, 3].map((page) => (
							<PaginationItem key={page}>
								<PaginationLink href={`#${page}`} isActive={page === 2}>
									{page}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext href="#3" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			))}
		</div>
	);
}
