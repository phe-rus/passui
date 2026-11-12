import { Skeleton } from "@passui/react/skeleton";

export function SkeletonUsage() {
	return (
		<div className="flex items-center gap-3">
			<Skeleton className="size-12 rounded-full" />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-44" />
				<Skeleton className="h-4 w-28" />
			</div>
		</div>
	);
}
