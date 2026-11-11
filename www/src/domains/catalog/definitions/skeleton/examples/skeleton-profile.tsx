import { Skeleton } from "@passui/react/skeleton";
export function SkeletonProfile() {
	return (
		<div className="flex w-64 items-center gap-3">
			<Skeleton
				label="Loading profile"
				className="size-10 shrink-0 rounded-full"
			/>
			<Skeleton className="flex-1" />
		</div>
	);
}
