import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@passui/react/pagination";

export function PaginationUsage() {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#1" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#1">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#2" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#9">9</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#3" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
