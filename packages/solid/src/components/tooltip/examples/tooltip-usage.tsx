import { TooltipHost } from "@passui/solid/tooltip"
export function TooltipUsage() {
    return (
        <>
            <button
                type="button"
                data-tooltip="Save your changes"
            >
                Hover for a tip
            </button>
            <TooltipHost />
        </>
    )
}
