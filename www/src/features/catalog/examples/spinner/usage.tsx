import { Spinner } from "@passui/react/spinner";

export function SpinnerUsage() {
	return (
		<div className="flex items-center gap-4">
			<Spinner />
			<Spinner className="text-accent-text size-6" />
			<Spinner className="size-8" />
		</div>
	);
}
