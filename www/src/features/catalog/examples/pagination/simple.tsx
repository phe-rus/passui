import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@passui/react/pagination";
import { Text } from "@passui/react/text";

export function PaginationSimple() {
	return (
		<Pagination>
			<PaginationContent className="w-full max-w-sm justify-between">
				<PaginationItem>
					<PaginationPrevious href="#1" />
				</PaginationItem>
				<PaginationItem>
					<Text as="span" size="footnote" tone="secondary">
						Page 2 of 9
					</Text>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#3" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
