import { SearchIcon } from "@passui/icons";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/class-names";
import { ExpandingSearchField } from "./expanding-search-field";

export type SearchFieldSize = "sm" | "md" | "lg";

const pillSizes: Record<SearchFieldSize, string> = {
	sm: "control-field flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption text-label-tertiary",
	md: "control-field flex items-center gap-2 rounded-full px-3 py-2 text-subheadline text-label-tertiary",
	lg: "control-field flex items-center gap-2.5 rounded-full px-4 py-2.5 text-body text-label-tertiary",
};
const iconSizes: Record<SearchFieldSize, number> = {
	sm: 13,
	md: 15,
	lg: 17,
};

export interface SearchFieldProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	/** Expand a single pill from its search icon on focus. @default false */
	collapsible?: boolean;
	/** Pill height, icon size and text scale (non-collapsible variant). @default "md" */
	size?: SearchFieldSize;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
	function SearchField(
		{
			className,
			placeholder = "Search",
			collapsible = false,
			size = "md",
			...props
		},
		ref,
	) {
		if (collapsible)
			return (
				<ExpandingSearchField
					{...props}
					inputRef={ref}
					className={className}
					placeholder={placeholder}
				/>
			);
		const accessibleName = props["aria-labelledby"]
			? undefined
			: (props["aria-label"] ?? placeholder);
		return (
			<label className={cn(pillSizes[size], className)}>
				<span aria-hidden="true" className="shrink-0">
					<SearchIcon size={iconSizes[size]} strokeWidth={2} />
				</span>
				<input
					ref={ref}
					type="search"
					placeholder={placeholder}
					aria-label={accessibleName}
					className="text-label placeholder:text-label-tertiary min-w-0 grow bg-transparent outline-none"
					{...props}
				/>
			</label>
		);
	},
);
