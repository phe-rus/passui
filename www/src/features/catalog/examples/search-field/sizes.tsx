import { SearchField } from "@passui/react/search-field";

export function SearchFieldSizes() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<SearchField size="sm" placeholder="Search, small" />
			<SearchField size="md" placeholder="Search, medium" />
			<SearchField size="lg" placeholder="Search, large" />
			<div className="flex items-center gap-3">
				{(["sm", "md", "lg"] as const).map((size) => (
					<div key={size} className="w-28">
						<SearchField size={size} collapsible />
					</div>
				))}
			</div>
		</div>
	);
}
