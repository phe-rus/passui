import { useId, type ReactNode } from "react";
import { cn } from "../../lib/class-names";

export interface SidebarSectionProps {
	/** Visible heading for this group of navigation rows. */
	title: string;
	children: ReactNode;
}

export interface SidebarItemContentProps {
	icon?: ReactNode;
	/** Optional trailing count. */
	count?: number;
	/** Matches the router link's active state. */
	active?: boolean;
	children: ReactNode;
}

export function SidebarSection({
	title,
	children,
	size = "md",
}: SidebarSectionProps & { size?: SidebarSize }) {
	const headingId = useId();
	return (
		<section aria-labelledby={headingId} className="flex flex-col gap-0.5">
			<h2 id={headingId} className={sidebarHeadingSizes[size]}>
				{title}
			</h2>
			{children}
		</section>
	);
}

/** Classes for a sidebar row; apply to the app's router link. */
export type SidebarDensity = "regular" | "compact";
export type SidebarSize = "sm" | "md" | "lg";

const sidebarItemSizes: Record<SidebarSize, string> = {
	sm: "min-h-8 rounded-lg px-2 py-1 text-footnote [@media(pointer:coarse)]:min-h-10",
	md: "rounded-2xl px-2.5 py-[7px] text-subheadline",
	lg: "rounded-2xl px-3 py-2.5 text-body [@media(pointer:coarse)]:min-h-13",
};
const sidebarHeadingSizes: Record<SidebarSize, string> = {
	sm: "px-2 pb-1 text-caption2 font-semibold text-label-tertiary",
	md: "px-2.5 pb-1.5 text-caption font-semibold text-label-tertiary",
	lg: "px-3 pb-2 text-subheadline font-semibold text-label-tertiary",
};
const sidebarCountSizes: Record<SidebarSize, string> = {
	sm: "text-caption2 tabular-nums",
	md: "text-footnote tabular-nums",
	lg: "text-subheadline tabular-nums",
};

export function sidebarItemClass(
	active?: boolean,
	density: SidebarDensity = "regular",
	size?: SidebarSize,
): string {
	const resolved = size ?? (density === "compact" ? "sm" : "md");
	return cn(
		"group text-label duration-fast focus-visible:outline-accent-text flex w-full items-center gap-2.5 no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
		sidebarItemSizes[resolved],
		active
			? "bg-fill font-medium"
			: "text-label-secondary hover:bg-fill/70 hover:text-label font-normal",
	);
}

export function SidebarItemContent({
	icon,
	count,
	active,
	size = "md",
	children,
}: SidebarItemContentProps & { size?: SidebarSize }) {
	return (
		<>
			{icon && (
				<span
					className={cn(
						"flex transition-colors",
						active ? "text-accent-text" : "text-label-secondary",
					)}
				>
					{icon}
				</span>
			)}
			<span className="grow truncate">{children}</span>
			{count !== undefined && (
				<span
					className={cn(
						sidebarCountSizes[size],
						active ? "text-accent-text" : "text-label-tertiary",
					)}
				>
					{count}
				</span>
			)}
		</>
	);
}
