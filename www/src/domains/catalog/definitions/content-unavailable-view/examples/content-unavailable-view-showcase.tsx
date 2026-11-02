import { ContentUnavailableView } from "@passui/react/content-unavailable-view"

export function ContentUnavailableViewShowcase() {
    return (
        <div className="w-full max-w-md">
            <ContentUnavailableView title="No results" description="Try another search." />
        </div>
    )
}
