import { TooltipHost } from "@passui/solid/tooltip"
import { Button } from "@passui/solid/button"

export function TooltipShortcuts() {
    return (
        <div class="flex flex-wrap gap-3">
            <span data-tooltip="Save · Ctrl+S">
                <Button variant="secondary">Save</Button>
            </span>
            <span data-tooltip="Search · Ctrl+K">
                <Button variant="secondary">Search</Button>
            </span>
            <TooltipHost />
        </div>
    )
}
