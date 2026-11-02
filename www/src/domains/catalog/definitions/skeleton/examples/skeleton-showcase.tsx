import { Skeleton } from "@passui/react/skeleton"
export function SkeletonShowcase() {
    return (
        <div className="w-full max-w-sm">
            <Skeleton label="Loading content" className="h-16 w-64" />
        </div>
    )
}
