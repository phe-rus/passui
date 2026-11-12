import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	pageRange,
} from "@passui/react/pagination";
import { useState } from "react";

const total = 20;

export function PaginationRange() {
	const [page, setPage] = useState(8);
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						render={<button type="button" />}
						onClick={() => setPage((value) => Math.max(1, value - 1))}
					/>
				</PaginationItem>
				{pageRange(page, total).map((entry, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: ellipses repeat
					<PaginationItem key={index}>
						{entry === "ellipsis" ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								render={<button type="button" />}
								isActive={entry === page}
								onClick={() => setPage(entry)}
							>
								{entry}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						render={<button type="button" />}
						onClick={() => setPage((value) => Math.min(total, value + 1))}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
