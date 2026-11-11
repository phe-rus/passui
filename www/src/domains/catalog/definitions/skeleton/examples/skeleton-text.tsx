import { Skeleton } from "@passui/react/skeleton";
export function SkeletonText() {
	return (
		<div className="flex w-64 flex-col gap-2">
			<Skeleton label="Loading text" />
			<Skeleton className="w-3/4" />
			<Skeleton className="w-1/2" />
		</div>
	);
}
