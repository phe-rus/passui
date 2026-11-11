import type { ReactNode } from "react";
import { cn } from "../../lib/class-names";

export type StatTileTone = "critical";
export type StatTileSize = "sm" | "md" | "lg";

const tileSizes: Record<
	StatTileSize,
	{ padding: string; valueText: string; labelText: string }
> = {
	sm: { padding: "p-3", valueText: "text-title3", labelText: "text-caption" },
	md: { padding: "p-4", valueText: "text-title1", labelText: "text-footnote" },
	lg: {
		padding: "p-5",
		valueText: "text-title",
		labelText: "text-subheadline",
	},
};

export interface StatTileProps {
	label: string;
	value: number;
	/** A quiet line under the number, like "3 signed in now". */
	caption?: ReactNode;
	/** Turns the number red once it's above zero. */
	tone?: StatTileTone;
	/** Makes the tile a toggle, e.g. a filter. */
	onClick?: () => void;
	active?: boolean;
	/** Custom classes for the tile container. */
	className?: string;
	/** Tile padding and number scale. @default "md" */
	size?: StatTileSize;
}

/** One number with its label, optionally a toggle. */
export function StatTile({
	label,
	value,
	caption,
	tone,
	onClick,
	active = false,
	className,
	size = "md",
}: StatTileProps) {
	const dims = tileSizes[size];
	const body = (
		<>
			<span className={cn(dims.labelText, "text-label-secondary")}>
				{label}
			</span>
			<span
				className={cn(
					"font-semibold tabular-nums",
					dims.valueText,
					tone === "critical" && value > 0 && "text-danger",
				)}
			>
				{value.toLocaleString("en-US")}
			</span>
			{caption && (
				<span className={cn(dims.labelText, "text-label-tertiary")}>
					{caption}
				</span>
			)}
		</>
	);
	const tileClass = cn(
		"border-separator/35 bg-elevated flex min-w-0 flex-col gap-2 rounded-2xl border text-left shadow-xs",
		dims.padding,
		className,
	);

	if (!onClick) return <div className={tileClass}>{body}</div>;
	return (
		<button
			type="button"
			aria-pressed={active}
			onClick={onClick}
			className={cn(
				tileClass,
				"hover:bg-fill/60 ring-1 ring-transparent transition-colors",
				active && "bg-fill/70 ring-label/15",
			)}
		>
			{body}
		</button>
	);
}
