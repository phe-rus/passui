import { Skeleton } from "@passui/react/skeleton";

export function SkeletonText() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-11/12" />
			<Skeleton className="h-4 w-4/6" />
		</div>
	);
}
