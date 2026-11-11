import type { ReactNode } from "react";
import { cn } from "../../lib/class-names";

export type BreadcrumbSize = "sm" | "md";

const sizes: Record<BreadcrumbSize, string> = {
	sm: "text-caption",
	md: "text-footnote",
};

export interface BreadcrumbItem {
	label: string;
	href?: string;
}
export interface BreadcrumbProps {
	label: string;
	items: readonly BreadcrumbItem[];
	className?: string;
	/** Integrate a client router without nesting interactive elements. */
	renderLink?: (item: BreadcrumbItem & { href: string }) => ReactNode;
	/** Text scale. @default "md" */
	size?: BreadcrumbSize;
}
/** Ancestors stay links; the final item identifies the current page. */
export function Breadcrumb({
	label,
	items,
	className,
	renderLink,
	size = "md",
}: BreadcrumbProps) {
	return (
		<nav aria-label={label} className={cn("not-typeset", className)}>
			<ol
				className={cn(
					"text-label-secondary m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0",
					sizes[size],
				)}
			>
				{items.map((item, index) => (
					<li
						key={`${index}-${item.label}`}
						className="m-0 flex min-w-0 items-center gap-2 p-0"
					>
						{index > 0 && (
							<span aria-hidden="true" className="text-label-tertiary">
								/
							</span>
						)}
						{index === items.length - 1 ? (
							<span aria-current="page" className="text-label font-medium">
								{item.label}
							</span>
						) : item.href ? (
							(renderLink?.({ ...item, href: item.href }) ?? (
								<a
									href={item.href}
									className={cn(
										"hover:text-label focus-visible:outline-accent-text rounded-sm focus-visible:outline-2",
									)}
								>
									{item.label}
								</a>
							))
						) : (
							<span>{item.label}</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
