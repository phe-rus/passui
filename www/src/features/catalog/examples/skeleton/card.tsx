import { Skeleton } from "@passui/react/skeleton";

export function SkeletonCard() {
	return (
		<div className="flex w-full max-w-xs flex-col gap-3">
			<Skeleton className="h-32 w-full" />
			<Skeleton className="h-4 w-4/5" />
			<Skeleton className="h-4 w-3/5" />
		</div>
	);
}
