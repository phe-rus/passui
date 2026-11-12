import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@passui/react/pagination";

export function PaginationSimple() {
	return (
		<Pagination>
			<PaginationContent className="w-full max-w-sm justify-between">
				<PaginationItem>
					<PaginationPrevious href="#1" />
				</PaginationItem>
				<PaginationItem>
					<span className="text-footnote text-label-secondary">
						Page 2 of 9
					</span>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#3" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
