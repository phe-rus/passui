import { SearchField } from "@passui/react/search-field";

/** The glass variant floats above content, so it sits on something to show what it floats over. */
export function SearchFieldFloating() {
	return (
		<div className="from-accent-soft to-background flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-linear-to-br p-5">
			<SearchField variant="floating" size="lg" placeholder="Search" />
			<div className="w-56">
				<SearchField variant="floating" collapsible placeholder="Search" />
			</div>
		</div>
	);
}
