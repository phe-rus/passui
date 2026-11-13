import { Skeleton } from "@passui/react/skeleton";

export function SkeletonList() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-4">
			{[0, 1, 2].map((row) => (
				<div key={row} className="flex items-center gap-3">
					<Skeleton className="size-10 rounded-full" />
					<div className="flex flex-1 flex-col gap-2">
						<Skeleton className="h-3.5 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
}
