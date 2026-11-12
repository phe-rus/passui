import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "@passui/react/pagination";
import { useState } from "react";

export function PaginationButtons() {
	const [page, setPage] = useState(1);
	return (
		<Pagination>
			<PaginationContent>
				{[1, 2, 3].map((n) => (
					<PaginationItem key={n}>
						<PaginationLink
							render={<button type="button" onClick={() => setPage(n)} />}
							isActive={page === n}
						>
							{n}
						</PaginationLink>
					</PaginationItem>
				))}
			</PaginationContent>
		</Pagination>
	);
}
