import { Empty } from "@passui/react/empty";

export function EmptyShowcase() {
	return (
		<div className="w-full max-w-md">
			<Empty title="No results" description="Try another search." />
		</div>
	);
}
