import { ChevronFirstIcon } from "@passui/icons/chevron-first";
import { ChevronLastIcon } from "@passui/icons/chevron-last";
import { ChevronLeftIcon } from "@passui/icons/chevron-left";
import { ChevronRightIcon } from "@passui/icons/chevron-right";
import { Button } from "@passui/react/button";
import { Select } from "@passui/react/select";
import type { ReactTable, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "./data-table";

type DataTablePaginationProps<TData extends RowData> = {
	table: ReactTable<DataTableFeatures, TData>;
	pageSizeOptions?: number[];
};

export function DataTablePagination<TData extends RowData>({
	table,
	pageSizeOptions = [10, 20, 30, 50],
}: DataTablePaginationProps<TData>) {
	const { pageIndex, pageSize } = table.state.pagination;
	const pageCount = table.getPageCount();

	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
			<p className="text-footnote text-label-secondary shrink-0 whitespace-nowrap">
				Page {pageCount ? pageIndex + 1 : 0} of {pageCount}
			</p>

			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					aria-label="First page"
					type="button"
					size="icon-sm"
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.setPageIndex(0)}
				>
					<ChevronFirstIcon size={16} />
				</Button>
				<Button
					variant="ghost"
					aria-label="Previous page"
					type="button"
					size="icon-sm"
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
				>
					<ChevronLeftIcon size={16} />
				</Button>
				<Button
					variant="ghost"
					aria-label="Next page"
					type="button"
					size="icon-sm"
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
				>
					<ChevronRightIcon size={16} />
				</Button>
				<Button
					variant="ghost"
					aria-label="Last page"
					type="button"
					size="icon-sm"
					disabled={!table.getCanNextPage()}
					onClick={() => table.setPageIndex(pageCount - 1)}
				>
					<ChevronLastIcon size={16} />
				</Button>
			</div>

			<div className="w-20 shrink-0">
				<Select
					className="w-full"
					aria-label="Rows per page"
					value={String(pageSize)}
					onValueChange={(value) => value && table.setPageSize(Number(value))}
					items={pageSizeOptions.map((size) => ({
						value: String(size),
						label: String(size),
					}))}
				/>
			</div>
		</div>
	);
}
