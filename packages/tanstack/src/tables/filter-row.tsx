import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { IconButton } from "@passui/react/icon-button";
import { Button } from "@passui/react/legacy/button";
import { Toggle } from "@passui/react/toggle";
import type { Column, RowData } from "@tanstack/react-table";
import { useMemo } from "react";
import type { DataTableFeatures } from "./data-table";
import { getColumnLabel } from "./utils";

/**
 * The quick-filter checkbox list's own candidate values. For a plain scalar
 * column, one value per distinct cell. For an array-valued column, the
 * individual items across every row's array are what should show up as
 * checkboxes.
 */
function useQuickFilterValues<TData>(
	data: TData[],
	colId: string,
	exclude: string[],
	isArrayColumn: boolean,
) {
	return useMemo(() => {
		if (exclude.includes(colId)) return [];
		if (isArrayColumn) {
			const flattened = data.flatMap((row) => {
				const value = (row as Record<string, unknown>)[colId];
				return Array.isArray(value) ? value : [];
			});
			const unique = [
				...new Set(
					flattened.filter((v) => v !== null && v !== undefined && v !== ""),
				),
			];
			if (unique.length < 2 || unique.length > 20) return [];
			return unique.map((v) => String(v));
		}
		const raw = data.map((row) => (row as Record<string, unknown>)[colId]);
		const unique = [
			...new Set(
				raw.filter(
					(v) =>
						v !== null && v !== undefined && v !== "" && typeof v !== "object",
				),
			),
		];
		if (unique.length < 2 || unique.length > 12) return [];
		return unique.map((v) => String(v));
	}, [data, colId, exclude, isArrayColumn]);
}

export function FilterRow<TData extends RowData>({
	column,
	data,
	skip,
	isArrayColumn,
	isDateColumn,
}: {
	column: Column<DataTableFeatures, TData, unknown>;
	data: TData[];
	skip: string[];
	isArrayColumn: boolean;
	isDateColumn: boolean;
}) {
	const uniqueValues = useQuickFilterValues(
		data,
		column.id,
		skip,
		isArrayColumn,
	);
	const label = getColumnLabel(column);

	// A date column never gets the enumerated-values treatment below —
	// every row realistically has its own distinct timestamp — a from/to
	// range is what's actually useful.
	if (isDateColumn) {
		const [from, to] =
			(column.getFilterValue() as [string?, string?] | undefined) ?? [];
		return (
			<div className="flex items-center gap-3">
				<span className="text-caption2 text-muted-foreground w-20 shrink-0 font-medium">
					{label}
				</span>
				<div className="flex items-center gap-2">
					<input
						type="date"
						value={from ?? ""}
						onChange={(e) =>
							column.setFilterValue([e.target.value || undefined, to])
						}
						className="border-input/40 bg-background text-caption h-7 rounded-none border border-dashed px-2 outline-none"
					/>
					<span className="text-caption2 text-muted-foreground">to</span>
					<input
						type="date"
						value={to ?? ""}
						onChange={(e) =>
							column.setFilterValue([from, e.target.value || undefined])
						}
						className="border-input/40 bg-background text-caption h-7 rounded-none border border-dashed px-2 outline-none"
					/>
					{(from || to) && (
						<IconButton
							label="Clear filter"
							type="button"
							size="icon-sm"
							onClick={() => column.setFilterValue(undefined)}
							className="text-muted-foreground hover:text-foreground"
						>
							<HugeiconsIcon icon={Cancel01Icon} className="size-3" />
						</IconButton>
					)}
				</div>
			</div>
		);
	}

	// `activeFilter` is a bare value for a plain scalar column, or a
	// one-element array for an array-valued column (array-contains matching
	// needs an array of values to check for overlap, even when only one is
	// ever picked here).
	const activeFilter = column.getFilterValue() as string | string[] | undefined;
	const activeValue = isArrayColumn
		? Array.isArray(activeFilter)
			? activeFilter[0]
			: undefined
		: (activeFilter as string | undefined);

	if (uniqueValues.length > 0) {
		return (
			<div className="flex flex-col gap-1">
				<span className="text-caption">{label}</span>
				<div className="flex flex-wrap items-center gap-3">
					{uniqueValues.map((value) => {
						const active = activeValue === value;
						const setActive = () =>
							column.setFilterValue(
								active ? undefined : isArrayColumn ? [value] : value,
							);
						return (
							<button
								type="button"
								key={value}
								className="flex cursor-pointer items-center gap-2"
								onClick={setActive}
							>
								<Toggle
									style="checkbox"
									labelHidden
									label={value}
									checked={active}
									onChange={setActive}
								/>
								<span className="text-caption">{value}</span>
							</button>
						);
					})}
					{activeValue && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => column.setFilterValue(undefined)}
							className="text-muted-foreground hover:text-foreground"
						>
							<HugeiconsIcon icon={Cancel01Icon} className="size-3" />
							Clear
						</Button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-3">
			<span className="text-caption2 text-muted-foreground w-20 shrink-0 font-medium capitalize">
				{label}
			</span>
			<div className="relative max-w-xs flex-1">
				<input
					type="text"
					placeholder={`Filter ${label.toLowerCase()}…`}
					value={activeValue ?? ""}
					onChange={(e) =>
						column.setFilterValue(
							e.target.value
								? isArrayColumn
									? [e.target.value]
									: e.target.value
								: undefined,
						)
					}
					className="border-input/40 bg-background text-caption placeholder:text-muted-foreground/40 h-7 w-full rounded-none border border-dashed px-2.5 outline-none"
				/>
				{activeValue && (
					<IconButton
						label="Clear filter"
						type="button"
						size="icon-sm"
						onClick={() => column.setFilterValue(undefined)}
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 -translate-y-1/2"
					>
						<HugeiconsIcon icon={Cancel01Icon} className="size-3" />
					</IconButton>
				)}
			</div>
		</div>
	);
}
